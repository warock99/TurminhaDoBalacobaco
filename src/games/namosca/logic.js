import { QUESTIONS, QUESTION_GROUPS } from './questions.js'
import { pick } from '../../lib/random.js'

export const DEFAULT_CONFIG = {
  groups: QUESTION_GROUPS.map((g) => g.id),
  rounds: 10,
}

export const MIN_PLAYERS = 2

export function questionPool(groups) {
  const ids = groups.length ? groups : DEFAULT_CONFIG.groups
  return QUESTIONS.filter((q) => ids.includes(q.cat))
}

/** Sorteia uma pergunta que ainda não saiu (lembra as já usadas no aparelho). */
export function createRound(players, config, used = []) {
  const pool = questionPool(config.groups)
  const usedSet = new Set(used)
  let available = pool.filter((q) => !usedSet.has(q.q))
  const resetMemory = available.length === 0
  if (resetMemory) available = pool
  const question = pick(available)
  return { question, playerIds: players.map((p) => p.id), word: question.q, resetMemory }
}

/**
 * Pontuação da rodada: quem chegar mais perto ganha 1 ponto (empate: todos ganham).
 * Acertar em cheio vale 2 pontos.
 */
export function scoreRound(guesses, answer) {
  const rows = Object.entries(guesses).map(([id, guess]) => ({ id, guess, diff: Math.abs(guess - answer) }))
  const best = Math.min(...rows.map((r) => r.diff))
  return rows
    .map((r) => ({ ...r, winner: r.diff === best, exact: r.diff === 0, points: r.diff === best ? (r.diff === 0 ? 2 : 1) : 0 }))
    .sort((a, b) => a.diff - b.diff)
}

/** Formata com ponto de milhar (1.440), menos anos (2016), que ficam sem ponto. */
export function formatNumber(n, plain = false) {
  return plain ? String(n) : Number(n).toLocaleString('pt-BR')
}
