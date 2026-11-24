import { useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import { CharacterArt } from '../../components/Characters.jsx'
import { sound } from '../../lib/sound.js'
import { vibrate } from '../../lib/feedback.js'
import Keypad from './Keypad.jsx'
import { scoreRound } from './logic.js'
import { QUESTION_GROUPS } from './questions.js'

export default function NaMoscaPlay({ round, players, config, session, setSession, onFinish, onExit }) {
  const [phase, setPhase] = useState('question') // question | pass | guess
  const [turn, setTurn] = useState(0)
  const [guesses, setGuesses] = useState({})
  const [value, setValue] = useState('')

  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const people = round.playerIds.map((id) => byId[id]).filter(Boolean)
  const roundNumber = session.roundNumber ?? 1
  const q = round.question
  const group = QUESTION_GROUPS.find((g) => g.id === q.cat)
  const player = people[turn]

  const finish = (all) => {
    const rows = scoreRound(all, q.a)
    const scores = { ...(session.scores ?? {}) }
    for (const r of rows) scores[r.id] = (scores[r.id] ?? 0) + r.points
    setSession({ ...session, roundNumber, scores })
    onFinish({ guesses: all, rows })
  }

  const header = { onBack: onExit, backIcon: 'close', title: 'Na Mosca', subtitle: `Pergunta ${roundNumber} de ${config.rounds}` }

  if (phase === 'question') {
    return (
      <Screen
        {...header}
        footer={
          <Button block size="lg" iconRight="arrowRight" onClick={() => setPhase('pass')}>
            Todo mundo leu? Bora palpitar
          </Button>
        }
      >
        <div className="question-card pop-in" style={{ '--chip': group?.color }}>
          <span className="tag">{group?.name}</span>
          <h2>{q.q}</h2>
          {q.u && <small>Resposta em {q.u}</small>}
        </div>
        <p className="muted center">Leiam a pergunta em voz alta. Depois, cada um dá seu palpite escondido.</p>
      </Screen>
    )
  }

  if (phase === 'pass') {
    return (
      <Screen
        {...header}
        footer={
          <Button block size="lg" icon="lock" onClick={() => { setValue(''); setPhase('guess') }}>
            Sou eu, quero palpitar
          </Button>
        }
      >
        <div className="pass">
          <div className="progress-dots" aria-hidden="true">
            {people.map((p, i) => (
              <span key={p.id} className={i < turn ? 'done' : i === turn ? 'current' : ''} />
            ))}
          </div>
          <div className="pass-big">
            {player.character ? (
              <CharacterArt id={player.character} size={110} />
            ) : (
              <Avatar name={player.name} index={player.index} size={96} />
            )}
            <small>Passe o celular para</small>
            <strong>{player.name}</strong>
          </div>
        </div>
      </Screen>
    )
  }

  return (
    <Screen
      {...header}
      footer={
        <Button
          block
          size="lg"
          icon="check"
          disabled={value === ''}
          silent
          onClick={() => {
            vibrate(20)
            sound.add()
            const next = { ...guesses, [player.id]: Number(value) }
            setGuesses(next)
            if (turn + 1 < people.length) {
              setTurn(turn + 1)
              setPhase('pass')
            } else {
              finish(next)
            }
          }}
        >
          {value === '' ? 'Digite seu palpite' : turn + 1 < people.length ? 'Confirmar e passar' : 'Confirmar e revelar'}
        </Button>
      }
    >
      <div className="guess-head">
        <Avatar name={player.name} character={player.character} index={player.index} size={40} />
        <span><b>{player.name}</b>, seu palpite:</span>
      </div>
      <p className="guess-question">{q.q}</p>
      <Keypad value={value} onChange={setValue} unit={q.u} plain={!q.u} />
    </Screen>
  )
}
