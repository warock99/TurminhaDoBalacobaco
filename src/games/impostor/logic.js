import { CATEGORIES, CATEGORY_BY_ID } from './words.js'
import { pick, shuffle } from '../../lib/random.js'

export const DEFAULT_CONFIG = {
  impostors: 1,
  categories: CATEGORIES.map((c) => c.id),
  hintCategory: true,
  timer: 3, // minutos de conversa (0 = sem cronômetro)
}

export const MIN_PLAYERS = 3

/** Máximo de impostores para manter o jogo justo: sempre mais gente sabendo a palavra. */
export function maxImpostors(playerCount) {
  return Math.max(1, Math.floor((playerCount - 1) / 2))
}

/**
 * Sorteia uma rodada nova.
 * usedWords: palavras já usadas recentemente, para não repetir.
 */
export function createRound(players, config, usedWords = []) {
  const categoryIds = config.categories.length ? config.categories : DEFAULT_CONFIG.categories
  const pool = categoryIds.flatMap((id) => (CATEGORY_BY_ID[id]?.words ?? []).map((word) => ({ word, categoryId: id })))
  const used = new Set(usedWords)
  let available = pool.filter((p) => !used.has(p.word))
  let resetMemory = false
  if (available.length === 0) {
    available = pool
    resetMemory = true
  }
  const chosen = pick(available)

  const count = Math.min(config.impostors, maxImpostors(players.length))
  const impostorIds = shuffle(players.map((p) => p.id)).slice(0, count)

  return {
    word: chosen.word,
    categoryId: chosen.categoryId,
    impostorIds,
    starterId: pick(players).id,
    playerIds: players.map((p) => p.id),
    resetMemory,
  }
}
