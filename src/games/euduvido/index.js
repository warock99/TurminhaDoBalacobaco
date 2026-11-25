import EuDuvidoSetup from './EuDuvidoSetup.jsx'
import EuDuvidoPlay from './EuDuvidoPlay.jsx'
import EuDuvidoResult from './EuDuvidoResult.jsx'
import { DEFAULT_CONFIG, createRound } from './logic.js'

export default {
  id: 'euduvido',
  name: 'Eu Duvido!',
  tagline: 'Uma lista secreta, a turma chutando… e alguém grita: eu duvido!',
  color: '#06b6d4',
  gradient: 'linear-gradient(135deg, #06b6d4 0%, #1d4ed8 100%)',
  // Não precisa cadastrar jogadores: só o mediador mexe no celular.
  noPlayers: true,
  minPlayers: 3,
  maxPlayers: 20,
  duration: '5 a 10 min',
  howToPlay: [
    'Uma pessoa é o mediador: só ela olha o celular e não joga.',
    'O mediador lê o tema em voz alta, por exemplo "Os 10 países mais populosos do mundo".',
    'Na sua vez, cada um fala algo que acha que está na lista.',
    'Achou que é chute? Grite "Eu duvido!". O mediador confere na lista.',
    'Se estava na lista, quem duvidou perde. Se não estava, perde quem falou.',
  ],
  defaultConfig: DEFAULT_CONFIG,
  createRound,
  Setup: EuDuvidoSetup,
  Play: EuDuvidoPlay,
  Result: EuDuvidoResult,
}
