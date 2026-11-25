import Icon from '../components/Icon.jsx'
import SoundToggle from '../components/SoundToggle.jsx'
import { sound } from '../lib/sound.js'
import { GAMES, COMING_SOON } from '../games/index.js'
import { ImpostorMascot } from '../games/impostor/ImpostorArt.jsx'
import { ThermoMascot } from '../games/termometro/TermometroArt.jsx'
import { TargetMascot } from '../games/namosca/NaMoscaArt.jsx'
import { LiarMascot } from '../games/quemmentiu/QuemMentiuArt.jsx'
import { ForeheadMascot } from '../games/quemsoueu/QuemSouEuArt.jsx'
import { DoubtMascot } from '../games/euduvido/EuDuvidoArt.jsx'
import { vibrate } from '../lib/feedback.js'

const ART = {
  impostor: <ImpostorMascot size={96} />,
  termometro: <ThermoMascot size={96} />,
  namosca: <TargetMascot size={96} />,
  quemmentiu: <LiarMascot size={96} />,
  quemsoueu: <ForeheadMascot size={96} />,
  euduvido: <DoubtMascot size={96} />,
}

export default function Home({ onPick }) {
  return (
    <div className="screen home">
      <main className="screen-body">
        <div className="home-top">
          <SoundToggle />
        </div>
        <div className="home-hero">
          <img src="./favicon.svg" alt="" width="72" height="72" className="home-logo" />
          <h1>
            Turminha do <span>Balacobaco</span>
          </h1>
          <p>Jogos para a galera, num celular só.</p>
        </div>

        <h2 className="section-title">Escolha um jogo</h2>
        <div className="game-list">
          {GAMES.map((g, i) => (
            <button
              key={g.id}
              type="button"
              className="game-card"
              style={{ '--game': g.gradient, animationDelay: `${i * 80}ms` }}
              onClick={() => {
                vibrate(12)
                sound.tap()
                onPick(g.id)
              }}
            >
              <div className="game-card-text">
                <h3>{g.name}</h3>
                <p>{g.tagline}</p>
                <div className="game-meta">
                  <span><Icon name="users" size={16} /> {g.minPlayers}+</span>
                  <span><Icon name="timer" size={16} /> {g.duration}</span>
                </div>
              </div>
              <div className="game-card-art">{ART[g.id]}</div>
            </button>
          ))}
          {COMING_SOON.map((g, i) => (
            <div key={g.id} className="game-card soon" style={{ '--game': g.gradient, animationDelay: `${(GAMES.length + i) * 80}ms` }}>
              <div className="game-card-text">
                <h3>{g.name}</h3>
                <p>{g.tagline}</p>
              </div>
              <div className="game-card-art soon-art">
                <Icon name="lock" size={40} />
              </div>
            </div>
          ))}
        </div>

        <p className="home-foot">Funciona sem internet. Sem cadastro.</p>
        <p className="home-version">Versão de {__APP_BUILD__}</p>
      </main>
    </div>
  )
}
