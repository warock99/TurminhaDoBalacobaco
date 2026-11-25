import { useEffect, useRef, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { sound } from '../../lib/sound.js'
import { vibrate } from '../../lib/feedback.js'
import { BOMB_GROUPS } from './categories.js'
import { BombMascot } from './BombaArt.jsx'

export default function BombaPlay({ round, players, session, setSession, onFinish, onExit }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  // Quem está no jogo é fixado no começo da rodada (a sessão muda quando alguém explode).
  const [aliveIds] = useState(() => (session.alive ?? round.playerIds).filter((id) => byId[id]))
  const [roundNumber] = useState(session.round ?? 1)
  const alive = aliveIds.map((id) => byId[id])
  const [phase, setPhase] = useState('intro') // intro | board | boom
  const [turn, setTurn] = useState(session.turn ?? round.firstIndex ?? 0)
  const [picked, setPicked] = useState([])
  const timer = useRef(null)
  const group = BOMB_GROUPS.find((g) => g.id === round.category.group)
  const current = alive[turn % alive.length]
  const header = { onBack: onExit, backIcon: 'close', title: 'Bomba Secreta', subtitle: `Rodada ${roundNumber} · ${alive.length} na disputa` }

  useEffect(() => () => clearTimeout(timer.current), [])

  if (phase === 'intro') {
    return (
      <Screen
        {...header}
        footer={
          <Button block size="lg" icon="play" onClick={() => setPhase('board')}>
            Começar a rodada
          </Button>
        }
      >
        <div className="ed-theme">
          <BombMascot size={120} className="pop-in" />
          <div className="bomb-cat-card pop-in" style={{ '--chip': group?.color }}>
            <span className="tag">{group?.name}</span>
            <h2>{round.category.title}</h2>
            <small>{round.board.length} opções, 1 bomba escondida</small>
          </div>
          <p className="muted center">
            Na sua vez, fale uma opção em voz alta e toque nela. Quem começa: <b>{current.name}</b>.
          </p>
        </div>
      </Screen>
    )
  }

  const choose = (item) => {
    if (phase !== 'board' || picked.includes(item)) return
    if (item === round.bomb) {
      setPhase('boom')
      sound.boom()
      vibrate([400, 80, 250, 80, 500])
      const nextAlive = aliveIds.filter((id) => id !== current.id)
      const pos = aliveIds.indexOf(current.id)
      setSession({
        ...session,
        alive: nextAlive,
        turn: nextAlive.length ? pos % nextAlive.length : 0,
        round: roundNumber + 1,
        out: [...(session.out ?? []), current.id],
      })
      timer.current = setTimeout(() => onFinish({ loserId: current.id, picked: [...picked, item] }), 1500)
      return
    }
    vibrate(15)
    sound.good()
    setPicked([...picked, item])
    setTurn(turn + 1)
  }

  return (
    <Screen {...header}>
      <div className={`bomb-turn ${phase === 'boom' ? 'shake' : ''}`}>
        <Avatar name={current.name} character={current.character} index={current.index} size={48} />
        <div>
          <small>{phase === 'boom' ? 'Explodiu!' : 'Vez de'}</small>
          <strong>{current.name}</strong>
        </div>
        <span className="bomb-left">{round.board.length - picked.length} restantes</span>
      </div>
      <p className="bomb-cat-title">{round.category.title}</p>

      <div className={`bomb-board ${phase === 'boom' ? 'shake' : ''}`}>
        {round.board.map((item) => {
          const safe = picked.includes(item)
          const isBoom = phase === 'boom' && item === round.bomb
          return (
            <button
              key={item}
              type="button"
              className={`bomb-opt ${safe ? 'safe' : ''} ${isBoom ? 'boom' : ''}`}
              disabled={safe || phase === 'boom'}
              onClick={() => choose(item)}
            >
              {safe && <Icon name="check" size={16} strokeWidth={3} />}
              <span>{item}</span>
            </button>
          )
        })}
      </div>

      {phase === 'boom' && <div className="bomb-flash" aria-hidden="true" />}
    </Screen>
  )
}
