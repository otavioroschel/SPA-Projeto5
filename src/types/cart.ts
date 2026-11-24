import type { Coffee } from './coffee'

export interface CartItem {
  coffeeId: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface CartLine {
  coffee: Coffee
  coffeeId: string
  quantity: number
  unitPriceCents: number
  lineTotalCents: number
}

export interface Totals {
  subtotalCents: number
  deliveryFeeCents: number
  totalCents: number
  totalUnits: number
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT'; payload: { coffeeId: string } }
  | { type: 'DECREMENT'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: { items: CartItem[] } }
