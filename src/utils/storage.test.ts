import { beforeEach, describe, expect, it } from 'vitest'

import { readStorage, removeStorage, STORAGE_KEYS, writeStorage } from './storage'

const isStringArray = (value: unknown): string[] | null =>
  Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : null

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('grava e lê valores válidos', () => {
    writeStorage(STORAGE_KEYS.cart, ['a', 'b'])

    expect(readStorage(STORAGE_KEYS.cart, isStringArray)).toEqual(['a', 'b'])
  })

  it('TC-16 — JSON inválido não quebra a aplicação', () => {
    localStorage.setItem(STORAGE_KEYS.cart, '{invalid')

    expect(readStorage(STORAGE_KEYS.cart, isStringArray)).toBeNull()
  })

  it('rejeita formato inválido sem lançar erro', () => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify({ not: 'array' }))

    expect(readStorage(STORAGE_KEYS.cart, isStringArray)).toBeNull()
  })

  it('remove uma chave', () => {
    writeStorage(STORAGE_KEYS.cart, ['a'])
    removeStorage(STORAGE_KEYS.cart)

    expect(readStorage(STORAGE_KEYS.cart, isStringArray)).toBeNull()
  })
})
