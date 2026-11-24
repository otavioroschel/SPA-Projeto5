import { describe, expect, it } from 'vitest'

import { mapViaCepResponse } from './cep'

describe('mapViaCepResponse', () => {
  it('mapeia uma resposta válida', () => {
    const result = mapViaCepResponse({
      cep: '90250-440',
      logradouro: 'Rua João Daniel Martinelli',
      bairro: 'Farrapos',
      localidade: 'Porto Alegre',
      uf: 'RS',
    })

    expect(result).toEqual({
      status: 'success',
      address: {
        cep: '90250440',
        street: 'Rua João Daniel Martinelli',
        neighborhood: 'Farrapos',
        city: 'Porto Alegre',
        uf: 'RS',
      },
    })
  })

  it('identifica CEP não encontrado', () => {
    expect(mapViaCepResponse({ erro: true })).toEqual({ status: 'not-found' })
  })

  it('trata resposta incompleta como erro', () => {
    expect(mapViaCepResponse({ logradouro: 'Rua X' })).toEqual({ status: 'error' })
  })

  it('trata resposta não-objeto como erro', () => {
    expect(mapViaCepResponse('texto')).toEqual({ status: 'error' })
  })
})
