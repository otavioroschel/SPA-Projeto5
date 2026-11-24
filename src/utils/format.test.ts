import { describe, expect, it } from 'vitest'

import { formatBRL, formatCep, onlyDigits } from './format'

describe('format', () => {
  it('TC-13 — formata centavos para BRL', () => {
    expect(formatBRL(1990).replace(/\u00a0/g, ' ')).toBe('R$ 19,90')
  })

  it('formata CEP com máscara', () => {
    expect(formatCep('90250440')).toBe('90250-440')
    expect(formatCep('90250')).toBe('90250')
    expect(formatCep('90250-440')).toBe('90250-440')
  })

  it('remove caracteres não numéricos', () => {
    expect(onlyDigits('90250-440')).toBe('90250440')
  })
})
