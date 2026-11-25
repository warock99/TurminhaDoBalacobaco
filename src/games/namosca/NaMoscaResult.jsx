import { useEffect, useRef, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { CharacterArt } from '../../components/Characters.jsx'
import { sound } from '../../lib/sound.js'
import { vibrate } from '../../lib/feedback.js'
import { formatNumber } from './logic.js'
import { TargetMascot } from './NaMoscaArt.jsx'

function CountUp({ to, duration = 1200, onDone, plain }) {
  const [n, setN] = useState(0)
  const done = useRef(onDone)
  done.current = onDone
  useEffect(() => {
    const start = performance.now()
    let raf
    const step = (t) => {
      const k = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - k, 3)
      setN(Math.round(to * eased))
      if (k < 1) raf = requestAnimationFrame(step)
      else done.current?.()
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <>{formatNumber(n, plain)}</>
}

export default function NaMoscaResult({ round, result, players, config, session, setSession, onAgain, onNewMatch, onSetup, onPlayers, onHome }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const q = round.question
  const [stage, setStage] = useState('suspense') // suspense | counting | shown | podium
  const roundNumber = session.roundNumber ?? 1
  const isLast = roundNumber >= config.rounds
  const scores = session.scores ?? {}
  const ranking = players
    .map((p, i) => ({ ...p, index: i, score: scores[p.id] ?? 0 }))
    .sort((a, b) => b.score - a.score)
  const winners = result.rows.filter((r) => r.winner)
  const exact = winners.some((r) => r.exact)

  useEffect(() => {
    if (stage !== 'shown') return
    vibrate(exact ? [40, 60, 40, 60, 120] : 40)
    sound[exact ? 'win' : 'good']()
  }, [stage, exact])

  useEffect(() => {
    if (stage === 'podium') sound.win()
  }, [stage])

  if (stage === 'podium') {
    const top = ranking.slice(0, 3)
    const order = [top[1], top[0], top[2]].filter(Boolean)
    return (
      <Screen
        className="result result-win"
        footer={
          <div className="footer-stack">
            <Button block size="lg" icon="refresh" onClick={onNewMatch}>Nova partida</Button>
            <div className="footer-row">
              <Button variant="secondary" icon="settings" onClick={onSetup}>Ajustar</Button>
              <Button variant="secondary" icon="users" onClick={onPlayers}>Jogadores</Button>
              <Button variant="secondary" icon="home" onClick={onHome} aria-label="Início" />
            </div>
          </div>
        }
      >
        <div className="result-hero compact">
          <div className="burst" aria-hidden="true" />
          <h1 className="result-title">{ranking[0]?.score === ranking[1]?.score ? 'Empate no topo!' : `${ranking[0]?.name} é o campeão!`}</h1>
        </div>
        <div className="podium">
          {order.map((p) => {
            const place = top.indexOf(p) + 1
            return (
              <div key={p.id} className={`podium-col place-${place}`}>
                <div className="podium-who pop-in" style={{ animationDelay: `${(3 - place) * 250}ms` }}>
                  {p.character ? (
                    <CharacterArt id={p.character} size={place === 1 ? 86 : 66} />
                  ) : (
                    <Avatar name={p.name} index={p.index} size={place === 1 ? 64 : 50} />
                  )}
                  <strong>{p.name}</strong>
                  <small>{p.score} pts</small>
                </div>
                <div className="podium-block">{place}º</div>
              </div>
            )
          })}
        </div>
        <Scoreboard ranking={ranking} />
      </Screen>
    )
  }

  const nextLabel = isLast ? 'Ver o campeão' : `Próxima pergunta (${roundNumber + 1} de ${config.rounds})`

  return (
    <Screen
      className="result"
      footer={
        stage === 'suspense' ? (
          <Button block size="lg" icon="eye" silent onClick={() => { sound.drumroll(); setStage('counting') }}>
            Revelar a resposta
          </Button>
        ) : (
          <Button
            block
            size="lg"
            iconRight="arrowRight"
            disabled={stage !== 'shown'}
            onClick={() => {
              if (isLast) setStage('podium')
              else {
                setSession({ ...session, roundNumber: roundNumber + 1 })
                onAgain()
              }
            }}
          >
            {nextLabel}
          </Button>
        )
      }
    >
      <div className="question-card small">
        <p>{q.q}</p>
      </div>

      <div className={`answer-box ${stage}`}>
        {stage === 'suspense' ? (
          <TargetMascot size={120} />
        ) : (
          <>
            <small>Resposta certa</small>
            <strong>
              <CountUp to={q.a} plain={!q.u} onDone={() => setStage('shown')} />
              {q.u && <span className="answer-unit"> {q.u}</span>}
            </strong>
            {q.note && stage === 'shown' && <p className="muted">{q.note}</p>}
          </>
        )}
      </div>

      {stage === 'shown' && (
        <>
          <h2 className="round-winner pop-in">
            {exact ? 'Na mosca!' : winners.length > 1 ? 'Empate!' : `${byId[winners[0].id]?.name} chegou mais perto!`}
          </h2>
          <ol className="guess-list">
            {result.rows.map((r) => {
              const p = byId[r.id]
              return (
                <li key={r.id} className={`guess-row ${r.winner ? 'winner' : ''}`}>
                  <Avatar name={p.name} character={p.character} index={p.index} size={38} />
                  <span className="player-name">{p.name}</span>
                  <span className="guess-val">
                    {formatNumber(r.guess, !q.u)}
                    <small>{r.diff === 0 ? 'exato' : `errou por ${formatNumber(r.diff, !q.u)}`}</small>
                  </span>
                  {r.points > 0 && <span className="pts pop-in">+{r.points}</span>}
                </li>
              )
            })}
          </ol>
          <Scoreboard ranking={ranking} />
        </>
      )}
    </Screen>
  )
}

function Scoreboard({ ranking }) {
  return (
    <section className="panel scoreboard">
      <h3><Icon name="vote" size={18} /> Placar</h3>
      <ol>
        {ranking.map((p, i) => (
          <li key={p.id}>
            <span className="order-pos">{i + 1}</span>
            <Avatar name={p.name} character={p.character} index={p.index} size={30} />
            <span className="player-name">{p.name}</span>
            <b>{p.score}</b>
          </li>
        ))}
      </ol>
    </section>
  )
}
