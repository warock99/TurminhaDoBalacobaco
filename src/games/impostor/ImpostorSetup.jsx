import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Stepper from '../../components/Stepper.jsx'
import Toggle from '../../components/Toggle.jsx'
import Chip from '../../components/Chip.jsx'
import { CATEGORIES } from './words.js'
import { maxImpostors } from './logic.js'

const TIMER_OPTIONS = [0, 1, 2, 3, 5]

export default function ImpostorSetup({ players, config, setConfig, onStart, onBack }) {
  const max = maxImpostors(players.length)
  const impostors = Math.min(config.impostors, max)
  const allSelected = config.categories.length === CATEGORIES.length
  const update = (patch) => setConfig({ ...config, ...patch })

  const toggleCategory = (id) => {
    const has = config.categories.includes(id)
    const next = has ? config.categories.filter((c) => c !== id) : [...config.categories, id]
    update({ categories: next })
  }

  return (
    <Screen
      title="Configurar partida"
      subtitle={`${players.length} jogadores`}
      onBack={onBack}
      footer={
        <Button
          block
          size="lg"
          icon="play"
          disabled={config.categories.length === 0}
          onClick={() => onStart({ ...config, impostors })}
        >
          {config.categories.length === 0 ? 'Escolha uma categoria' : 'Sortear e começar'}
        </Button>
      }
    >
      <section className="panel">
        <div className="setting-row">
          <div>
            <h3>Impostores</h3>
            <p className="muted">Até {max} com {players.length} jogadores</p>
          </div>
          <Stepper label="Quantidade de impostores" value={impostors} min={1} max={max} onChange={(v) => update({ impostors: v })} />
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Categorias</h3>
          <button
            type="button"
            className="link-btn"
            onClick={() => update({ categories: allSelected ? [] : CATEGORIES.map((c) => c.id) })}
          >
            {allSelected ? 'Limpar' : 'Todas'}
          </button>
        </div>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <Chip key={c.id} color={c.color} selected={config.categories.includes(c.id)} onClick={() => toggleCategory(c.id)}>
              {c.name}
            </Chip>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Tempo de conversa</h3>
        <div className="chips">
          {TIMER_OPTIONS.map((t) => (
            <Chip key={t} selected={config.timer === t} onClick={() => update({ timer: t })}>
              {t === 0 ? 'Sem tempo' : `${t} min`}
            </Chip>
          ))}
        </div>
      </section>

      <section className="panel">
        <Toggle
          checked={config.hintCategory}
          onChange={(v) => update({ hintCategory: v })}
          title="Dica para o impostor"
          description="O impostor vê a categoria da palavra. Deixa o jogo mais equilibrado."
        />
      </section>
    </Screen>
  )
}
