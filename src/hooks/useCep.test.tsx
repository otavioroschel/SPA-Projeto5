import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCep } from './useCep'

const mockFetchSuccess = (payload: unknown) => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => payload,
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useCep', () => {
  it('TC-24 — consulta somente com 8 dígitos e retorna o endereço', async () => {
    const fetchMock = mockFetchSuccess({
      cep: '90250-440',
      logradouro: 'Rua João Daniel Martinelli',
      bairro: 'Farrapos',
      localidade: 'Porto Alegre',
      uf: 'RS',
    })

    const { result } = renderHook(() => useCep('90250-440'))

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.address?.city).toBe('Porto Alegre')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('não consulta quando o CEP está incompleto', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useCep('90250'))

    expect(result.current.status).toBe('idle')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('TC-25 — informa CEP não encontrado', async () => {
    mockFetchSuccess({ erro: true })

    const { result } = renderHook(() => useCep('99999999'))

    await waitFor(() => expect(result.current.status).toBe('not-found'))
  })

  it('TC-25 — informa falha de rede', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'))
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useCep('90250440'))

    await waitFor(() => expect(result.current.status).toBe('error'))
  })
})
