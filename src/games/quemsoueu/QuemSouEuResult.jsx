import { useEffect } from 'react'
import { sound } from '../../lib/sound.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { CATEGORY_BY_ID } from './cards.js'
import { ForeheadMascot } from './QuemSouEuArt.jsx'

function formatTime(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return m ? `${m} min ${String(r).padStart(2, '0')} s` : `${r} s`
}

export default function QuemSouEuResult({ round, result, players, session, onAgain, onSetup, onPlayers, onHome }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const people = round.playerIds.map((id) => byId[id]).filter(Boolean)
  const guesser = byId[result?.guesserId]
  const hit = !!result?.hit
  const category = CATEGORY_BY_ID[round.card.categoryId]
  const next = people[(session.turn ?? 0) % people.length]
  const scores = session.scores ?? {}
  const ranking = people.map((p) => ({ ...p, score: scores[p.id] ?? 0 })).sort((a, b) => b.score - a.score)

  useEffect(() => {
    const id = setTimeout(() => (hit ? sound.win() : sound.lose()), 200)
    return () => clearTimeout(id)
  }, [hit])

  const q = result?.questions ?? 0
  const details = hit
    ? `Em ${formatTime(result?.seconds ?? 0)}${q ? `, com ${q} ${q === 1 ? 'pergunta' : 'perguntas'}` : ''}.`
    : result?.timeUp
      ? 'O tempo acabou!'
      : 'Não foi dessa vez.'

  return (
    <Screen
      className={`result result-${hit ? 'win' : 'lose'}`}
      footer={
        <div className="footer-stack">
          <Button block size="lg" iconRight="arrowRight" onClick={onAgain}>
            Próximo: {next?.name}
          </Button>
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
        <ForeheadMascot size={120} mood={hit ? 'win' : 'caught'} className="pop-in" />
        <h1 className="result-title">{hit ? `${guesser?.name ?? 'Você'} acertou!` : `${guesser?.name ?? 'Você'} não acertou`}</h1>
        <p className="result-text">{details}</p>
      </div>

      <div className="secret-reveal">
        <small>{guesser?.name ?? 'Você'} era</small>
        <strong className="pop-in">{round.card.name}</strong>
        <span className="tag" style={{ '--chip': category?.color }}>{category?.name}</span>
      </div>

      <section className="panel scoreboard">
        <h3><Icon name="vote" size={18} /> Acertos</h3>
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
    </Screen>
  )
}
