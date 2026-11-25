import { useEffect, useRef, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { CharacterArt } from '../../components/Characters.jsx'
import { sound } from '../../lib/sound.js'
import { vibrate } from '../../lib/feedback.js'
import { CATEGORY_BY_ID } from './cards.js'

export default function QuemSouEuPlay({ round, players, config, session, setSession, onFinish, onExit }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const people = round.playerIds.map((id) => byId[id]).filter(Boolean)
  const [offset, setOffset] = useState(0)
  const [phase, setPhase] = useState('turn') // turn | countdown | card
  const turn = (session.turn ?? 0) + offset
  const guesser = people[turn % people.length]

  const finish = (outcome) => {
    const scores = { ...(session.scores ?? {}) }
    if (outcome.hit) scores[guesser.id] = (scores[guesser.id] ?? 0) + 1
    setSession({ ...session, turn: turn + 1, scores, played: (session.played ?? 0) + 1 })
    onFinish({ ...outcome, guesserId: guesser.id })
  }

  if (phase === 'turn') {
    return (
      <Screen
        onBack={onExit}
        backIcon="close"
        title="Quem Sou Eu?"
        subtitle="De quem é a vez"
        footer={
          <div className="footer-stack">
            <Button block size="lg" icon="play" onClick={() => setPhase('countdown')}>
              Celular na testa, pode começar!
            </Button>
            <button type="button" className="link-btn" onClick={() => setOffset(offset + 1)}>
              Trocar quem adivinha
            </button>
          </div>
        }
      >
        <div className="pass">
          <div className="pass-big">
            {guesser.character ? (
              <CharacterArt id={guesser.character} size={110} />
            ) : (
              <Avatar name={guesser.name} index={guesser.index} size={96} />
            )}
            <small>Quem adivinha agora é</small>
            <strong>{guesser.name}</strong>
          </div>
          <ol className="rules-list">
            <li><b>{guesser.name}</b>, segure o celular na testa com a tela virada para a turma. Não espie!</li>
            <li>Faça perguntas de <b>sim ou não</b>. A turma responde.</li>
            <li>Quando acertar, alguém da turma toca em <b>Acertou!</b></li>
          </ol>
        </div>
      </Screen>
    )
  }

  if (phase === 'countdown') return <StartCountdown onDone={() => setPhase('card')} />

  return <CardPhase card={round.card} guesser={guesser} minutes={config.timer} onExit={onExit} onFinish={finish} />
}

/* ---------- 3, 2, 1… (tempo para levar o celular à testa) ---------- */

function StartCountdown({ onDone }) {
  const [n, setN] = useState(3)
  const doneRef = useRef(onDone)
  doneRef.current = onDone
  useEffect(() => {
    sound.tick()
    vibrate(15)
    if (n === 0) {
      const id = setTimeout(() => doneRef.current(), 450)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setN(n - 1), 900)
    return () => clearTimeout(id)
  }, [n])
  return (
    <div className="screen qse-countdown">
      <p>Celular na testa!</p>
      <strong key={n} className="pop-in">{n === 0 ? 'Já!' : n}</strong>
    </div>
  )
}

/* ---------- A carta, grande para a turma ler de longe ---------- */

function CardPhase({ card, guesser, minutes, onExit, onFinish }) {
  const category = CATEGORY_BY_ID[card.categoryId]
  const total = minutes * 60
  const startedAt = useRef(Date.now())
  const [left, setLeft] = useState(total)
  const [questions, setQuestions] = useState(0)
  const ended = useRef(false)

  const end = (outcome) => {
    if (ended.current) return
    ended.current = true
    onFinish({ ...outcome, questions, seconds: Math.round((Date.now() - startedAt.current) / 1000) })
  }
  const endRef = useRef(end)
  endRef.current = end

  // Mantém a tela acesa enquanto o celular está na testa (quando o aparelho permite).
  useEffect(() => {
    let lock = null
    navigator.wakeLock?.request('screen').then((l) => (lock = l)).catch(() => {})
    return () => {
      lock?.release().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!total) return
    const id = setInterval(() => {
      const remaining = Math.max(0, total - Math.floor((Date.now() - startedAt.current) / 1000))
      setLeft((prev) => {
        if (remaining !== prev && remaining > 0 && remaining <= 10) sound.tick()
        return remaining
      })
      if (remaining === 0) {
        clearInterval(id)
        vibrate([200, 100, 400])
        sound.alarm()
        endRef.current({ hit: false, timeUp: true })
      }
    }, 250)
    return () => clearInterval(id)
  }, [total])

  const mm = Math.floor(left / 60)
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="screen qse-play" style={{ '--cat': category?.color }}>
      <div className="qse-top">
        <button type="button" className="icon-btn qse-close" onClick={onExit} aria-label="Sair">
          <Icon name="close" size={22} />
        </button>
        {total > 0 && (
          <div className={`qse-timer ${left <= 10 ? 'urgent' : ''}`}>
            <Icon name="timer" size={18} /> {mm}:{ss}
          </div>
        )}
        <button
          type="button"
          className="qse-count"
          onClick={() => {
            vibrate(8)
            sound.soft()
            setQuestions(questions + 1)
          }}
          aria-label="Contar mais uma pergunta"
        >
          <Icon name="plus" size={16} strokeWidth={3} /> {questions} {questions === 1 ? 'pergunta' : 'perguntas'}
        </button>
      </div>
      {total > 0 && (
        <div className="qse-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${left / total})` }} />
        </div>
      )}

      <div className="qse-card pop-in">
        <span className="qse-cat">{category?.name}</span>
        <strong className="qse-name">{card.name}</strong>
        <small>{guesser.name} não pode ver!</small>
      </div>

      <div className="qse-actions">
        <button
          type="button"
          className="qse-btn skip"
          onClick={() => {
            vibrate(20)
            sound.bad()
            end({ hit: false })
          }}
        >
          <Icon name="close" size={26} strokeWidth={3} />
          Desistiu
        </button>
        <button
          type="button"
          className="qse-btn hit"
          onClick={() => {
            vibrate([30, 40, 60])
            end({ hit: true })
          }}
        >
          <Icon name="check" size={28} strokeWidth={3} />
          Acertou!
        </button>
      </div>
    </div>
  )
}
