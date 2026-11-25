import TermometroSetup from './TermometroSetup.jsx'
import TermometroPlay from './TermometroPlay.jsx'
import TermometroResult from './TermometroResult.jsx'
import { DEFAULT_CONFIG, MIN_PLAYERS, createRound } from './logic.js'

// "Termômetro" é um nome provisório: o Valdir ainda vai escolher o nome final.
export default {
  id: 'termometro',
  name: 'Termômetro',
  tagline: 'Números secretos, dicas criativas e uma fila para pôr em ordem.',
  color: '#38bdf8',
  gradient: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
  minPlayers: MIN_PLAYERS,
  maxPlayers: 20,
  duration: '5 a 15 min',
  howToPlay: [
    'Cada um recebe um número secreto de 1 a 100. Ninguém pode contar o seu!',
    'Aparece um tema com uma escala, tipo "Comidas: de horrível a delícia".',
    'Cada um fala algo do tema que combine com seu número. Número alto, coisa forte!',
    'Juntos, arrumem a fila do menor para o maior só pelas dicas.',
    'Revelem os números um por um e vejam se a turma está afinada.',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: TermometroSetup,
  Play: TermometroPlay,
  Result: TermometroResult,
}
