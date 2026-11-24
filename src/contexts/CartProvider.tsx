import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'

import { coffeesById } from '../data/coffees'
import { cartReducer } from '../reducers/cartReducer'
import type { CartItem, CartLine, CartState } from '../types/cart'
import { sanitizeCartItems } from '../utils/cartHydration'
import { calcTotals } from '../utils/pricing'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'
import { CartContext } from './cartContext'
import type { CartContextValue } from './cartContext'

const validCoffeeIds = new Set(coffeesById.keys())

const createInitialState = (): CartState => {
  const stored = readStorage<unknown[]>(STORAGE_KEYS.cart, (value) =>
    Array.isArray(value) ? value : null,
  )

  return { items: sanitizeCartItems(stored, validCoffeeIds) }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, createInitialState)

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, state.items)
  }, [state.items])

  const addItem = useCallback((coffeeId: string, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { coffeeId, quantity } })
  }, [])

  const increment = useCallback((coffeeId: string) => {
    dispatch({ type: 'INCREMENT', payload: { coffeeId } })
  }, [])

  const decrement = useCallback((coffeeId: string) => {
    dispatch({ type: 'DECREMENT', payload: { coffeeId } })
  }, [])

  const removeItem = useCallback((coffeeId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { coffeeId } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const lines = useMemo<CartLine[]>(
    () =>
      state.items.flatMap((item: CartItem) => {
        const coffee = coffeesById.get(item.coffeeId)
        if (!coffee) return []

        return [
          {
            coffee,
            coffeeId: item.coffeeId,
            quantity: item.quantity,
            unitPriceCents: coffee.priceCents,
            lineTotalCents: coffee.priceCents * item.quantity,
          },
        ]
      }),
    [state.items],
  )

  const totals = useMemo(() => calcTotals(lines), [lines])

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      lines,
      totals,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
    }),
    [state.items, lines, totals, addItem, increment, decrement, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
