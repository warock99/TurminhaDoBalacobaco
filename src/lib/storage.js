import { useEffect, useState } from 'react'

const PREFIX = 'balacobaco:'

export function loadValue(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveValue(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* armazenamento indisponível: segue sem salvar */
  }
}

/** useState que lembra o valor no aparelho (localStorage). */
export function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => loadValue(key, fallback))
  useEffect(() => saveValue(key, value), [key, value])
  return [value, setValue]
}
