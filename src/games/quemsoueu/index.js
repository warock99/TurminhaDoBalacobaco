import QuemSouEuSetup from './QuemSouEuSetup.jsx'
import QuemSouEuPlay from './QuemSouEuPlay.jsx'
import QuemSouEuResult from './QuemSouEuResult.jsx'
import { DEFAULT_CONFIG, MIN_PLAYERS, createRound } from './logic.js'

export default {
  id: 'quemsoueu',
  name: 'Quem Sou Eu?',
  tagline: 'Celular na testa: todo mundo sabe quem você é… menos você!',
  color: '#facc15',
  gradient: 'linear-gradient(135deg, #facc15 0%, #16a34a 100%)',
  minPlayers: MIN_PLAYERS,
  maxPlayers: 20,
  duration: '2 min por vez',
  howToPlay: [
    'Uma pessoa por vez adivinha. O app diz de quem é a vez.',
    'Ela coloca o celular na testa, com a tela virada para a turma, sem olhar!',
    'Aparece alguém ou alguma coisa: um bicho, um famoso, uma comida…',
    'Ela faz perguntas de sim ou não, e a turma responde.',
    'Acertou antes do tempo acabar? Ponto para ela! Depois o celular passa para o próximo.',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: QuemSouEuSetup,
  Play: QuemSouEuPlay,
  Result: QuemSouEuResult,
}
