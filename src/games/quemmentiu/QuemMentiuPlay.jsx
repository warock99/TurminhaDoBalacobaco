import { useState } from 'react'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import Keypad from '../../components/Keypad.jsx'
import { CharacterArt } from '../../components/Characters.jsx'
import { sound } from '../../lib/sound.js'
import { vibrate } from '../../lib/feedback.js'
import { ANSWER_TYPES } from './pairs.js'
import { formatAnswer } from './logic.js'

const TYPE_BY_ID = Object.fromEntries(ANSWER_TYPES.map((t) => [t.id, t]))
const TEXT_MAX = 40

export default function QuemMentiuPlay({ round, players, onFinish, onExit }) {
  const [phase, setPhase] = useState('pass') // pass | answer | reveal | vote
  const [turn, setTurn] = useState(0)
  const [answers, setAnswers] = useState({})

  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const people = round.playerIds.map((id) => byId[id]).filter(Boolean)
  const player = people[turn]
  const header = { onBack: onExit, backIcon: 'close', title: 'Quem Mentiu?' }

  if (phase === 'pass') {
    return (
      <Screen
        {...header}
        subtitle={`Jogador ${turn + 1} de ${people.length}`}
        footer={
          <Button block size="lg" icon="lock" onClick={() => setPhase('answer')}>
            Sou eu, mostrar a pergunta
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
          <p className="muted center">A pergunta é secreta. Só {player.name} pode olhar!</p>
        </div>
      </Screen>
    )
  }

  if (phase === 'answer') {
    const isImpostor = player.id === round.impostorId
    return (
      <AnswerPhase
        key={player.id}
        header={header}
        player={player}
        pair={round.pair}
        // Mesma tela para todos: só muda o texto da pergunta. Nem o impostor sabe que é ele.
        question={isImpostor ? round.pair.impostor : round.pair.crew}
        isLast={turn + 1 === people.length}
        onAnswer={(value) => {
          const next = { ...answers, [player.id]: value }
          setAnswers(next)
          if (turn + 1 < people.length) {
            setTurn(turn + 1)
            setPhase('pass')
          } else {
            setPhase('reveal')
          }
        }}
      />
    )
  }

  if (phase === 'reveal') {
    return <RevealPhase header={header} people={people} pair={round.pair} answers={answers} onVote={() => setPhase('vote')} />
  }

  return (
    <VotePhase
      people={people}
      pair={round.pair}
      answers={answers}
      onBack={() => setPhase('reveal')}
      onReveal={(votedId) => onFinish({ answers, votedId })}
    />
  )
}

/* ---------- Responder escondido ---------- */

function AnswerPhase({ header, player, pair, question, isLast, onAnswer }) {
  const [value, setValue] = useState(pair.type === 'number' || pair.type === 'text' ? '' : null)
  const type = TYPE_BY_ID[pair.type]
  const ready = pair.type === 'text' ? value.trim() !== '' : value !== null && value !== ''

  const choose = (v) => {
    vibrate(10)
    sound.soft()
    setValue(v)
  }

  const confirm = () => {
    if (!ready) return
    vibrate(20)
    sound.add()
    const final = pair.type === 'number' ? Number(value) : pair.type === 'text' ? value.trim() : value
    onAnswer(final)
  }

  return (
    <Screen
      {...header}
      subtitle={player.name}
      footer={
        <Button block size="lg" icon="check" silent disabled={!ready} onClick={confirm}>
          {!ready ? 'Responda a pergunta' : isLast ? 'Confirmar e ver respostas' : 'Confirmar e passar'}
        </Button>
      }
    >
      <div className="qm-question pop-in" style={{ '--chip': type?.color }}>
        <span className="tag">{type?.name}</span>
        <h2>{question}</h2>
      </div>

      {pair.type === 'yesno' && (
        <div className="qm-yesno">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              className={`qm-option big ${v ? 'yes' : 'no'} ${value === v ? 'on' : ''}`}
              aria-pressed={value === v}
              onClick={() => choose(v)}
            >
              {v ? 'Sim' : 'Não'}
            </button>
          ))}
        </div>
      )}

      {pair.type === 'choice' && (
        <div className="qm-choices">
          {pair.options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`qm-option ${value === opt ? 'on' : ''}`}
              aria-pressed={value === opt}
              onClick={() => choose(opt)}
            >
              <span>{opt}</span>
              {value === opt && <Icon name="check" size={18} strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}

      {pair.type === 'number' && <Keypad value={value} onChange={setValue} placeholder="Sua resposta" />}

      {pair.type === 'text' && (
        <form
          className="qm-text"
          onSubmit={(e) => {
            e.preventDefault()
            confirm()
          }}
        >
          <input
            className="input"
            type="text"
            value={value}
            maxLength={TEXT_MAX}
            placeholder="Escreva sua resposta"
            autoComplete="off"
            enterKeyHint="done"
            onChange={(e) => setValue(e.target.value)}
            aria-label="Sua resposta"
          />
          <small className="muted">Responda curtinho: poucas palavras. ({value.length}/{TEXT_MAX})</small>
        </form>
      )}

      <p className="muted center qm-hint">Responda com sinceridade. Ninguém mais vê esta tela.</p>
    </Screen>
  )
}

/* ---------- Revelar a pergunta da turma e as respostas ---------- */

function AnswerList({ people, pair, answers, selectable, selected, onSelect }) {
  return (
    <ul className="qm-answers">
      {people.map((p, i) => {
        const on = selected === p.id
        const content = (
          <>
            <Avatar name={p.name} character={p.character} index={p.index} size={40} />
            <span className="qm-answer-name">{p.name}</span>
            <strong className="qm-answer-value">{formatAnswer(pair.type, answers[p.id])}</strong>
            {selectable && <span className={`qm-radio ${on ? 'on' : ''}`}>{on && <Icon name="check" size={14} strokeWidth={3.4} />}</span>}
          </>
        )
        return (
          <li key={p.id} style={{ animationDelay: `${150 + i * 120}ms` }}>
            {selectable ? (
              <button type="button" className={`qm-answer ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => onSelect(p.id)}>
                {content}
              </button>
            ) : (
              <div className="qm-answer">{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function RevealPhase({ header, people, pair, answers, onVote }) {
  return (
    <Screen
      {...header}
      subtitle="Hora da verdade"
      footer={
        <Button block size="lg" icon="vote" onClick={onVote}>
          Votar em quem mentiu
        </Button>
      }
    >
      <div className="qm-question pop-in">
        <span className="tag">A pergunta era</span>
        <h2>{pair.crew}</h2>
      </div>
      <p className="muted center">Uma dessas respostas foi para outra pergunta. Qual não combina?</p>
      <AnswerList people={people} pair={pair} answers={answers} />
    </Screen>
  )
}

function VotePhase({ people, pair, answers, onBack, onReveal }) {
  const [selected, setSelected] = useState(null)
  return (
    <Screen
      onBack={onBack}
      title="Votação"
      subtitle="Quem respondeu outra pergunta?"
      footer={
        <div className="footer-stack">
          <Button block size="lg" icon="eye" disabled={!selected} onClick={() => onReveal(selected)}>
            {selected ? 'Revelar!' : 'Escolha um jogador'}
          </Button>
          <button type="button" className="link-btn" onClick={() => onReveal(null)}>
            Revelar sem votar
          </button>
        </div>
      }
    >
      <p className="muted center qm-vote-q">“{pair.crew}”</p>
      <AnswerList
        people={people}
        pair={pair}
        answers={answers}
        selectable
        selected={selected}
        onSelect={(id) => {
          vibrate(10)
          sound.soft()
          setSelected(id)
        }}
      />
    </Screen>
  )
}
