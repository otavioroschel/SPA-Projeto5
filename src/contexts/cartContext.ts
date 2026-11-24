import { createContext } from 'react'

import type { CartItem, CartLine, Totals } from '../types/cart'

export interface CartContextValue {
  items: CartItem[]
  lines: CartLine[]
  totals: Totals
  addItem: (coffeeId: string, quantity: number) => void
  increment: (coffeeId: string) => void
  decrement: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
