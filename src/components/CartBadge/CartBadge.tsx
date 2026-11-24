import { ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useCart } from '../../hooks/useCart'

const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryHover};
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.96);
  }
`

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primaryHover};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
`

export const CartBadge = () => {
  const { totals } = useCart()
  const count = totals.totalUnits

  return (
    <CartLink
      to="/checkout"
      aria-label={
        count > 0 ? `Carrinho com ${count} ${count === 1 ? 'item' : 'itens'}` : 'Carrinho vazio'
      }
    >
      <ShoppingCart size={20} weight="fill" aria-hidden />
      {count > 0 && <Badge aria-hidden>{count}</Badge>}
      <span className="sr-only" aria-live="polite">
        {count > 0 ? `${count} ${count === 1 ? 'item' : 'itens'} no carrinho` : 'Carrinho vazio'}
      </span>
    </CartLink>
  )
}
