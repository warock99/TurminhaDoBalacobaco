import { vibrate } from '../lib/feedback.js'
import { sound } from '../lib/sound.js'
import Icon from './Icon.jsx'

export default function Chip({ selected, onClick, children, color }) {
  return (
    <button
      type="button"
      className={`chip ${selected ? 'selected' : ''}`}
      style={color ? { '--chip': color } : undefined}
      aria-pressed={selected}
      onClick={() => {
        vibrate(8)
        sound.soft()
        onClick()
      }}
    >
      {selected && <Icon name="check" size={16} strokeWidth={3} />}
      {children}
    </button>
  )
}
