import { describe, expect, it } from 'vitest'

import type { CartState } from '../types/cart'
import { cartReducer, initialCartState } from './cartReducer'

const withItems = (items: CartState['items']): CartState => ({ items })

describe('cartReducer', () => {
  it('TC-01 — ADD_ITEM cria um item', () => {
    const next = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { coffeeId: 'expresso', quantity: 2 },
    })

    expect(next.items).toEqual([{ coffeeId: 'expresso', quantity: 2 }])
  })

  it('TC-02 — ADD_ITEM repetido soma sem duplicar a linha', () => {
    const first = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { coffeeId: 'expresso', quantity: 2 },
    })
    const second = cartReducer(first, {
      type: 'ADD_ITEM',
      payload: { coffeeId: 'expresso', quantity: 3 },
    })

    expect(second.items).toHaveLength(1)
    expect(second.items[0].quantity).toBe(5)
  })

  it('TC-02b — ADD_ITEM respeita o limite de 99', () => {
    const state = withItems([{ coffeeId: 'expresso', quantity: 60 }])
    const next = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: { coffeeId: 'expresso', quantity: 60 },
    })

    expect(next.items[0].quantity).toBe(99)
  })

  it('TC-03 — quantidade zero ou negativa é ignorada', () => {
    const zero = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { coffeeId: 'expresso', quantity: 0 },
    })
    const negative = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { coffeeId: 'expresso', quantity: -3 },
    })

    expect(zero).toBe(initialCartState)
    expect(negative).toBe(initialCartState)
  })

  it('TC-04 — INCREMENT respeita o máximo de 99', () => {
    const state = withItems([{ coffeeId: 'expresso', quantity: 98 }])
    const incremented = cartReducer(state, {
      type: 'INCREMENT',
      payload: { coffeeId: 'expresso' },
    })
    const capped = cartReducer(incremented, {
      type: 'INCREMENT',
      payload: { coffeeId: 'expresso' },
    })

    expect(incremented.items[0].quantity).toBe(99)
    expect(capped).toBe(incremented)
  })

  it('TC-05 — DECREMENT vai de 2 para 1 e permanece em 1', () => {
    const state = withItems([{ coffeeId: 'expresso', quantity: 2 }])
    const decremented = cartReducer(state, {
      type: 'DECREMENT',
      payload: { coffeeId: 'expresso' },
    })
    const blocked = cartReducer(decremented, {
      type: 'DECREMENT',
      payload: { coffeeId: 'expresso' },
    })

    expect(decremented.items[0].quantity).toBe(1)
    expect(blocked).toBe(decremented)
  })

  it('TC-06 — REMOVE_ITEM remove somente o alvo', () => {
    const state = withItems([
      { coffeeId: 'a', quantity: 1 },
      { coffeeId: 'b', quantity: 2 },
    ])
    const next = cartReducer(state, { type: 'REMOVE_ITEM', payload: { coffeeId: 'a' } })

    expect(next.items).toEqual([{ coffeeId: 'b', quantity: 2 }])
  })

  it('TC-07 — CLEAR_CART esvazia o carrinho', () => {
    const state = withItems([{ coffeeId: 'a', quantity: 2 }])
    const next = cartReducer(state, { type: 'CLEAR_CART' })

    expect(next.items).toEqual([])
  })

  it('TC-08 — o estado anterior não é mutado', () => {
    const state = withItems([{ coffeeId: 'a', quantity: 1 }])
    Object.freeze(state.items)
    state.items.forEach((item) => Object.freeze(item))

    const next = cartReducer(state, { type: 'INCREMENT', payload: { coffeeId: 'a' } })

    expect(state.items[0].quantity).toBe(1)
    expect(next.items[0].quantity).toBe(2)
    expect(next).not.toBe(state)
  })

  it('HYDRATE aceita apenas quantidades inteiras entre 1 e 99', () => {
    const next = cartReducer(initialCartState, {
      type: 'HYDRATE',
      payload: {
        items: [
          { coffeeId: 'a', quantity: 2 },
          { coffeeId: 'b', quantity: 0 },
          { coffeeId: 'c', quantity: 100 },
        ],
      },
    })

    expect(next.items).toEqual([{ coffeeId: 'a', quantity: 2 }])
  })
})
