import QuemMentiuSetup from './QuemMentiuSetup.jsx'
import QuemMentiuPlay from './QuemMentiuPlay.jsx'
import QuemMentiuResult from './QuemMentiuResult.jsx'
import { DEFAULT_CONFIG, MIN_PLAYERS, createRound } from './logic.js'

// "Quem Mentiu?" é nome provisório: impostor com perguntas, pedido do Valdir.
export default {
  id: 'quemmentiu',
  name: 'Quem Mentiu?',
  tagline: 'Todo mundo responde a mesma pergunta… menos um.',
  color: '#a855f7',
  gradient: 'linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%)',
  minPlayers: MIN_PLAYERS,
  maxPlayers: 20,
  duration: '5 a 10 min',
  howToPlay: [
    'Passem o celular: cada um vê uma pergunta e responde escondido.',
    'Todo mundo recebe a mesma pergunta, menos um: o impostor recebe outra parecida.',
    'O impostor nem sabe que é o impostor!',
    'No fim aparecem a pergunta da turma e as respostas de todos.',
    'Conversem e votem: qual resposta não combina? Quem mentiu?',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: QuemMentiuSetup,
  Play: QuemMentiuPlay,
  Result: QuemMentiuResult,
}
