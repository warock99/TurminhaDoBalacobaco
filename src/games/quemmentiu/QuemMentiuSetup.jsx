import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import Chip from '../../components/Chip.jsx'
import { ANSWER_TYPES } from './pairs.js'
import { pairPool } from './logic.js'

export default function QuemMentiuSetup({ players, config, setConfig, onStart, onBack }) {
  const types = config.types ?? []
  const toggle = (id) => {
    const has = types.includes(id)
    setConfig({ ...config, types: has ? types.filter((t) => t !== id) : [...types, id] })
  }
  const allSelected = types.length === ANSWER_TYPES.length
  const total = types.length ? pairPool(types).length : 0

  return (
    <Screen
      title="Configurar partida"
      subtitle={`${players.length} jogadores`}
      onBack={onBack}
      footer={
        <Button block size="lg" icon="play" disabled={types.length === 0} onClick={() => onStart(config)}>
          {types.length === 0 ? 'Escolha um tipo de resposta' : 'Sortear e começar'}
        </Button>
      }
    >
      <section className="panel">
        <div className="panel-head">
          <h3>Tipos de pergunta</h3>
          <button type="button" className="link-btn" onClick={() => setConfig({ ...config, types: allSelected ? [] : ANSWER_TYPES.map((t) => t.id) })}>
            {allSelected ? 'Limpar' : 'Todos'}
          </button>
        </div>
        <div className="chips">
          {ANSWER_TYPES.map((t) => (
            <Chip key={t.id} color={t.color} selected={types.includes(t.id)} onClick={() => toggle(t.id)}>
              {t.name}
            </Chip>
          ))}
        </div>
        <p className="muted">{total} pares de perguntas disponíveis.</p>
      </section>

      <section className="panel">
        <h3>Como funciona</h3>
        <p className="muted">
          Sempre tem <b>1 impostor</b>, sorteado em segredo. Ele recebe uma pergunta diferente, mas parecida,
          e nem sabe que é o impostor. Por isso, todo mundo responde com sinceridade!
        </p>
      </section>
    </Screen>
  )
}
