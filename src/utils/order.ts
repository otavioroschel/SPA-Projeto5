import type { CheckoutFormData } from '../schemas/checkoutSchema'
import { orderSchema } from '../schemas/orderSchema'
import type { CartLine, Totals } from '../types/cart'
import type { Order } from '../types/order'
import { onlyDigits } from './format'
import { readStorage, STORAGE_KEYS, writeStorage } from './storage'

const createOrderId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `order-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const buildOrder = (
  data: CheckoutFormData,
  lines: CartLine[],
  totals: Totals,
): Order => ({
  id: createOrderId(),
  createdAt: new Date().toISOString(),
  items: lines.map((line) => ({
    coffeeId: line.coffeeId,
    name: line.coffee.name,
    unitPriceCents: line.unitPriceCents,
    quantity: line.quantity,
  })),
  address: {
    cep: onlyDigits(data.address.cep),
    street: data.address.street,
    number: data.address.number,
    complement: data.address.complement,
    neighborhood: data.address.neighborhood,
    city: data.address.city,
    uf: data.address.uf,
  },
  paymentMethod: data.paymentMethod,
  subtotalCents: totals.subtotalCents,
  deliveryFeeCents: totals.deliveryFeeCents,
  totalCents: totals.totalCents,
})

export const saveLastOrder = (order: Order): void => {
  writeStorage(STORAGE_KEYS.lastOrder, order)
}

export const readLastOrder = (): Order | null =>
  readStorage<Order>(STORAGE_KEYS.lastOrder, (value) => {
    const parsed = orderSchema.safeParse(value)
    return parsed.success ? parsed.data : null
  })
