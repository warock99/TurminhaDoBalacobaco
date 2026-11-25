import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Chip from '../../components/Chip.jsx'
import { LIST_GROUPS } from './lists.js'
import { listPool } from './logic.js'

export default function EuDuvidoSetup({ config, setConfig, onStart, onBack }) {
  const groups = config.groups ?? []
  const allSelected = groups.length === LIST_GROUPS.length
  const toggle = (id) => setConfig({ ...config, groups: groups.includes(id) ? groups.filter((g) => g !== id) : [...groups, id] })
  const total = groups.length ? listPool(groups).length : 0

  return (
    <Screen
      title="Configurar partida"
      subtitle="Sem cadastro: só o mediador usa o celular"
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" disabled={groups.length === 0} onClick={() => onStart(config)}>
          {groups.length === 0 ? 'Escolha um assunto' : 'Sortear uma lista'}
        </Button>
      }
    >
      <section className="panel">
        <div className="panel-head">
          <h3>Assuntos</h3>
          <button type="button" className="link-btn" onClick={() => setConfig({ ...config, groups: allSelected ? [] : LIST_GROUPS.map((g) => g.id) })}>
            {allSelected ? 'Limpar' : 'Todos'}
          </button>
        </div>
        <div className="chips">
          {LIST_GROUPS.map((g) => (
            <Chip key={g.id} color={g.color} selected={groups.includes(g.id)} onClick={() => toggle(g.id)}>
              {g.name}
            </Chip>
          ))}
        </div>
        <p className="muted">{total} listas disponíveis nesses assuntos.</p>
      </section>

      <section className="panel">
        <h3>Regra do "eu duvido"</h3>
        <p className="muted">
          Se o que foi falado <b>está</b> na lista, quem duvidou perde. Se <b>não está</b>, perde quem falou.
          Vocês combinam a prenda!
        </p>
      </section>
    </Screen>
  )
}
