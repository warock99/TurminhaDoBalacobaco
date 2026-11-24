import { vibrate } from '../lib/feedback.js'

export default function Toggle({ checked, onChange, title, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`toggle-row ${checked ? 'on' : ''}`}
      onClick={() => {
        vibrate(8)
        onChange(!checked)
      }}
    >
      <span className="toggle-text">
        <strong>{title}</strong>
        {description && <small>{description}</small>}
      </span>
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
    </button>
  )
}
