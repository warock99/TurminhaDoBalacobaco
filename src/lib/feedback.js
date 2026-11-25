/** Vibração curta no Android (ignorado onde não existe). */
export function vibrate(pattern = 12) {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    /* sem vibração */
  }
}
