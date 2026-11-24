import { useEffect, useRef, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { vibrate } from '../../lib/feedback.js'
import { CATEGORY_BY_ID } from './words.js'
import { ImpostorMascot, CrewMascot } from './ImpostorArt.jsx'

export default function ImpostorPlay({ round, players, config, onFinish, onExit }) {
  const [phase, setPhase] = useState('pass') // pass | discuss | vote
  const [turn, setTurn] = useState(0)

  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const order = round.playerIds.map((id) => byId[id]).filter(Boolean)

  if (phase === 'pass') {
    return (
      <PassPhase
        key={turn}
        player={order[turn]}
        turn={turn}
        total={order.length}
        round={round}
        config={config}
        onExit={onExit}
        onNext={() => {
          if (turn + 1 < order.length) setTurn(turn + 1)
          else setPhase('discuss')
        }}
      />
    )
  }

  if (phase === 'discuss') {
    return (
      <DiscussPhase
        starter={byId[round.starterId]}
        round={round}
        config={config}
        onExit={onExit}
        onVote={() => setPhase('vote')}
      />
    )
  }

  return <VotePhase players={order} round={round} onExit={onExit} onBack={() => setPhase('discuss')} onReveal={onFinish} />
}

/* ---------- 1. Passar o celular e ver a palavra ---------- */

function PassPhase({ player, turn, total, round, config, onNext, onExit }) {
  const [revealed, setRevealed] = useState(false)
  const [seen, setSeen] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const isImpostor = round.impostorIds.includes(player.id)
  const category = CATEGORY_BY_ID[round.categoryId]
  const isLast = turn + 1 === total

  const reveal = () => {
    if (revealed || leaving) return
    vibrate(isImpostor ? [30, 60, 30] : 20)
    setRevealed(true)
    setSeen(true)
  }

  const hideAndNext = () => {
    setRevealed(false)
    setLeaving(true)
    // espera a carta virar antes de trocar de jogador
    setTimeout(onNext, 380)
  }

  return (
    <Screen
      onBack={onExit}
      backIcon="close"
      title="Impostor"
      subtitle={`Jogador ${turn + 1} de ${total}`}
      footer={
        <Button block size="lg" variant={seen ? 'primary' : 'secondary'} disabled={!seen || leaving} iconRight="arrowRight" onClick={hideAndNext}>
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
          <Avatar name={player.name} index={player.index} size={56} />
          <div>
            <small>Passe o celular para</small>
            <strong>{player.name}</strong>
          </div>
        </div>

        <button
          type="button"
          className={`flip-card ${revealed ? 'flipped' : ''}`}
          onClick={reveal}
          aria-label={revealed ? 'Carta revelada' : 'Toque para revelar sua carta'}
        >
          <div className="flip-inner">
            <div className="flip-face flip-front">
              <div className="card-pattern" aria-hidden="true" />
              <Icon name="eye" size={42} />
              <strong>Toque para revelar</strong>
              <small>Só {player.name} pode olhar!</small>
            </div>
            <div className={`flip-face flip-back ${isImpostor ? 'impostor' : 'crew'}`}>
              {isImpostor ? (
                <>
                  <ImpostorMascot size={110} />
                  <span className="card-label">Você é o</span>
                  <strong className="card-word impostor-word">IMPOSTOR</strong>
                  <p>
                    {config.hintCategory ? (
                      <>Categoria: <b>{category?.name}</b>. </>
                    ) : null}
                    Disfarce e tente descobrir a palavra!
                  </p>
                </>
              ) : (
                <>
                  <CrewMascot size={84} />
                  <span className="card-label">A palavra secreta é</span>
                  <strong className="card-word">{round.word}</strong>
                  <p>
                    Categoria: <b>{category?.name}</b>. Não fale a palavra!
                  </p>
                </>
              )}
            </div>
          </div>
        </button>
      </div>
    </Screen>
  )
}

/* ---------- 2. Conversa ---------- */

function DiscussPhase({ starter, round, config, onVote, onExit }) {
  const category = CATEGORY_BY_ID[round.categoryId]
  return (
    <Screen
      onBack={onExit}
      backIcon="close"
      title="Hora da conversa"
      footer={
        <Button block size="lg" icon="vote" onClick={onVote}>
          Ir para a votação
        </Button>
      }
    >
      <div className="discuss">
        <div className="starter-card pop-in">
          <small>Quem começa</small>
          <div className="starter-name">
            <Avatar name={starter.name} index={starter.index} size={52} />
            <strong>{starter.name}</strong>
          </div>
        </div>

        {config.timer > 0 && <Countdown minutes={config.timer} />}

        <ol className="rules-list">
          <li>Na sua vez, diga <b>uma palavra</b> ligada à palavra secreta.</li>
          <li>Não seja óbvio demais, senão o impostor descobre!</li>
          <li>O impostor tenta se misturar sem saber a palavra.</li>
          <li>Depois de algumas voltas, votem em quem é o impostor.</li>
        </ol>

        {config.hintCategory && (
          <p className="muted center">
            Categoria da rodada: <b style={{ color: category?.color }}>{category?.name}</b>
          </p>
        )}
      </div>
    </Screen>
  )
}

function Countdown({ minutes }) {
  const total = minutes * 60
  const [left, setLeft] = useState(total)
  const [running, setRunning] = useState(false)
  const endsAt = useRef(null)

  useEffect(() => {
    if (!running) return
    endsAt.current = Date.now() + left * 1000
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round((endsAt.current - Date.now()) / 1000))
      setLeft(remaining)
      if (remaining === 0) {
        setRunning(false)
        vibrate([200, 100, 200, 100, 400])
      }
    }, 250)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const r = 54
  const circ = 2 * Math.PI * r
  const progress = left / total
  const mm = Math.floor(left / 60)
  const ss = String(left % 60).padStart(2, '0')
  const ended = left === 0

  return (
    <div className={`countdown ${ended ? 'ended' : ''} ${left <= 10 && left > 0 && running ? 'urgent' : ''}`}>
      <svg viewBox="0 0 128 128" width="150" height="150" aria-hidden="true">
        <circle cx="64" cy="64" r={r} className="cd-track" />
        <circle
          cx="64"
          cy="64"
          r={r}
          className="cd-bar"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
          transform="rotate(-90 64 64)"
        />
      </svg>
      <div className="cd-center">
        <strong>{ended ? 'Fim!' : `${mm}:${ss}`}</strong>
      </div>
      <div className="cd-actions">
        {ended ? (
          <Button variant="secondary" size="sm" icon="refresh" onClick={() => setLeft(total)}>
            De novo
          </Button>
        ) : (
          <Button variant="secondary" size="sm" icon={running ? 'pause' : 'timer'} onClick={() => setRunning(!running)}>
            {running ? 'Pausar' : left === total ? 'Iniciar tempo' : 'Continuar'}
          </Button>
        )}
      </div>
    </div>
  )
}

/* ---------- 3. Votação ---------- */

function VotePhase({ players, round, onReveal, onBack, onExit }) {
  const need = round.impostorIds.length
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    vibrate(10)
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (need === 1) return [id]
      if (prev.length >= need) return prev
      return [...prev, id]
    })
  }

  return (
    <Screen
      onBack={onBack}
      title="Votação"
      subtitle={need === 1 ? 'Quem é o impostor?' : `Quem são os ${need} impostores?`}
      right={null}
      footer={
        <div className="footer-stack">
          <Button block size="lg" icon="eye" disabled={selected.length !== need} onClick={() => onReveal({ votedIds: selected })}>
            {selected.length === need ? 'Revelar!' : `Escolha ${need - selected.length} ${need - selected.length === 1 ? 'jogador' : 'jogadores'}`}
          </Button>
          <button type="button" className="link-btn" onClick={() => onReveal({ votedIds: [] })}>
            Revelar sem votar
          </button>
        </div>
      }
    >
      <p className="muted center">Conversem, votem e marquem quem a galera escolheu.</p>
      <div className="vote-grid">
        {players.map((p) => {
          const on = selected.includes(p.id)
          return (
            <button key={p.id} type="button" className={`vote-card ${on ? 'on' : ''}`} onClick={() => toggle(p.id)} aria-pressed={on}>
              <Avatar name={p.name} index={p.index} size={52} />
              <span>{p.name}</span>
              {on && (
                <span className="vote-mark">
                  <Icon name="check" size={16} strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </Screen>
  )
}
