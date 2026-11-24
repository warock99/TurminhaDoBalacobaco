import { initials, playerColor } from '../lib/players.js'

export default function Avatar({ name, index = 0, size = 44, color }) {
  const bg = color ?? playerColor(index)
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.38, '--avatar': bg }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
