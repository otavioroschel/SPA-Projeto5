import { describe, expect, it } from 'vitest'

import { calcTotals, DELIVERY_FEE_CENTS, totalUnits } from './pricing'

describe('pricing', () => {
  const lines = [
    { unitPriceCents: 990, quantity: 2 },
    { unitPriceCents: 990, quantity: 1 },
  ]

  it('TC-09 — calcula subtotal, frete e total corretamente', () => {
    const totals = calcTotals(lines)

    expect(totals.subtotalCents).toBe(2970)
    expect(totals.deliveryFeeCents).toBe(DELIVERY_FEE_CENTS)
    expect(totals.totalCents).toBe(2970 + DELIVERY_FEE_CENTS)
  })

  it('TC-10 — mantém os cálculos em centavos inteiros', () => {
    const totals = calcTotals([{ unitPriceCents: 1050, quantity: 3 }])

    expect(totals.subtotalCents).toBe(3150)
    expect(Number.isInteger(totals.totalCents)).toBe(true)
  })

  it('TC-11 — frete é zero com carrinho vazio', () => {
    const totals = calcTotals([])

    expect(totals.subtotalCents).toBe(0)
    expect(totals.deliveryFeeCents).toBe(0)
    expect(totals.totalCents).toBe(0)
  })

  it('TC-12 — contador soma unidades, não tipos de produto', () => {
    expect(totalUnits([{ quantity: 2 }, { quantity: 3 }])).toBe(5)
  })
})
