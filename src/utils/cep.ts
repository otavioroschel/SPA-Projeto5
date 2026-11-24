import type { CepResponse } from '../types/cep'
import { onlyDigits } from './format'

export const VIA_CEP_BASE_URL = 'https://viacep.com.br/ws'

export const isValidCep = (value: string): boolean => onlyDigits(value).length === 8

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export type ViaCepResult =
  | { status: 'success'; address: CepResponse }
  | { status: 'not-found' }
  | { status: 'error' }

/**
 * Valida e mapeia a resposta da ViaCEP.
 * Resposta incompleta (sem cidade/UF) é tratada como erro para permitir
 * preenchimento manual.
 */
export const mapViaCepResponse = (data: unknown): ViaCepResult => {
  if (!isRecord(data)) return { status: 'error' }

  if (data.erro === true || data.erro === 'true') {
    return { status: 'not-found' }
  }

  const { cep, logradouro, bairro, localidade, uf } = data

  if (typeof localidade !== 'string' || localidade.trim() === '') {
    return { status: 'error' }
  }

  if (typeof uf !== 'string' || uf.trim() === '') {
    return { status: 'error' }
  }

  return {
    status: 'success',
    address: {
      cep: typeof cep === 'string' ? onlyDigits(cep) : '',
      street: typeof logradouro === 'string' ? logradouro : '',
      neighborhood: typeof bairro === 'string' ? bairro : '',
      city: localidade,
      uf,
    },
  }
}
