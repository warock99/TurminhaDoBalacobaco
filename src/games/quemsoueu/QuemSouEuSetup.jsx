import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Chip from '../../components/Chip.jsx'
import { CATEGORIES } from './cards.js'
import { cardPool } from './logic.js'

const TIMERS = [0, 1, 2, 3, 5]

export default function QuemSouEuSetup({ players, config, setConfig, onStart, onBack }) {
  const update = (patch) => setConfig({ ...config, ...patch })
  const cats = config.categories ?? []
  const allSelected = cats.length === CATEGORIES.length
  const toggle = (id) => update({ categories: cats.includes(id) ? cats.filter((c) => c !== id) : [...cats, id] })
  const total = cats.length ? cardPool(cats).length : 0

  return (
    <Screen
      title="Configurar partida"
      subtitle={`${players.length} jogadores`}
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" disabled={cats.length === 0} onClick={() => onStart(config)}>
          {cats.length === 0 ? 'Escolha uma categoria' : 'Começar'}
        </Button>
      }
    >
      <section className="panel">
        <div className="panel-head">
          <h3>Categorias</h3>
          <button type="button" className="link-btn" onClick={() => update({ categories: allSelected ? [] : CATEGORIES.map((c) => c.id) })}>
            {allSelected ? 'Limpar' : 'Todas'}
          </button>
        </div>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <Chip key={c.id} color={c.color} selected={cats.includes(c.id)} onClick={() => toggle(c.id)}>
              {c.name}
            </Chip>
          ))}
        </div>
        <p className="muted">{total} cartas disponíveis nessas categorias.</p>
      </section>

      <section className="panel">
        <h3>Tempo para adivinhar</h3>
        <div className="chips">
          {TIMERS.map((t) => (
            <Chip key={t} selected={config.timer === t} onClick={() => update({ timer: t })}>
              {t === 0 ? 'Sem tempo' : `${t} min`}
            </Chip>
          ))}
        </div>
      </section>
    </Screen>
  )
}
