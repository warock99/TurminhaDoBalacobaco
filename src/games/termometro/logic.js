import { THEMES, THEME_GROUPS } from './themes.js'
import { pick, shuffle } from '../../lib/random.js'

export const DEFAULT_CONFIG = {
  groups: THEME_GROUPS.map((g) => g.id),
  maxNumber: 100,
}

export const MIN_PLAYERS = 2

export function themePool(groups) {
  const ids = groups.length ? groups : DEFAULT_CONFIG.groups
  return THEMES.filter((t) => ids.includes(t.group))
}

/** Escolhe um tema que ainda não saiu recentemente. */
export function pickTheme(groups, used = [], exceptText) {
  const pool = themePool(groups)
  let available = pool.filter((t) => !used.includes(t.text) && t.text !== exceptText)
  if (available.length === 0) available = pool.filter((t) => t.text !== exceptText)
  if (available.length === 0) available = pool
  return pick(available)
}

/** Cada jogador recebe um número diferente entre 1 e maxNumber. */
export function createRound(players, config, usedThemes = []) {
  const max = Math.max(config.maxNumber, players.length)
  const numbers = shuffle(Array.from({ length: max }, (_, i) => i + 1)).slice(0, players.length)
  const theme = pickTheme(config.groups, usedThemes)
  return {
    theme,
    numbers: Object.fromEntries(players.map((p, i) => [p.id, numbers[i]])),
    playerIds: players.map((p) => p.id),
    word: theme.text, // usado pelo App para não repetir temas
    resetMemory: themePool(config.groups).every((t) => usedThemes.includes(t.text)),
  }
}

/**
 * Confere a ordem escolhida pelo grupo.
 * Um erro acontece quando um número revelado é menor que algum já revelado antes dele.
 */
export function checkOrder(order, numbers) {
  let highest = -Infinity
  return order.map((id) => {
    const n = numbers[id]
    const ok = n > highest
    if (ok) highest = n
    return { id, number: n, ok }
  })
}
