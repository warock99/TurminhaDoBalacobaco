import { initials, playerColor } from '../lib/players.js'
import { CharacterArt, CHARACTER_BY_ID } from './Characters.jsx'

/** Avatar do jogador: o personagem escolhido (só a cabeça) ou as iniciais num círculo colorido. */
export default function Avatar({ name, index = 0, size = 44, color, character }) {
  const ch = character ? CHARACTER_BY_ID[character] : null
  const bg = color ?? (ch ? ch.color : playerColor(index))
  return (
    <span
      className={`avatar ${ch ? 'has-character' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.38, '--avatar': bg }}
      aria-hidden="true"
    >
      {ch ? <CharacterArt id={ch.id} crop="head" size={size} animated={size >= 48} /> : initials(name)}
    </span>
  )
}
