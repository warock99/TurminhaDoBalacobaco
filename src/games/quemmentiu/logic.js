import { ANSWER_TYPES, PAIRS } from './pairs.js'
import { pick } from '../../lib/random.js'

export const MIN_PLAYERS = 3

export const DEFAULT_CONFIG = {
  types: ANSWER_TYPES.map((t) => t.id),
}

export function pairPool(types) {
  const list = types?.length ? types : DEFAULT_CONFIG.types
  return PAIRS.filter((p) => list.includes(p.type))
}

/**
 * Sorteia um par de perguntas que ainda não saiu e um único impostor.
 * O impostor NÃO sabe que é o impostor: só recebe uma pergunta diferente.
 */
export function createRound(players, config, usedWords = []) {
  const pool = pairPool(config.types)
  const used = new Set(usedWords)
  let available = pool.filter((p) => !used.has(p.crew))
  let resetMemory = false
  if (available.length === 0) {
    available = pool
    resetMemory = true
  }
  const pair = pick(available)
  return {
    word: pair.crew,
    pair,
    impostorId: pick(players).id,
    playerIds: players.map((p) => p.id),
    resetMemory,
  }
}

/** Texto da resposta para mostrar na revelação. */
export function formatAnswer(type, value) {
  if (value === undefined || value === null || value === '') return '—'
  if (type === 'yesno') return value ? 'Sim' : 'Não'
  if (type === 'number') return Number(value).toLocaleString('pt-BR')
  return String(value)
}
