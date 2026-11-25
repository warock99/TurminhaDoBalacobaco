import { useEffect } from 'react'
import { sound } from '../../lib/sound.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Icon from '../../components/Icon.jsx'
import { DoubtMascot } from './EuDuvidoArt.jsx'

export default function EuDuvidoResult({ round, result, onAgain, onSetup, onHome }) {
  const list = round.list
  const found = result?.found ?? []
  const misses = result?.misses ?? 0
  const all = found.length === list.items.length

  useEffect(() => {
    const id = setTimeout(() => (all ? sound.win() : sound.reveal()), 200)
    return () => clearTimeout(id)
  }, [all])

  return (
    <Screen
      className={`result result-${all ? 'win' : 'neutral'}`}
      footer={
        <div className="footer-stack">
          <Button block size="lg" icon="refresh" onClick={onAgain}>
            Nova lista
          </Button>
          <div className="footer-row">
            <Button variant="secondary" icon="settings" onClick={onSetup}>Ajustar</Button>
            <Button variant="secondary" icon="home" onClick={onHome}>Início</Button>
          </div>
        </div>
      }
    >
      <div className="result-hero compact">
        <div className="burst" aria-hidden="true" />
        <DoubtMascot size={110} mood={all ? 'win' : 'normal'} className="pop-in" />
        <h1 className="result-title">{all ? 'Acharam tudo!' : `Acharam ${found.length} de ${list.items.length}`}</h1>
        <p className="result-text">
          {misses === 0 ? 'Nenhum chute errado!' : `${misses} ${misses === 1 ? 'chute errado' : 'chutes errados'} na rodada.`}
        </p>
      </div>

      <section className="panel ed-final">
        <h3>{list.title}</h3>
        <ul className="ed-list">
          {list.items.map((item, i) => {
            const on = found.includes(item)
            return (
              <li key={item} style={{ animationDelay: `${120 + i * 60}ms` }}>
                <div className={`ed-item ${on ? 'on' : 'missed'}`}>
                  <span className="ed-num">{on ? <Icon name="check" size={16} strokeWidth={3.4} /> : i + 1}</span>
                  <span className="ed-text">{item}</span>
                  {!on && <span className="ed-missed-tag">ninguém falou</span>}
                </div>
              </li>
            )
          })}
        </ul>
        <p className="muted ed-source">Fonte: {list.source}</p>
      </section>
    </Screen>
  )
}
