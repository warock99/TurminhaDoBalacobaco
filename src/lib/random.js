/** Número inteiro aleatório entre 0 e max-1, usando o gerador seguro quando existe. */
export function randomInt(max) {
  if (max <= 0) return 0
  if (globalThis.crypto?.getRandomValues) {
    const buf = new Uint32Array(1)
    globalThis.crypto.getRandomValues(buf)
    return buf[0] % max
  }
  return Math.floor(Math.random() * max)
}

export function pick(list) {
  return list[randomInt(list.length)]
}

export function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
