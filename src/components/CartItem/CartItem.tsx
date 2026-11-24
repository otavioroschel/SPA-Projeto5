import { Trash } from '@phosphor-icons/react'
import styled from 'styled-components'

import { useCart } from '../../hooks/useCart'
import type { CartLine } from '../../types/cart'
import { formatBRL } from '../../utils/format'
import { QuantityInput } from '../QuantityInput/QuantityInput'

const Item = styled.li`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
  padding: 8px 0 24px;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: 24px;
  }
`

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.textM};
  color: ${({ theme }) => theme.colors.subtitle};
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 38px;
  padding: 0 8px;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.buttonBg};
  color: ${({ theme }) => theme.colors.accentDark};
  font-size: ${({ theme }) => theme.fontSizes.buttonM};
  text-transform: uppercase;
  transition: background-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`

const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.textM};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
  white-space: nowrap;
`

export const CartItem = ({ line }: { line: CartLine }) => {
  const { increment, decrement, removeItem } = useCart()

  return (
    <Item>
      <Image src={line.coffee.imageUrl} alt={`Xícara de ${line.coffee.name}`} />
      <Details>
        <Name>{line.coffee.name}</Name>
        <Controls>
          <QuantityInput
            value={line.quantity}
            onChange={(value) => {
              if (value > line.quantity) increment(line.coffeeId)
              else if (value < line.quantity) decrement(line.coffeeId)
            }}
            label={line.coffee.name}
          />
          <RemoveButton
            type="button"
            onClick={() => removeItem(line.coffeeId)}
            aria-label={`Remover ${line.coffee.name} do carrinho`}
          >
            <Trash size={16} aria-hidden />
            Remover
          </RemoveButton>
        </Controls>
      </Details>
      <Price>{formatBRL(line.lineTotalCents)}</Price>
    </Item>
  )
}
