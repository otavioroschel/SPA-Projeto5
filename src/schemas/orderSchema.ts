import { z } from 'zod'

import { UFS } from './ufs'

export const orderItemSchema = z.object({
  coffeeId: z.string().min(1),
  name: z.string().min(1),
  unitPriceCents: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(99),
})

export const orderSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  address: z.object({
    cep: z.string().min(1),
    street: z.string().min(1),
    number: z.string().min(1),
    complement: z.string().optional(),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    uf: z.enum(UFS),
  }),
  paymentMethod: z.enum(['credit', 'debit', 'cash']),
  subtotalCents: z.number().int().nonnegative(),
  deliveryFeeCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
})

export type OrderSchemaData = z.infer<typeof orderSchema>
