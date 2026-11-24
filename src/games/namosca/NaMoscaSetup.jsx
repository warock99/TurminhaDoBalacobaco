import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Chip from '../../components/Chip.jsx'
import { QUESTION_GROUPS } from './questions.js'
import { questionPool } from './logic.js'

const ROUNDS = [5, 10, 15, 20]

export default function NaMoscaSetup({ players, config, setConfig, onStart, onBack }) {
  const update = (patch) => setConfig({ ...config, ...patch })
  const allSelected = config.groups.length === QUESTION_GROUPS.length
  const toggleGroup = (id) => {
    const has = config.groups.includes(id)
    update({ groups: has ? config.groups.filter((g) => g !== id) : [...config.groups, id] })
  }
  const total = questionPool(config.groups).length

  return (
    <Screen
      title="Configurar partida"
      subtitle={`${players.length} jogadores`}
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" disabled={config.groups.length === 0} onClick={() => onStart(config)}>
          {config.groups.length === 0 ? 'Escolha um assunto' : 'Começar'}
        </Button>
      }
    >
      <section className="panel">
        <h3>Quantas perguntas</h3>
        <div className="chips">
          {ROUNDS.map((r) => (
            <Chip key={r} selected={config.rounds === r} onClick={() => update({ rounds: r })}>
              {r} perguntas
            </Chip>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Assuntos</h3>
          <button type="button" className="link-btn" onClick={() => update({ groups: allSelected ? [] : QUESTION_GROUPS.map((g) => g.id) })}>
            {allSelected ? 'Limpar' : 'Todos'}
          </button>
        </div>
        <div className="chips">
          {QUESTION_GROUPS.map((g) => (
            <Chip key={g.id} color={g.color} selected={config.groups.includes(g.id)} onClick={() => toggleGroup(g.id)}>
              {g.name}
            </Chip>
          ))}
        </div>
        <p className="muted">{total} perguntas disponíveis nesses assuntos.</p>
      </section>
    </Screen>
  )
}
