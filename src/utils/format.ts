const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatBRL = (cents: number): string => brlFormatter.format(cents / 100)

export const formatCep = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export const onlyDigits = (value: string): string => value.replace(/\D/g, '')
