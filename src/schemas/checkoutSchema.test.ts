import { describe, expect, it } from 'vitest'

import { checkoutSchema } from './checkoutSchema'

const validData = {
  address: {
    cep: '90250-440',
    street: 'Rua João Daniel Martinelli',
    number: '102',
    complement: '',
    neighborhood: 'Farrapos',
    city: 'Porto Alegre',
    uf: 'RS',
  },
  paymentMethod: 'credit',
}

describe('checkoutSchema', () => {
  it('TC-14 — aceita dados válidos', () => {
    const result = checkoutSchema.safeParse(validData)

    expect(result.success).toBe(true)
  })

  it('TC-14 — rejeita CEP com menos de 8 dígitos', () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      address: { ...validData.address, cep: '123' },
    })

    expect(result.success).toBe(false)
  })

  it('TC-14 — rejeita campos obrigatórios vazios', () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      address: { ...validData.address, street: '   ', city: '' },
    })

    expect(result.success).toBe(false)
  })

  it('TC-14 — rejeita UF inválida', () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      address: { ...validData.address, uf: 'XX' },
    })

    expect(result.success).toBe(false)
  })

  it('TC-15 — exige forma de pagamento válida', () => {
    const missing = checkoutSchema.safeParse({ ...validData, paymentMethod: undefined })
    const invalid = checkoutSchema.safeParse({ ...validData, paymentMethod: 'pix' })

    expect(missing.success).toBe(false)
    expect(invalid.success).toBe(false)
  })

  it('complemento é opcional', () => {
    const result = checkoutSchema.safeParse({
      ...validData,
      address: {
        cep: validData.address.cep,
        street: validData.address.street,
        number: validData.address.number,
        neighborhood: validData.address.neighborhood,
        city: validData.address.city,
        uf: validData.address.uf,
      },
    })

    expect(result.success).toBe(true)
  })
})
