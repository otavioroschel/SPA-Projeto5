import type { Coffee } from '../types/coffee'

import arabe from '../assets/coffees/arabe.png'
import cafeComLeite from '../assets/coffees/café-com-leite.png'
import capuccino from '../assets/coffees/capuccino.png'
import chocolateQuente from '../assets/coffees/chocolate-quente.png'
import cubano from '../assets/coffees/cubano.png'
import expressoAmericano from '../assets/coffees/expresso-americano.png'
import expressoCremoso from '../assets/coffees/expresso-cremoso.png'
import expressoGelado from '../assets/coffees/expresso-gelado.png'
import expressoTradicional from '../assets/coffees/expresso-tradicional.png'
import havaiano from '../assets/coffees/havaiano.png'
import irlandes from '../assets/coffees/irlandes.png'
import latte from '../assets/coffees/latte.png'
import macchiato from '../assets/coffees/macchiato.png'
import mocaccino from '../assets/coffees/mocaccino.png'

/**
 * Catálogo local tipado (RN-08). Preços em centavos (RN-04).
 * Imagens oficiais fornecidas em `src/assets/coffees` (PNG, perspectiva top-down).
 */
export const coffees: Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    priceCents: 990,
    imageUrl: expressoTradicional,
    tags: ['tradicional'],
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    priceCents: 990,
    imageUrl: expressoAmericano,
    tags: ['tradicional'],
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    priceCents: 990,
    imageUrl: expressoCremoso,
    tags: ['tradicional'],
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    priceCents: 990,
    imageUrl: expressoGelado,
    tags: ['tradicional', 'gelado'],
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    priceCents: 990,
    imageUrl: cafeComLeite,
    tags: ['tradicional', 'com leite'],
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    priceCents: 990,
    imageUrl: latte,
    tags: ['tradicional', 'com leite'],
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    priceCents: 990,
    imageUrl: capuccino,
    tags: ['tradicional', 'com leite'],
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    priceCents: 990,
    imageUrl: macchiato,
    tags: ['tradicional', 'com leite'],
  },
  {
    id: 'mocaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    priceCents: 990,
    imageUrl: mocaccino,
    tags: ['tradicional', 'com leite'],
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    priceCents: 990,
    imageUrl: chocolateQuente,
    tags: ['especial', 'com leite'],
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    priceCents: 990,
    imageUrl: cubano,
    tags: ['especial', 'alcoólico', 'gelado'],
  },
  {
    id: 'havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    priceCents: 990,
    imageUrl: havaiano,
    tags: ['especial'],
  },
  {
    id: 'arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    priceCents: 990,
    imageUrl: arabe,
    tags: ['especial'],
  },
  {
    id: 'irlandes',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    priceCents: 990,
    imageUrl: irlandes,
    tags: ['especial', 'alcoólico'],
  },
]

export const coffeesById = new Map(coffees.map((coffee) => [coffee.id, coffee]))
