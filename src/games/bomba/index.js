import BombaSetup from './BombaSetup.jsx'
import BombaPlay from './BombaPlay.jsx'
import BombaResult from './BombaResult.jsx'
import { DEFAULT_CONFIG, MIN_PLAYERS, createRound } from './logic.js'

// "Bomba Secreta" é nome provisório.
export default {
  id: 'bomba',
  name: 'Bomba Secreta',
  tagline: 'Uma das opções é a bomba. Quem escolher, tá fora!',
  color: '#ef4444',
  gradient: 'linear-gradient(135deg, #f97316 0%, #b91c1c 100%)',
  minPlayers: MIN_PLAYERS,
  maxPlayers: 20,
  duration: '5 a 15 min',
  howToPlay: [
    'Aparece uma categoria, tipo "Dias da semana", com várias opções na tela.',
    'Uma das opções é a bomba secreta. Ninguém sabe qual é!',
    'Na sua vez, fale uma opção em voz alta e toque nela.',
    'Escolheu a bomba? Explodiu e está fora! A próxima rodada vem com outra categoria.',
    'Quem sobrar por último é o campeão.',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: BombaSetup,
  Play: BombaPlay,
  Result: BombaResult,
}
