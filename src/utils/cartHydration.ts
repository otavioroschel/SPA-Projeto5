import type { CartItem } from '../types/cart'
import { MAX_QTY, MIN_QTY } from './pricing'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const isCartItemArray = (value: unknown): value is CartItem[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      isRecord(item) &&
      typeof item.coffeeId === 'string' &&
      typeof item.quantity === 'number' &&
      Number.isInteger(item.quantity) &&
      item.quantity >= MIN_QTY &&
      item.quantity <= MAX_QTY,
  )

/**
 * Sanitiza itens vindos do storage: descarta IDs desconhecidos e quantidades
 * inválidas, remove duplicatas (somando quantidades, limitadas a 99).
 */
export const sanitizeCartItems = (raw: unknown, validIds: ReadonlySet<string>): CartItem[] => {
  if (!Array.isArray(raw)) return []

  const merged = new Map<string, number>()

  for (const item of raw) {
    if (!isRecord(item)) continue

    const { coffeeId, quantity } = item
    if (typeof coffeeId !== 'string' || !validIds.has(coffeeId)) continue
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) continue
    if (quantity < MIN_QTY || quantity > MAX_QTY) continue

    const current = merged.get(coffeeId) ?? 0
    merged.set(coffeeId, Math.min(current + quantity, MAX_QTY))
  }

  return Array.from(merged, ([coffeeId, quantity]) => ({ coffeeId, quantity }))
}
