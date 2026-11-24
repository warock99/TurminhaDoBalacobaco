import { useRef, useState } from 'react'
import Screen from '../components/Screen.jsx'
import Button, { IconButton } from '../components/Button.jsx'
import Avatar from '../components/Avatar.jsx'
import CharacterPicker from '../components/CharacterPicker.jsx'
import { CHARACTER_BY_ID } from '../components/Characters.jsx'
import { newPlayer } from '../lib/players.js'
import Icon from '../components/Icon.jsx'
import { vibrate } from '../lib/feedback.js'
import { sound } from '../lib/sound.js'

export default function Players({ players, setPlayers, min, max, onNext, onBack }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [character, setCharacter] = useState(null)
  const [editing, setEditing] = useState(null) // id do jogador trocando de personagem
  const inputRef = useRef(null)

  const add = () => {
    const clean = name.trim().replace(/\s+/g, ' ')
    if (!clean) return inputRef.current?.focus()
    if (players.some((p) => p.name.toLowerCase() === clean.toLowerCase())) {
      setError('Esse nome já está na lista.')
      vibrate([20, 40, 20])
      sound.bad()
      return
    }
    if (players.length >= max) {
      setError(`Máximo de ${max} jogadores.`)
      return
    }
    vibrate(10)
    sound.add()
    setPlayers([...players, { ...newPlayer(clean.slice(0, 20)), character }])
    setName('')
    setCharacter(null)
    setError('')
    inputRef.current?.focus()
  }

  const remove = (id) => {
    sound.remove()
    setPlayers(players.filter((p) => p.id !== id))
  }
  const missing = Math.max(0, min - players.length)
  const takenBy = Object.fromEntries(players.filter((p) => p.character).map((p) => [p.character, p.name]))
  const editingPlayer = players.find((p) => p.id === editing)
  const setPlayerCharacter = (id, ch) => setPlayers(players.map((p) => (p.id === id ? { ...p, character: ch } : p)))

  return (
    <Screen
      title="Jogadores"
      subtitle={players.length ? `${players.length} na roda` : 'Quem vai jogar?'}
      onBack={onBack}
      right={
        players.length > 0 && (
          <button type="button" className="link-btn" onClick={() => setPlayers([])}>
            Limpar
          </button>
        )
      }
      footer={
        <Button block size="lg" iconRight="arrowRight" disabled={missing > 0} onClick={onNext}>
          {missing > 0 ? `Faltam ${missing} ${missing === 1 ? 'jogador' : 'jogadores'}` : 'Continuar'}
        </Button>
      }
    >
      <section className="char-section">
        <h3>
          Personagem {character && <span className="char-chosen">{CHARACTER_BY_ID[character]?.name}</span>}
        </h3>
        <CharacterPicker value={character} onChange={setCharacter} takenBy={takenBy} />
      </section>

      <form
        className="add-player"
        onSubmit={(e) => {
          e.preventDefault()
          add()
        }}
      >
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
          placeholder="Nome do jogador"
          maxLength={20}
          autoComplete="off"
          enterKeyHint="done"
          aria-label="Nome do jogador"
        />
        <IconButton icon="plus" label="Adicionar" className="add-btn" type="submit" silent onClick={undefined} />
      </form>
      {error && <p className="form-error">{error}</p>}

      {players.length === 0 ? (
        <div className="empty">
          <div className="empty-avatars" aria-hidden="true">
            <Avatar name="?" index={0} size={48} />
            <Avatar name="?" index={1} size={48} />
            <Avatar name="?" index={2} size={48} />
          </div>
          <p>Adicione pelo menos {min} pessoas. Os nomes ficam salvos para a próxima vez.</p>
        </div>
      ) : (
        <ul className="player-list">
          {players.map((p, i) => (
            <li key={p.id} className="player-item">
              <button type="button" className="avatar-btn" aria-label={`Trocar personagem de ${p.name}`} onClick={() => setEditing(p.id)}>
                <Avatar name={p.name} character={p.character} index={i} size={48} />
                <span className="avatar-edit"><Icon name="refresh" size={12} strokeWidth={3} /></span>
              </button>
              <span className="player-name">{p.name}</span>
              <IconButton icon="trash" label={`Remover ${p.name}`} className="danger-ghost" silent onClick={() => remove(p.id)} />
            </li>
          ))}
        </ul>
      )}
      {editingPlayer && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <div className="modal char-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h2>Personagem de {editingPlayer.name}</h2>
            <CharacterPicker
              layout="grid"
              value={editingPlayer.character}
              takenBy={Object.fromEntries(Object.entries(takenBy).filter(([, n]) => n !== editingPlayer.name))}
              onChange={(ch) => {
                setPlayerCharacter(editingPlayer.id, ch)
                setEditing(null)
              }}
            />
          </div>
        </div>
      )}
    </Screen>
  )
}
