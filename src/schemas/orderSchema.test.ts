import { describe, expect, it } from 'vitest'

import { orderSchema } from './orderSchema'

const validOrder = {
  id: 'order-1',
  createdAt: '2026-01-01T00:00:00.000Z',
  items: [{ coffeeId: 'expresso', name: 'Expresso Tradicional', unitPriceCents: 990, quantity: 2 }],
  address: {
    cep: '90250440',
    street: 'Rua João Daniel Martinelli',
    number: '102',
    neighborhood: 'Farrapos',
    city: 'Porto Alegre',
    uf: 'RS',
  },
  paymentMethod: 'credit',
  subtotalCents: 1980,
  deliveryFeeCents: 350,
  totalCents: 2330,
}

describe('orderSchema', () => {
  it('aceita um pedido válido', () => {
    expect(orderSchema.safeParse(validOrder).success).toBe(true)
  })

  it('TC-18 — rejeita pedido sem itens', () => {
    expect(orderSchema.safeParse({ ...validOrder, items: [] }).success).toBe(false)
  })

  it('TC-18 — rejeita quantidades fora do intervalo', () => {
    const result = orderSchema.safeParse({
      ...validOrder,
      items: [{ ...validOrder.items[0], quantity: 0 }],
    })

    expect(result.success).toBe(false)
  })

  it('TC-18 — rejeita valores não inteiros', () => {
    const result = orderSchema.safeParse({ ...validOrder, totalCents: 23.3 })

    expect(result.success).toBe(false)
  })
})
