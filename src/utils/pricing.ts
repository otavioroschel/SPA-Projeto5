export const DELIVERY_FEE_CENTS = 350
export const MIN_QTY = 1
export const MAX_QTY = 99

type PricedLine = {
  unitPriceCents: number
  quantity: number
}

export const subtotalCents = (lines: PricedLine[]): number =>
  lines.reduce((total, line) => total + line.unitPriceCents * line.quantity, 0)

export const deliveryFeeCents = (subtotal: number): number =>
  subtotal > 0 ? DELIVERY_FEE_CENTS : 0

export const totalUnits = (items: { quantity: number }[]): number =>
  items.reduce((total, item) => total + item.quantity, 0)

export interface TotalsResult {
  subtotalCents: number
  deliveryFeeCents: number
  totalCents: number
  totalUnits: number
}

export const calcTotals = (lines: PricedLine[]): TotalsResult => {
  const subtotal = subtotalCents(lines)
  const fee = deliveryFeeCents(subtotal)

  return {
    subtotalCents: subtotal,
    deliveryFeeCents: fee,
    totalCents: subtotal + fee,
    totalUnits: totalUnits(lines),
  }
}
