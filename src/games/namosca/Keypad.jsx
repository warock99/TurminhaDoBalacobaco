import Icon from '../../components/Icon.jsx'
import { vibrate } from '../../lib/feedback.js'
import { sound } from '../../lib/sound.js'
import { formatNumber } from './logic.js'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', '000']
const MAX_DIGITS = 10

/** Teclado numérico próprio do app: evita o teclado do celular e fica grande para o dedo. */
export default function Keypad({ value, onChange, unit, plain = false }) {
  const press = (k) => {
    vibrate(8)
    sound.soft()
    if (k === 'del') return onChange(value.slice(0, -1))
    if (value === '' && (k === '0' || k === '000')) return onChange('0')
    if (value === '0') return onChange(k === '000' ? '0' : k)
    const next = (value + k).slice(0, MAX_DIGITS)
    onChange(next)
  }

  return (
    <div className="keypad-wrap">
      <div className={`keypad-display ${value ? '' : 'empty'}`} aria-live="polite">
        <strong>{value ? formatNumber(value, plain) : 'Seu palpite'}</strong>
        {unit && value && <small>{unit}</small>}
      </div>
      <div className="keypad">
        {KEYS.map((k) => (
          <button
            key={k}
            type="button"
            className={`key ${k === 'del' ? 'key-del' : ''} ${k === '000' ? 'key-small' : ''}`}
            onClick={() => press(k)}
            onContextMenu={(e) => {
              e.preventDefault()
              if (k === 'del') onChange('')
            }}
            aria-label={k === 'del' ? 'Apagar' : k}
          >
            {k === 'del' ? <Icon name="back" size={26} strokeWidth={2.6} /> : k}
          </button>
        ))}
      </div>
    </div>
  )
}
