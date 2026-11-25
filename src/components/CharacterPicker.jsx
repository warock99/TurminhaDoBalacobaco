import { CHARACTERS, CharacterArt } from './Characters.jsx'
import Icon from './Icon.jsx'
import { vibrate } from '../lib/feedback.js'
import { sound } from '../lib/sound.js'

/**
 * Lista de personagens para escolher.
 * takenBy: { [characterId]: nomeDoJogador } para mostrar quem já está usando.
 */
export default function CharacterPicker({ value, onChange, takenBy = {}, layout = 'row' }) {
  const choose = (id) => {
    vibrate(10)
    sound.add()
    onChange(id)
  }
  return (
    <div className={`char-picker ${layout}`} role="radiogroup" aria-label="Personagem">
      <button
        type="button"
        role="radio"
        aria-checked={!value}
        className={`char-option none ${!value ? 'selected' : ''}`}
        onClick={() => choose(null)}
      >
        <span className="char-none-icon"><Icon name="close" size={26} /></span>
        <span className="char-name">Nenhum</span>
      </button>
      {CHARACTERS.map((c) => {
        const owner = takenBy[c.id]
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={value === c.id}
            className={`char-option ${value === c.id ? 'selected' : ''} ${owner ? 'taken' : ''}`}
            style={{ '--char': c.color }}
            onClick={() => choose(c.id)}
          >
            <CharacterArt id={c.id} size={58} animated={value === c.id} />
            <span className="char-name">{c.name}</span>
            {owner && <span className="char-owner">{owner}</span>}
          </button>
        )
      })}
    </div>
  )
}
