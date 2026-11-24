import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Chip from '../../components/Chip.jsx'
import { THEME_GROUPS } from './themes.js'

const RANGES = [
  { value: 10, label: '1 a 10', hint: 'Fácil' },
  { value: 50, label: '1 a 50', hint: 'Médio' },
  { value: 100, label: '1 a 100', hint: 'Clássico' },
]

export default function TermometroSetup({ players, config, setConfig, onStart, onBack }) {
  const update = (patch) => setConfig({ ...config, ...patch })
  const allSelected = config.groups.length === THEME_GROUPS.length
  const toggleGroup = (id) => {
    const has = config.groups.includes(id)
    update({ groups: has ? config.groups.filter((g) => g !== id) : [...config.groups, id] })
  }

  return (
    <Screen
      title="Configurar partida"
      subtitle={`${players.length} jogadores`}
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" disabled={config.groups.length === 0} onClick={() => onStart(config)}>
          {config.groups.length === 0 ? 'Escolha um tipo de tema' : 'Sortear e começar'}
        </Button>
      }
    >
      <section className="panel">
        <h3>Números secretos</h3>
        <p className="muted">Quanto maior a faixa, mais difícil acertar a ordem.</p>
        <div className="chips">
          {RANGES.map((r) => (
            <Chip key={r.value} selected={config.maxNumber === r.value} onClick={() => update({ maxNumber: r.value })}>
              {r.label} · {r.hint}
            </Chip>
          ))}
        </div>
        {config.maxNumber < players.length && (
          <p className="muted">Com {players.length} jogadores, os números vão de 1 a {players.length}.</p>
        )}
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Tipos de tema</h3>
          <button type="button" className="link-btn" onClick={() => update({ groups: allSelected ? [] : THEME_GROUPS.map((g) => g.id) })}>
            {allSelected ? 'Limpar' : 'Todos'}
          </button>
        </div>
        <div className="chips">
          {THEME_GROUPS.map((g) => (
            <Chip key={g.id} color={g.color} selected={config.groups.includes(g.id)} onClick={() => toggleGroup(g.id)}>
              {g.name}
            </Chip>
          ))}
        </div>
      </section>
    </Screen>
  )
}
