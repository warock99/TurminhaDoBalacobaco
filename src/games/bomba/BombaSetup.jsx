import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Chip from '../../components/Chip.jsx'
import { BOMB_GROUPS } from './categories.js'
import { categoryPool } from './logic.js'

export default function BombaSetup({ players, config, setConfig, onStart, onBack }) {
  const groups = config.groups ?? []
  const allSelected = groups.length === BOMB_GROUPS.length
  const toggle = (id) => setConfig({ ...config, groups: groups.includes(id) ? groups.filter((g) => g !== id) : [...groups, id] })
  const total = groups.length ? categoryPool(groups).length : 0

  return (
    <Screen
      title="Configurar partida"
      subtitle={`${players.length} jogadores`}
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" disabled={groups.length === 0} onClick={() => onStart(config)}>
          {groups.length === 0 ? 'Escolha um assunto' : 'Começar'}
        </Button>
      }
    >
      <section className="panel">
        <div className="panel-head">
          <h3>Assuntos</h3>
          <button type="button" className="link-btn" onClick={() => setConfig({ ...config, groups: allSelected ? [] : BOMB_GROUPS.map((g) => g.id) })}>
            {allSelected ? 'Limpar' : 'Todos'}
          </button>
        </div>
        <div className="chips">
          {BOMB_GROUPS.map((g) => (
            <Chip key={g.id} color={g.color} selected={groups.includes(g.id)} onClick={() => toggle(g.id)}>
              {g.name}
            </Chip>
          ))}
        </div>
        <p className="muted">{total} categorias disponíveis. As opções mudam a cada vez que a categoria aparece.</p>
      </section>

      <section className="panel">
        <h3>Como acaba</h3>
        <p className="muted">
          Cada rodada elimina quem achar a bomba. Rodada após rodada, quem sobrar por último é o campeão.
        </p>
      </section>
    </Screen>
  )
}
