export const PLAYER_COLORS = [
  '#f472b6', '#60a5fa', '#facc15', '#4ade80', '#fb923c', '#a78bfa',
  '#22d3ee', '#f87171', '#a3e635', '#e879f9', '#2dd4bf', '#fbbf24',
]

export function playerColor(index) {
  return PLAYER_COLORS[index % PLAYER_COLORS.length]
}

export function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

let counter = 0
export function newPlayer(name) {
  counter += 1
  return { id: `${Date.now().toString(36)}-${counter}`, name: name.trim() }
}
