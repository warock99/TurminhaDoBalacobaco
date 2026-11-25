import { useEffect } from 'react'
import { sound } from '../../lib/sound.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import { formatAnswer } from './logic.js'
import { LiarMascot } from './QuemMentiuArt.jsx'

export default function QuemMentiuResult({ round, result, players, onAgain, onSetup, onPlayers, onHome }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const impostor = byId[round.impostorId]
  const votedId = result?.votedId ?? null
  const skipped = !votedId
  const caught = votedId === round.impostorId
  const voted = votedId ? byId[votedId] : null
  const pair = round.pair
  const answer = formatAnswer(pair.type, result?.answers?.[round.impostorId])

  useEffect(() => {
    const id = setTimeout(() => (caught ? sound.win() : skipped ? sound.reveal() : sound.lose()), 250)
    return () => clearTimeout(id)
  }, [caught, skipped])

  let tone = 'neutral'
  let title = 'O impostor era…'
  let text = ''
  if (!skipped) {
    if (caught) {
      tone = 'win'
      title = 'Pegaram o impostor!'
      text = 'A resposta não combinava e a galera percebeu.'
    } else {
      tone = 'lose'
      title = 'O impostor escapou!'
      text = `${voted?.name ?? 'Alguém'} respondeu a pergunta certa. O impostor era outra pessoa:`
    }
  }

  return (
    <Screen
      className={`result result-${tone}`}
      footer={
        <div className="footer-stack">
          <Button block size="lg" icon="refresh" onClick={onAgain}>
            Nova rodada
          </Button>
          <div className="footer-row">
            <Button variant="secondary" icon="settings" onClick={onSetup}>Ajustar</Button>
            <Button variant="secondary" icon="users" onClick={onPlayers}>Jogadores</Button>
            <Button variant="secondary" icon="home" onClick={onHome} aria-label="Início" />
          </div>
        </div>
      }
    >
      <div className="result-hero">
        <div className="burst" aria-hidden="true" />
        <LiarMascot size={140} mood={caught ? 'caught' : skipped ? 'normal' : 'win'} className="pop-in" />
        <h1 className="result-title">{title}</h1>
        {text && <p className="result-text">{text}</p>}
        {impostor && (
          <div className="impostor-names">
            <span className="impostor-name pop-in">
              <Avatar name={impostor.name} character={impostor.character} index={impostor.index} size={36} />
              {impostor.name}
            </span>
          </div>
        )}
      </div>

      <div className="qm-compare">
        <div className="qm-compare-item">
          <small>A pergunta da turma era</small>
          <p>{pair.crew}</p>
        </div>
        <div className="qm-compare-item impostor">
          <small>{impostor?.name ?? 'O impostor'} recebeu esta</small>
          <p>{pair.impostor}</p>
          <span className="qm-compare-answer">
            Respondeu: <b>{answer}</b>
          </span>
        </div>
      </div>
    </Screen>
  )
}
