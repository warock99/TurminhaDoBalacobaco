// Registro de jogos. Para adicionar um jogo novo:
// 1. Crie a pasta src/games/<nome>/ com um index.js no mesmo formato do Impostor.
// 2. Importe e coloque na lista GAMES abaixo.
import impostor from './impostor/index.js'

export const GAMES = [impostor]

export const COMING_SOON = [
  {
    id: 'numeros',
    name: 'Em breve',
    tagline: 'Números secretos, dicas criativas e muita discussão para pôr tudo em ordem.',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
  },
]

export const GAME_BY_ID = Object.fromEntries(GAMES.map((g) => [g.id, g]))
