import { useEffect, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { vibrate } from '../../lib/feedback.js'
import { sound } from '../../lib/sound.js'
import { checkOrder } from './logic.js'
import { ThermoMascot } from './TermometroArt.jsx'
import { heatColor } from './TermometroPlay.jsx'

export default function TermometroResult({ round, result, players, config, onAgain, onSetup, onPlayers, onHome }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const checked = checkOrder(result.order, round.numbers)
  const maxNumber = Math.max(config.maxNumber, players.length)
  const [shown, setShown] = useState(0)
  const done = shown >= checked.length
  const errors = checked.filter((c) => !c.ok).length

  const revealNext = () => {
    const item = checked[shown]
    vibrate(item.ok ? 15 : [40, 50, 40])
    if (item.ok) sound.good()
    else sound.bad()
    setShown(shown + 1)
  }

  useEffect(() => {
    if (!done) return
    vibrate(errors === 0 ? [30, 60, 30, 60, 120] : 60)
    const id = setTimeout(() => (errors === 0 ? sound.win() : sound.lose()), 450)
    return () => clearTimeout(id)
  }, [done, errors])

  let title = 'Revelem um por um'
  let text = `Tema: ${result.theme.text}`
  if (done) {
    if (errors === 0) {
      title = 'Ordem perfeita!'
      text = 'Sintonia total. Vocês são uma turma afinada!'
    } else if (errors === 1) {
      title = 'Quase lá!'
      text = 'Só um ficou fora do lugar.'
    } else {
      title = `${errors} fora de ordem`
      text = 'Bora tentar de novo com outro tema?'
    }
  }

  return (
    <Screen
      className={`result ${done ? (errors === 0 ? 'result-win' : 'result-lose') : ''}`}
      footer={
        done ? (
          <div className="footer-stack">
            <Button block size="lg" icon="refresh" onClick={onAgain}>Nova rodada</Button>
            <div className="footer-row">
              <Button variant="secondary" icon="settings" onClick={onSetup}>Ajustar</Button>
              <Button variant="secondary" icon="users" onClick={onPlayers}>Jogadores</Button>
              <Button variant="secondary" icon="home" onClick={onHome} aria-label="Início" />
            </div>
          </div>
        ) : (
          <Button block size="lg" icon="eye" silent onClick={revealNext}>
            Revelar {byId[checked[shown].id]?.name}
          </Button>
        )
      }
    >
      <div className="result-hero compact">
        {done && <div className="burst" aria-hidden="true" />}
        <ThermoMascot size={done ? 130 : 96} mood={done && errors > 1 ? 'sad' : done && errors === 0 ? 'win' : 'normal'} />
        <h1 className="result-title" key={title}>{title}</h1>
        <p className="result-text" key={text}>{text}</p>
      </div>

      <ol className="order-list reveal-list">
        {checked.map((c, i) => {
          const p = byId[c.id]
          const open = i < shown
          return (
            <li key={c.id} className={`order-item ${open ? (c.ok ? 'ok' : 'bad') : 'closed'}`}>
              <span className="order-pos">{i + 1}</span>
              <Avatar name={p.name} character={p.character} index={p.index} size={40} />
              <span className="player-name">{p.name}</span>
              {open ? (
                <span className="num-chip pop-in" style={{ '--heat': heatColor(c.number, maxNumber) }}>
                  {c.number}
                  <Icon name={c.ok ? 'check' : 'close'} size={16} strokeWidth={3} />
                </span>
              ) : (
                <span className="num-chip hidden">?</span>
              )}
            </li>
          )
        })}
      </ol>
    </Screen>
  )
}
