import { z } from 'zod'

import { onlyDigits } from '../utils/format'
import { UFS } from './ufs'

export const addressSchema = z.object({
  cep: z
    .string()
    .refine((value) => onlyDigits(value).length === 8, 'Informe um CEP válido (8 dígitos)'),
  street: z.string().trim().min(1, 'Informe a rua'),
  number: z.string().trim().min(1, 'Informe o número').max(10, 'Número muito longo'),
  complement: z.string().trim().max(60, 'Máximo de 60 caracteres').optional(),
  neighborhood: z.string().trim().min(1, 'Informe o bairro'),
  city: z.string().trim().min(1, 'Informe a cidade'),
  uf: z.enum(UFS, { error: 'Selecione a UF' }),
})

export const checkoutSchema = z.object({
  address: addressSchema,
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    error: 'Selecione a forma de pagamento',
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
