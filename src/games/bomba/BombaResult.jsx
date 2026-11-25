import { useEffect } from 'react'
import { sound } from '../../lib/sound.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Avatar from '../../components/Avatar.jsx'
import { CharacterArt } from '../../components/Characters.jsx'
import { BombMascot } from './BombaArt.jsx'

export default function BombaResult({ round, result, players, session, onAgain, onNewMatch, onSetup, onPlayers, onHome }) {
  const byId = Object.fromEntries(players.map((p, i) => [p.id, { ...p, index: i }]))
  const loser = byId[result?.loserId]
  const alive = (session.alive ?? []).map((id) => byId[id]).filter(Boolean)
  const out = (session.out ?? []).map((id) => byId[id]).filter(Boolean)
  const champion = alive.length === 1 ? alive[0] : null

  useEffect(() => {
    const id = setTimeout(() => (champion ? sound.win() : sound.lose()), 250)
    return () => clearTimeout(id)
  }, [champion])

  return (
    <Screen
      className={`result result-${champion ? 'win' : 'lose'}`}
      footer={
        <div className="footer-stack">
          {champion ? (
            <Button block size="lg" icon="refresh" onClick={onNewMatch}>
              Nova partida
            </Button>
          ) : (
            <Button block size="lg" iconRight="arrowRight" onClick={onAgain}>
              Próxima categoria
            </Button>
          )}
          <div className="footer-row">
            <Button variant="secondary" icon="settings" onClick={onSetup}>Ajustar</Button>
            <Button variant="secondary" icon="users" onClick={onPlayers}>Jogadores</Button>
            <Button variant="secondary" icon="home" onClick={onHome} aria-label="Início" />
          </div>
        </div>
      }
    >
      {champion ? (
        <div className="result-hero">
          <div className="burst" aria-hidden="true" />
          {champion.character ? (
            <CharacterArt id={champion.character} size={120} className="pop-in" />
          ) : (
            <Avatar name={champion.name} index={champion.index} size={110} />
          )}
          <h1 className="result-title">{champion.name} venceu!</h1>
          <p className="result-text">Sobreviveu a todas as bombas. Campeão da Bomba Secreta!</p>
        </div>
      ) : (
        <div className="result-hero compact">
          <div className="burst" aria-hidden="true" />
          <BombMascot size={120} mood="boom" className="pop-in" />
          <h1 className="result-title">{loser?.name ?? 'Alguém'} explodiu!</h1>
          <p className="result-text">Está fora da partida. Restam {alive.length} na disputa.</p>
        </div>
      )}

      <div className="secret-reveal">
        <small>{round.category.title}: a bomba era</small>
        <strong className="pop-in">{round.bomb}</strong>
      </div>

      <section className="panel scoreboard">
        <h3>{champion ? 'Ordem de eliminação' : 'Ainda no jogo'}</h3>
        <ol>
          {(champion ? [champion, ...[...out].reverse()] : alive).map((p, i) => (
            <li key={p.id}>
              <span className="order-pos">{i + 1}</span>
              <Avatar name={p.name} character={p.character} index={p.index} size={30} />
              <span className="player-name">{p.name}</span>
              {champion && <b className={i === 0 ? 'bomb-win-tag' : 'bomb-out-tag'}>{i === 0 ? 'Campeão' : 'Explodiu'}</b>}
            </li>
          ))}
        </ol>
        {!champion && out.length > 0 && <p className="muted bomb-out">Fora: {out.map((p) => p.name).join(', ')}</p>}
      </section>
    </Screen>
  )
}
