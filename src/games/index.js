// Registro de jogos. Para adicionar um jogo novo:
// 1. Crie a pasta src/games/<nome>/ com um index.js no mesmo formato do Impostor.
// 2. Importe e coloque na lista GAMES abaixo.
import impostor from './impostor/index.js'
import termometro from './termometro/index.js'
import namosca from './namosca/index.js'
import quemmentiu from './quemmentiu/index.js'

export const GAMES = [impostor, termometro, namosca, quemmentiu]

// Jogos que aparecem como "Em breve" na tela inicial.
export const COMING_SOON = []

export const GAME_BY_ID = Object.fromEntries(GAMES.map((g) => [g.id, g]))
