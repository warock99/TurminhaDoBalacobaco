import { IconButton } from './Button.jsx'

export default function Stepper({ value, min, max, onChange, label }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <IconButton icon="minus" label="Diminuir" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} />
      <span className="stepper-value" key={value}>{value}</span>
      <IconButton icon="plus" label="Aumentar" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} />
    </div>
  )
}
