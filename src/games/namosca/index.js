import NaMoscaSetup from './NaMoscaSetup.jsx'
import NaMoscaPlay from './NaMoscaPlay.jsx'
import NaMoscaResult from './NaMoscaResult.jsx'
import { DEFAULT_CONFIG, MIN_PLAYERS, createRound } from './logic.js'

// "Na Mosca" é o nome provisório do jogo de palpites que o Valdir chamou de "Palpite Certo".
export default {
  id: 'namosca',
  name: 'Na Mosca',
  tagline: 'Ninguém sabe a resposta certa. Quem chutar mais perto leva!',
  color: '#f43f5e',
  gradient: 'linear-gradient(135deg, #fb923c 0%, #e11d48 100%)',
  minPlayers: MIN_PLAYERS,
  maxPlayers: 20,
  duration: '10 a 20 min',
  howToPlay: [
    'Aparece uma pergunta com resposta em número, tipo "Quantos ossos tem o corpo humano?".',
    'Passem o celular: cada um digita seu palpite escondido.',
    'A resposta certa aparece e quem chegou mais perto ganha 1 ponto.',
    'Acertou em cheio? Na mosca! Vale 2 pontos.',
    'No fim das perguntas, quem tiver mais pontos é o campeão.',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: NaMoscaSetup,
  Play: NaMoscaPlay,
  Result: NaMoscaResult,
}
