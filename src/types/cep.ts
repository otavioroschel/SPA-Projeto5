export type CepStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error'

export interface CepResponse {
  cep: string
  street: string
  neighborhood: string
  city: string
  uf: string
  complement?: string
}
