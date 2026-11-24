export const STORAGE_KEYS = {
  cart: 'coffee-delivery:cart:v1',
  theme: 'coffee-delivery:theme:v1',
  lastOrder: 'coffee-delivery:last-order:v1',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

const getStorage = (): Storage | null => {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage
  } catch {
    return null
  }
}

/**
 * Lê e valida um valor do localStorage de forma defensiva.
 * Retorna null para storage indisponível, JSON corrompido ou formato inválido.
 */
export const readStorage = <T>(key: string, validate: (value: unknown) => T | null): T | null => {
  const storage = getStorage()
  if (!storage) return null

  try {
    const raw = storage.getItem(key)
    if (raw === null) return null
    const parsed: unknown = JSON.parse(raw)
    return validate(parsed)
  } catch {
    return null
  }
}

export const writeStorage = (key: string, value: unknown): void => {
  const storage = getStorage()
  if (!storage) return

  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage cheio ou indisponível: a aplicação continua funcionando em memória.
  }
}

export const removeStorage = (key: string): void => {
  const storage = getStorage()
  if (!storage) return

  try {
    storage.removeItem(key)
  } catch {
    // Ignorado intencionalmente.
  }
}
