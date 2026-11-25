import Screen from '../components/Screen.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { ImpostorMascot } from '../games/impostor/ImpostorArt.jsx'
import { ThermoMascot } from '../games/termometro/TermometroArt.jsx'
import { TargetMascot } from '../games/namosca/NaMoscaArt.jsx'
import { LiarMascot } from '../games/quemmentiu/QuemMentiuArt.jsx'

const ART = {
  impostor: <ImpostorMascot size={170} />,
  termometro: <ThermoMascot size={170} />,
  namosca: <TargetMascot size={170} />,
  quemmentiu: <LiarMascot size={170} />,
}

export default function GameIntro({ game, onPlay, onBack }) {
  return (
    <Screen
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" onClick={onPlay}>
          Jogar
        </Button>
      }
    >
      <div className="intro-hero" style={{ '--game': game.gradient }}>
        <div className="intro-art pop-in">{ART[game.id]}</div>
        <h1>{game.name}</h1>
        <p>{game.tagline}</p>
        <div className="game-meta center">
          <span><Icon name="users" size={16} /> {game.minPlayers} a {game.maxPlayers} jogadores</span>
          <span><Icon name="timer" size={16} /> {game.duration}</span>
        </div>
      </div>

      <section className="panel">
        <h3>Como jogar</h3>
        <ol className="steps">
          {game.howToPlay.map((s, i) => (
            <li key={i} style={{ animationDelay: `${120 + i * 70}ms` }}>
              <span className="step-n">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>
    </Screen>
  )
}
