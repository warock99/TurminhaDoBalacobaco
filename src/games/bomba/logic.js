import { BOMB_CATEGORIES, BOMB_GROUPS } from './categories.js'
import { pick, shuffle } from '../../lib/random.js'

export const MIN_PLAYERS = 2
export const BOARD_SIZE = 12

export const DEFAULT_CONFIG = {
  groups: BOMB_GROUPS.map((g) => g.id),
}

export function categoryPool(groups) {
  const ids = groups?.length ? groups : DEFAULT_CONFIG.groups
  return BOMB_CATEGORIES.filter((c) => ids.includes(c.group))
}

/**
 * Sorteia uma categoria que ainda não saiu, monta o tabuleiro (até 12 opções)
 * e esconde a bomba em uma delas. Ninguém sabe onde está: é sorte e nervoso!
 */
export function createRound(players, config, usedWords = []) {
  const pool = categoryPool(config.groups)
  const used = new Set(usedWords)
  let available = pool.filter((c) => !used.has(c.title))
  let resetMemory = false
  if (available.length === 0) {
    available = pool
    resetMemory = true
  }
  const category = pick(available)
  const board = shuffle(category.items).slice(0, BOARD_SIZE)
  return {
    word: category.title,
    category,
    board,
    bomb: pick(board),
    playerIds: players.map((p) => p.id),
    firstIndex: Math.floor(Math.random() * players.length),
    resetMemory,
  }
}
