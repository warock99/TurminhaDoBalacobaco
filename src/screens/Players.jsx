import { useRef, useState } from 'react'
import Screen from '../components/Screen.jsx'
import Button, { IconButton } from '../components/Button.jsx'
import Avatar from '../components/Avatar.jsx'
import { newPlayer } from '../lib/players.js'
import { vibrate } from '../lib/feedback.js'

export default function Players({ players, setPlayers, min, max, onNext, onBack }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const add = () => {
    const clean = name.trim().replace(/\s+/g, ' ')
    if (!clean) return inputRef.current?.focus()
    if (players.some((p) => p.name.toLowerCase() === clean.toLowerCase())) {
      setError('Esse nome já está na lista.')
      vibrate([20, 40, 20])
      return
    }
    if (players.length >= max) {
      setError(`Máximo de ${max} jogadores.`)
      return
    }
    vibrate(10)
    setPlayers([...players, newPlayer(clean.slice(0, 20))])
    setName('')
    setError('')
    inputRef.current?.focus()
  }

  const remove = (id) => setPlayers(players.filter((p) => p.id !== id))
  const missing = Math.max(0, min - players.length)

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
        <IconButton icon="plus" label="Adicionar" className="add-btn" type="submit" onClick={undefined} />
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
              <Avatar name={p.name} index={i} />
              <span className="player-name">{p.name}</span>
              <IconButton icon="trash" label={`Remover ${p.name}`} className="danger-ghost" onClick={() => remove(p.id)} />
            </li>
          ))}
        </ul>
      )}
    </Screen>
  )
}
