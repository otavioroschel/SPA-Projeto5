import { describe, expect, it } from 'vitest'

import { sanitizeCartItems } from './cartHydration'

const validIds = new Set(['a', 'b'])

describe('sanitizeCartItems', () => {
  it('TC-17 — remove IDs inexistentes e quantidades inválidas', () => {
    const result = sanitizeCartItems(
      [
        { coffeeId: 'a', quantity: 2 },
        { coffeeId: 'unknown', quantity: 1 },
        { coffeeId: 'b', quantity: 0 },
        { coffeeId: 'b', quantity: 100 },
        { coffeeId: 'b', quantity: 3 },
      ],
      validIds,
    )

    expect(result).toEqual([
      { coffeeId: 'a', quantity: 2 },
      { coffeeId: 'b', quantity: 3 },
    ])
  })

  it('remove duplicatas somando quantidades e limitando a 99', () => {
    const result = sanitizeCartItems(
      [
        { coffeeId: 'a', quantity: 60 },
        { coffeeId: 'a', quantity: 50 },
      ],
      validIds,
    )

    expect(result).toEqual([{ coffeeId: 'a', quantity: 99 }])
  })

  it('retorna lista vazia para entrada inválida', () => {
    expect(sanitizeCartItems(null, validIds)).toEqual([])
    expect(sanitizeCartItems('texto', validIds)).toEqual([])
  })
})
