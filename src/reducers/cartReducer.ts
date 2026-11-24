import type { CartAction, CartState } from '../types/cart'

import { MAX_QTY, MIN_QTY } from '../utils/pricing'

export const initialCartState: CartState = { items: [] }

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffeeId, quantity } = action.payload
      if (!Number.isInteger(quantity) || quantity < MIN_QTY) return state

      const existing = state.items.find((item) => item.coffeeId === coffeeId)

      if (existing) {
        const nextQuantity = Math.min(existing.quantity + quantity, MAX_QTY)
        if (nextQuantity === existing.quantity) return state

        return {
          items: state.items.map((item) =>
            item.coffeeId === coffeeId ? { ...item, quantity: nextQuantity } : item,
          ),
        }
      }

      return {
        items: [...state.items, { coffeeId, quantity: Math.min(quantity, MAX_QTY) }],
      }
    }

    case 'INCREMENT': {
      const { coffeeId } = action.payload
      const existing = state.items.find((item) => item.coffeeId === coffeeId)
      if (!existing || existing.quantity >= MAX_QTY) return state

      return {
        items: state.items.map((item) =>
          item.coffeeId === coffeeId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }
    }

    case 'DECREMENT': {
      const { coffeeId } = action.payload
      const existing = state.items.find((item) => item.coffeeId === coffeeId)
      if (!existing || existing.quantity <= MIN_QTY) return state

      return {
        items: state.items.map((item) =>
          item.coffeeId === coffeeId ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      }
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.coffeeId !== action.payload.coffeeId),
      }

    case 'CLEAR_CART':
      return initialCartState

    case 'HYDRATE': {
      const sanitized = action.payload.items.filter(
        (item) =>
          Number.isInteger(item.quantity) &&
          item.quantity >= MIN_QTY &&
          item.quantity <= MAX_QTY,
      )

      return { items: sanitized }
    }

    default:
      return state
  }
}
