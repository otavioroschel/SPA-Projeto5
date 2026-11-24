import { useEffect, useState } from 'react'

import type { CepResponse, CepStatus } from '../types/cep'
import { isValidCep, mapViaCepResponse, VIA_CEP_BASE_URL } from '../utils/cep'
import { onlyDigits } from '../utils/format'

interface CepState {
  status: CepStatus
  address: CepResponse | null
}

interface CepResult {
  cep: string
  status: 'success' | 'not-found' | 'error'
  address: CepResponse | null
}

const idleState: CepState = { status: 'idle', address: null }

/**
 * Consulta o CEP na ViaCEP quando houver exatamente 8 dígitos.
 * Requisições anteriores são canceladas com AbortController.
 * O status "loading" é derivado enquanto o resultado não corresponde ao CEP atual.
 */
export const useCep = (cep: string): CepState => {
  const [result, setResult] = useState<CepResult | null>(null)
  const digits = onlyDigits(cep)
  const valid = isValidCep(digits)

  useEffect(() => {
    if (!valid) return

    const controller = new AbortController()
    let active = true

    fetch(`${VIA_CEP_BASE_URL}/${digits}/json/`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Falha na consulta (${response.status})`)
        }

        const data: unknown = await response.json()
        const mapped = mapViaCepResponse(data)
        if (!active) return

        if (mapped.status === 'success') {
          setResult({ cep: digits, status: 'success', address: mapped.address })
        } else {
          setResult({ cep: digits, status: mapped.status, address: null })
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        if (!active) return
        setResult({ cep: digits, status: 'error', address: null })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [digits, valid])

  if (!valid) return idleState
  if (!result || result.cep !== digits) return { status: 'loading', address: null }

  return { status: result.status, address: result.address }
}
