import { useEffect, useRef, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Icon from '../../components/Icon.jsx'
import { sound } from '../../lib/sound.js'
import { vibrate } from '../../lib/feedback.js'
import { LIST_GROUPS } from './lists.js'
import { DoubtMascot } from './EuDuvidoArt.jsx'

export default function EuDuvidoPlay({ round, onFinish, onExit }) {
  const [phase, setPhase] = useState('theme') // theme | list
  const [found, setFound] = useState([])
  const [misses, setMisses] = useState(0)
  const [flash, setFlash] = useState(null) // { ok, key }
  const flashTimer = useRef(null)
  const list = round.list
  const group = LIST_GROUPS.find((g) => g.id === list.cat)
  const header = { onBack: onExit, backIcon: 'close', title: 'Eu Duvido!' }

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  const showFlash = (ok) => {
    clearTimeout(flashTimer.current)
    setFlash({ ok, key: Date.now() })
    flashTimer.current = setTimeout(() => setFlash(null), 1300)
  }

  if (phase === 'theme') {
    return (
      <Screen
        {...header}
        subtitle="Leiam o tema"
        footer={
          <Button block size="lg" icon="eye" onClick={() => setPhase('list')}>
            Sou o mediador: ver a lista
          </Button>
        }
      >
        <div className="ed-theme">
          <DoubtMascot size={110} className="pop-in" />
          <div className="ed-theme-card pop-in" style={{ '--chip': group?.color }}>
            <span className="tag">{group?.name}</span>
            <h2>{list.title}</h2>
            <small>{list.items.length} itens na lista</small>
          </div>
          <p className="muted center">
            Mediador, leia o tema em voz alta. Depois, só você olha a lista. A turma vai falando, um de cada vez!
          </p>
        </div>
      </Screen>
    )
  }

  const toggle = (item) => {
    if (found.includes(item)) {
      vibrate(8)
      sound.remove()
      setFound(found.filter((x) => x !== item))
      return
    }
    vibrate([20, 30, 20])
    sound.good()
    showFlash(true)
    setFound([...found, item])
  }

  const allFound = found.length === list.items.length

  return (
    <Screen
      {...header}
      subtitle="Só o mediador olha!"
      footer={
        <div className="footer-stack">
          <Button
            block
            size="lg"
            variant="secondary"
            icon="close"
            silent
            onClick={() => {
              vibrate([60, 40, 60])
              sound.bad()
              setMisses(misses + 1)
              showFlash(false)
            }}
          >
            Não está na lista!
          </Button>
          <Button block size="lg" icon="eye" onClick={() => onFinish({ found, misses })}>
            {allFound ? 'Acharam tudo! Ver resultado' : 'Terminar e mostrar a lista'}
          </Button>
        </div>
      }
    >
      <div className="ed-head">
        <p>{list.title}</p>
        <div className="ed-stats">
          <span className="ed-stat ok"><Icon name="check" size={16} strokeWidth={3} /> {found.length} de {list.items.length}</span>
          <span className="ed-stat bad"><Icon name="close" size={16} strokeWidth={3} /> {misses} {misses === 1 ? 'chute errado' : 'chutes errados'}</span>
        </div>
        <small className="muted">Toque no item quando alguém falar. Tocou sem querer? Toque de novo para desmarcar.</small>
      </div>

      <ul className="ed-list">
        {list.items.map((item, i) => {
          const on = found.includes(item)
          return (
            <li key={item}>
              <button type="button" className={`ed-item ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => toggle(item)}>
                <span className="ed-num">{on ? <Icon name="check" size={16} strokeWidth={3.4} /> : i + 1}</span>
                <span className="ed-text">{item}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="muted center ed-source">Fonte: {list.source}</p>

      {flash && (
        <div key={flash.key} className={`ed-flash ${flash.ok ? 'ok' : 'bad'}`} aria-live="assertive">
          <Icon name={flash.ok ? 'check' : 'close'} size={56} strokeWidth={3.4} />
          <strong>{flash.ok ? 'Está na lista!' : 'Não está!'}</strong>
        </div>
      )}
    </Screen>
  )
}
