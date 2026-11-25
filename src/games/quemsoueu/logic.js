import { CATEGORIES, CATEGORY_BY_ID } from './cards.js'
import { pick } from '../../lib/random.js'

export const MIN_PLAYERS = 2

export const DEFAULT_CONFIG = {
  categories: CATEGORIES.map((c) => c.id),
  timer: 2, // minutos para adivinhar (0 = sem tempo)
}

export function cardPool(categories) {
  const ids = categories?.length ? categories : DEFAULT_CONFIG.categories
  return ids.flatMap((id) => (CATEGORY_BY_ID[id]?.items ?? []).map((name) => ({ name, categoryId: id })))
}

/** Sorteia uma carta que ainda não saiu. Quem adivinha é escolhido na tela da partida (em rodízio). */
export function createRound(players, config, usedWords = []) {
  const pool = cardPool(config.categories)
  const used = new Set(usedWords)
  let available = pool.filter((c) => !used.has(c.name))
  let resetMemory = false
  if (available.length === 0) {
    available = pool
    resetMemory = true
  }
  const card = pick(available)
  return { word: card.name, card, playerIds: players.map((p) => p.id), resetMemory }
}
