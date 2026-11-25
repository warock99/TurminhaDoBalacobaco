import ImpostorSetup from './ImpostorSetup.jsx'
import ImpostorPlay from './ImpostorPlay.jsx'
import ImpostorResult from './ImpostorResult.jsx'
import { DEFAULT_CONFIG, MIN_PLAYERS, createRound } from './logic.js'

export default {
  id: 'impostor',
  name: 'Impostor',
  tagline: 'Todo mundo sabe a palavra… menos um.',
  color: '#ef4444',
  gradient: 'linear-gradient(135deg, #f43f5e 0%, #9f1239 100%)',
  minPlayers: MIN_PLAYERS,
  maxPlayers: 20,
  duration: '5 a 10 min',
  howToPlay: [
    'Cadastre a galera e passe o celular de mão em mão.',
    'Cada um vê a palavra secreta escondido. O impostor não vê!',
    'Na sua vez, cada um fala uma palavra ligada à secreta.',
    'Votem em quem vocês acham que é o impostor.',
    'Se pegarem o impostor, ele ainda pode chutar a palavra para virar o jogo.',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: ImpostorSetup,
  Play: ImpostorPlay,
  Result: ImpostorResult,
}
