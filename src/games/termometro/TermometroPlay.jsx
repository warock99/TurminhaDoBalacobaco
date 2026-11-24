import { useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button, { IconButton } from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import { CharacterArt } from '../../components/Characters.jsx'
import Icon from '../../components/Icon.jsx'
import { vibrate } from '../../lib/feedback.js'
import { sound } from '../../lib/sound.js'
import { shuffle } from '../../lib/random.js'
import { pickTheme } from './logic.js'
import { ScaleBar } from './TermometroArt.jsx'

export default function TermometroPlay({ round, players, config, onFinish, onExit }) {
  const [phase, setPhase] = useState('pass') // pass | order
  const [turn, setTurn] = useState(0)
  const [theme, setTheme] = useState(round.theme)
  const maxNumber = Math.max(config.maxNumber, players.length)

  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const people = round.playerIds.map((id) => byId[id]).filter(Boolean)

  if (phase === 'pass') {
    return (
      <PassPhase
        key={turn}
        player={people[turn]}
        number={round.numbers[people[turn].id]}
        turn={turn}
        total={people.length}
        theme={theme}
        maxNumber={maxNumber}
        onExit={onExit}
        onNext={() => (turn + 1 < people.length ? setTurn(turn + 1) : setPhase('order'))}
      />
    )
  }

  return (
    <OrderPhase
      people={people}
      theme={theme}
      maxNumber={maxNumber}
      onExit={onExit}
      onChangeTheme={() => setTheme(pickTheme(config.groups, [], theme.text))}
      onReveal={(order) => onFinish({ order, theme })}
    />
  )
}

/* ---------- 1. Cada um vê seu número ---------- */

function PassPhase({ player, number, turn, total, theme, maxNumber, onNext, onExit }) {
  const [revealed, setRevealed] = useState(false)
  const [seen, setSeen] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const isLast = turn + 1 === total

  return (
    <Screen
      onBack={onExit}
      backIcon="close"
      title="Termômetro"
      subtitle={`Jogador ${turn + 1} de ${total}`}
      footer={
        <Button
          block
          size="lg"
          variant={seen ? 'primary' : 'secondary'}
          disabled={!seen || leaving}
          iconRight="arrowRight"
          onClick={() => {
            sound.flip()
            setRevealed(false)
            setLeaving(true)
            setTimeout(onNext, 380)
          }}
        >
          {!seen ? 'Toque na carta para ver' : isLast ? 'Esconder e começar' : 'Esconder e passar o celular'}
        </Button>
      }
    >
      <div className={`pass ${leaving ? 'leaving' : ''}`}>
        <div className="progress-dots" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={i < turn ? 'done' : i === turn ? 'current' : ''} />
          ))}
        </div>

        <div className="pass-who">
          {player.character ? (
            <CharacterArt id={player.character} size={58} className="pass-character" />
          ) : (
            <Avatar name={player.name} index={player.index} size={56} />
          )}
          <div>
            <small>Passe o celular para</small>
            <strong>{player.name}</strong>
          </div>
        </div>

        <button
          type="button"
          className={`flip-card ${revealed ? 'flipped' : ''}`}
          onClick={() => {
            if (revealed || leaving) return
            vibrate(20)
            sound.reveal()
            setRevealed(true)
            setSeen(true)
          }}
          aria-label={revealed ? 'Carta revelada' : 'Toque para revelar seu número'}
        >
          <div className="flip-inner">
            <div className="flip-face flip-front thermo-front">
              <div className="card-pattern" aria-hidden="true" />
              <Icon name="eye" size={42} />
              <strong>Toque para revelar</strong>
              <small>Só {player.name} pode olhar!</small>
            </div>
            <div className="flip-face flip-back number-back" style={{ '--heat': heatColor(number, maxNumber) }}>
              <span className="card-label">Seu número secreto</span>
              <strong className="big-number">{number}</strong>
              <div className="card-theme">
                <small>Tema</small>
                <b>{theme.text}</b>
              </div>
              <ScaleBar min={theme.min} max={theme.max} value={number} maxNumber={maxNumber} />
              <p>Não conte seu número!</p>
            </div>
          </div>
        </button>
      </div>
    </Screen>
  )
}

/** Cor do "calor": azul para números baixos, vermelho para altos. */
export function heatColor(n, max) {
  const t = (n - 1) / Math.max(1, max - 1)
  const hue = 200 - t * 200 // 200 (azul) → 0 (vermelho)
  return `hsl(${hue} 85% 55%)`
}

/* ---------- 2. Dicas e ordem ---------- */

function OrderPhase({ people, theme, maxNumber, onChangeTheme, onReveal, onExit }) {
  const [order, setOrder] = useState(() => shuffle(people.map((p) => p.id)))
  const [moved, setMoved] = useState(null)
  const byId = Object.fromEntries(people.map((p) => [p.id, p]))

  const move = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= order.length) return
    vibrate(8)
    sound.soft()
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    setOrder(next)
    setMoved(next[target])
  }

  return (
    <Screen
      onBack={onExit}
      backIcon="close"
      title="Dicas e ordem"
      footer={
        <Button block size="lg" icon="eye" onClick={() => onReveal(order)}>
          Revelar os números
        </Button>
      }
    >
      <div className="theme-card pop-in" key={theme.text}>
        <small>Tema</small>
        <strong>{theme.text}</strong>
        <ScaleBar min={theme.min} max={theme.max} maxNumber={maxNumber} />
        <button type="button" className="link-btn" onClick={onChangeTheme}>
          <Icon name="shuffle" size={16} /> Trocar tema
        </button>
      </div>

      <p className="muted center">
        Cada um fala algo do tema que combine com seu número. Depois arrumem a fila do <b>menor</b> (em cima) para o <b>maior</b> (embaixo).
      </p>

      <ol className="order-list">
        {order.map((id, i) => {
          const p = byId[id]
          return (
            <li key={id} className={`order-item ${moved === id ? 'moved' : ''}`}>
              <span className="order-pos">{i + 1}</span>
              <Avatar name={p.name} character={p.character} index={p.index} size={40} />
              <span className="player-name">{p.name}</span>
              <IconButton silent icon="up" label={`Subir ${p.name}`} disabled={i === 0} onClick={() => move(i, -1)} />
              <IconButton silent icon="down" label={`Descer ${p.name}`} disabled={i === order.length - 1} onClick={() => move(i, 1)} />
            </li>
          )
        })}
      </ol>
    </Screen>
  )
}
