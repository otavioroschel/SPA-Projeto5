export type CoffeeTag = 'tradicional' | 'gelado' | 'com leite' | 'especial' | 'alcoólico'

export interface Coffee {
  id: string
  name: string
  description: string
  priceCents: number
  imageUrl: string
  tags: CoffeeTag[]
}
