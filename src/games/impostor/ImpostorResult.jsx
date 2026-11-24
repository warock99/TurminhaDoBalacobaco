import { useEffect, useState } from 'react'
import { sound } from '../../lib/sound.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import { CATEGORY_BY_ID } from './words.js'
import { ImpostorMascot } from './ImpostorArt.jsx'

export default function ImpostorResult({ round, result, players, onAgain, onSetup, onPlayers, onHome }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const impostors = round.impostorIds.map((id) => byId[id]).filter(Boolean)
  const voted = result?.votedIds ?? []
  const hits = voted.filter((id) => round.impostorIds.includes(id)).length
  const skipped = voted.length === 0
  const caughtAll = !skipped && hits === impostors.length
  const caughtSome = !skipped && hits > 0 && !caughtAll
  const category = CATEGORY_BY_ID[round.categoryId]
  const plural = impostors.length > 1
  const [showWord, setShowWord] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => (caughtAll ? sound.win() : skipped ? sound.reveal() : sound.lose()), 250)
    return () => clearTimeout(id)
  }, [caughtAll, skipped])

  let tone = 'neutral'
  let title = plural ? 'Os impostores eram…' : 'O impostor era…'
  let text = ''
  if (!skipped) {
    if (caughtAll) {
      tone = 'win'
      title = plural ? 'Pegaram os impostores!' : 'Pegaram o impostor!'
      text = plural
        ? 'Mas calma: se algum impostor acertar a palavra agora, os impostores ainda roubam a vitória!'
        : 'Mas calma: se o impostor acertar a palavra agora, ele ainda rouba a vitória!'
    } else if (caughtSome) {
      tone = 'mixed'
      title = 'Pegaram só uma parte!'
      text = 'Alguns impostores escaparam. Vitória dos impostores!'
    } else {
      tone = 'lose'
      title = plural ? 'Os impostores venceram!' : 'O impostor venceu!'
      text = 'A galera votou na pessoa errada.'
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
        <ImpostorMascot size={150} mood={caughtAll ? 'caught' : skipped ? 'normal' : 'win'} className="pop-in" />
        <h1 className="result-title">{title}</h1>
        <div className="impostor-names">
          {impostors.map((p) => (
            <span key={p.id} className="impostor-name pop-in">
              <Avatar name={p.name} index={p.index} size={36} />
              {p.name}
            </span>
          ))}
        </div>
        {text && <p className="result-text">{text}</p>}
      </div>

      <div className="secret-reveal">
        {showWord ? (
          <>
            <small>A palavra secreta era</small>
            <strong className="pop-in">{round.word}</strong>
            <span className="tag" style={{ '--chip': category?.color }}>{category?.name}</span>
          </>
        ) : (
          <>
            <small>{plural ? 'Impostores, chutem a palavra em voz alta!' : 'Impostor, chute a palavra em voz alta!'}</small>
            <Button variant="secondary" icon="eye" silent onClick={() => {
              sound.reveal()
              setShowWord(true)
            }}>
              Mostrar a palavra
            </Button>
          </>
        )}
      </div>
    </Screen>
  )
}
