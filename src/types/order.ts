import type { DeliveryAddress } from './address'

export type PaymentMethod = 'credit' | 'debit' | 'cash'

export interface OrderItemSnapshot {
  coffeeId: string
  name: string
  unitPriceCents: number
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  items: OrderItemSnapshot[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalCents: number
  deliveryFeeCents: number
  totalCents: number
}
