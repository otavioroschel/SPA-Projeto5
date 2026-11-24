import { ShoppingCart } from '@phosphor-icons/react'
import { useState } from 'react'
import styled from 'styled-components'

import { useCart } from '../../hooks/useCart'
import type { Coffee } from '../../types/coffee'
import { formatBRL } from '../../utils/format'
import { QuantityInput } from '../QuantityInput/QuantityInput'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 20px 20px;
  border-radius: 6px 36px 6px 36px;
  background: ${({ theme }) => theme.colors.card};
  text-align: center;
`

const Image = styled.img`
  width: 120px;
  height: 120px;
  margin-top: -20px;
  margin-bottom: 12px;
  object-fit: contain;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
`

const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryHover};
  font-size: ${({ theme }) => theme.fontSizes.tag};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const Name = styled.h3`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSizes.titleS};
  color: ${({ theme }) => theme.colors.subtitle};
`

const Description = styled.p`
  flex: 1;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes.textS};
  color: ${({ theme }) => theme.colors.textMuted};
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  margin-top: auto;
`

const Price = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.titleS};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.subtitle};
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.accentDark};
  color: ${({ theme }) => theme.colors.onPrimary};
  transition: background-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`

export const CoffeeCard = ({ coffee }: { coffee: Coffee }) => {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    addItem(coffee.id, quantity)
    setQuantity(1)
  }

  return (
    <Card>
      <Image src={coffee.imageUrl} alt={`Xícara de ${coffee.name}`} loading="lazy" />
      <Tags>
        {coffee.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <Name>{coffee.name}</Name>
      <Description>{coffee.description}</Description>
      <Footer>
        <Price>{formatBRL(coffee.priceCents)}</Price>
        <Actions>
          <QuantityInput value={quantity} onChange={setQuantity} label={coffee.name} />
          <AddButton
            type="button"
            onClick={handleAdd}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
          >
            <ShoppingCart size={20} weight="fill" aria-hidden />
          </AddButton>
        </Actions>
      </Footer>
    </Card>
  )
}
