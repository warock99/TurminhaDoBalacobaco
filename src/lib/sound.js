// Sons do app, sintetizados na hora com a Web Audio API.
// Não usa arquivos de áudio: funciona offline e não pesa nada.
import { loadValue, saveValue } from './storage.js'

let ctx = null
let master = null
let muted = loadValue('muted', false)
const listeners = new Set()

function audio() {
  if (muted) return null
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      ctx = new AC()
      master = ctx.createGain()
      master.gain.value = 0.5
      master.connect(ctx.destination)
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  } catch {
    return null
  }
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  saveValue('muted', value)
  listeners.forEach((fn) => fn(value))
}

export function onMuteChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Uma nota simples com envelope (ataque rápido e queda suave). */
function tone({ freq, to, start = 0, dur = 0.15, type = 'sine', vol = 0.3 }) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime + start
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain).connect(master)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

/** Ruído filtrado, para o "vush" da carta virando. */
function whoosh({ start = 0, dur = 0.28, vol = 0.18 } = {}) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime + start
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = ac.createBufferSource()
  src.buffer = buffer
  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 1.2
  filter.frequency.setValueAtTime(400, t)
  filter.frequency.exponentialRampToValueAtTime(3000, t + dur)
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(vol, t + dur * 0.4)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(filter).connect(gain).connect(master)
  src.start(t)
}

/** Explosão: ruído grave que vai abafando, com um tom bem baixo por baixo. */
function boom({ dur = 1.1, vol = 0.5 } = {}) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
  const src = ac.createBufferSource()
  src.buffer = buffer
  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(1800, t)
  filter.frequency.exponentialRampToValueAtTime(120, t + dur)
  const gain = ac.createGain()
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(filter).connect(gain).connect(master)
  src.start(t)
  tone({ freq: 90, to: 35, dur: 0.8, type: 'sine', vol: 0.5 })
}

const NOTES = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G4: 392, C4: 261.63 }

export const sound = {
  boom: () => boom(),
  tap: () => tone({ freq: 620, to: 880, dur: 0.07, type: 'triangle', vol: 0.18 }),
  soft: () => tone({ freq: 520, dur: 0.05, type: 'sine', vol: 0.12 }),
  add: () => {
    tone({ freq: NOTES.E5, dur: 0.08, type: 'triangle', vol: 0.2 })
    tone({ freq: NOTES.A5, start: 0.06, dur: 0.12, type: 'triangle', vol: 0.2 })
  },
  remove: () => tone({ freq: 500, to: 220, dur: 0.14, type: 'triangle', vol: 0.18 }),
  flip: () => whoosh(),
  reveal: () => {
    whoosh({ vol: 0.12 })
    ;[NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6].forEach((f, i) =>
      tone({ freq: f, start: 0.12 + i * 0.06, dur: 0.22, type: 'sine', vol: 0.18 }),
    )
  },
  tick: () => tone({ freq: 1200, dur: 0.04, type: 'square', vol: 0.08 }),
  alarm: () => {
    for (let i = 0; i < 3; i++) {
      tone({ freq: 880, start: i * 0.28, dur: 0.18, type: 'square', vol: 0.14 })
      tone({ freq: 660, start: i * 0.28 + 0.12, dur: 0.14, type: 'square', vol: 0.12 })
    }
  },
  good: () => {
    tone({ freq: NOTES.G5, dur: 0.1, type: 'triangle', vol: 0.2 })
    tone({ freq: NOTES.C6, start: 0.08, dur: 0.18, type: 'triangle', vol: 0.2 })
  },
  bad: () => {
    tone({ freq: 220, to: 150, dur: 0.3, type: 'sawtooth', vol: 0.14 })
  },
  win: () => {
    const seq = [NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.G5, NOTES.C6, NOTES.E6]
    const times = [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.65]
    seq.forEach((f, i) => tone({ freq: f, start: times[i], dur: i === seq.length - 1 ? 0.6 : 0.16, type: 'triangle', vol: 0.2 }))
  },
  lose: () => {
    ;[392, 370, 349, 262].forEach((f, i) =>
      tone({ freq: f, to: i === 3 ? 200 : undefined, start: i * 0.28, dur: i === 3 ? 0.7 : 0.24, type: 'triangle', vol: 0.2 }),
    )
  },
  drumroll: () => {
    for (let i = 0; i < 10; i++) tone({ freq: 160 + i * 12, start: i * 0.05, dur: 0.05, type: 'square', vol: 0.05 + i * 0.008 })
  },
}
