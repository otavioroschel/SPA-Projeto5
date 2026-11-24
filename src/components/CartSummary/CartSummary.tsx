import styled from 'styled-components'

import { useCart } from '../../hooks/useCart'
import { formatBRL } from '../../utils/format'

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: ${({ theme }) => theme.fontSizes.textS};
  color: ${({ theme }) => theme.colors.text};
`

const TotalRow = styled(Row)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.titleS};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.subtitle};
`

const ConfirmButton = styled.button`
  margin-top: 12px;
  padding: 14px 16px;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.fontSizes.buttonG};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const CartSummary = ({ submitDisabled = false }: { submitDisabled?: boolean }) => {
  const { totals } = useCart()

  return (
    <Summary>
      <Row>
        <span>Total de itens</span>
        <span>{formatBRL(totals.subtotalCents)}</span>
      </Row>
      <Row>
        <span>Entrega</span>
        <span>{formatBRL(totals.deliveryFeeCents)}</span>
      </Row>
      <TotalRow>
        <span>Total</span>
        <span>{formatBRL(totals.totalCents)}</span>
      </TotalRow>
      <ConfirmButton type="submit" disabled={submitDisabled}>
        Confirmar Pedido
      </ConfirmButton>
    </Summary>
  )
}
