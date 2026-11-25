import { LISTS, LIST_GROUPS } from './lists.js'
import { pick } from '../../lib/random.js'

export const DEFAULT_CONFIG = {
  groups: LIST_GROUPS.map((g) => g.id),
}

export function listPool(groups) {
  const ids = groups?.length ? groups : DEFAULT_CONFIG.groups
  return LISTS.filter((l) => ids.includes(l.cat))
}

/** Sorteia uma lista que ainda não saiu. Não usa jogadores: só o mediador mexe no celular. */
export function createRound(players, config, usedWords = []) {
  const pool = listPool(config.groups)
  const used = new Set(usedWords)
  let available = pool.filter((l) => !used.has(l.title))
  let resetMemory = false
  if (available.length === 0) {
    available = pool
    resetMemory = true
  }
  const list = pick(available)
  return { word: list.title, list, resetMemory }
}
