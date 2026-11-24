import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import styled from 'styled-components'

import deliveryImage from '../../assets/delivery.svg'
import type { Order, PaymentMethod } from '../../types/order'

const paymentLabels: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 64px;
  padding: 64px 0;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 0;
  }
`

const Title = styled.h1`
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.titleL};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primaryHover};
`

const Subtitle = styled.p`
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.fontSizes.textL};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 479px) {
    font-size: ${({ theme }) => theme.fontSizes.textM};
  }
`

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 6px 36px 6px 36px;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 559px) {
    padding: 24px;
  }
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const InfoIcon = styled.span<{ $tone: 'accent' | 'primary' | 'primaryDark' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, $tone }) =>
    $tone === 'accent'
      ? theme.colors.accent
      : $tone === 'primary'
        ? theme.colors.primary
        : theme.colors.primaryHover};
  color: #ffffff;
`

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.textS};
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.subtitle};
    font-weight: 700;
  }
`

const DeliveryImage = styled.img`
  width: 100%;
  max-width: 520px;
  justify-self: center;
`

export const OrderSuccess = ({ order }: { order: Order }) => (
  <Wrapper aria-labelledby="success-title">
    <div>
      <Title id="success-title">Uhu! Pedido confirmado</Title>
      <Subtitle>Agora é só aguardar que logo o café chegará até você</Subtitle>

      <InfoCard>
        <InfoRow>
          <InfoIcon $tone="accent">
            <MapPin size={18} weight="fill" aria-hidden />
          </InfoIcon>
          <InfoText>
            <span>
              Entrega em{' '}
              <strong>
                {order.address.street}, {order.address.number}
              </strong>
            </span>
            <span>
              {order.address.neighborhood} - {order.address.city}, {order.address.uf}
            </span>
          </InfoText>
        </InfoRow>

        <InfoRow>
          <InfoIcon $tone="primary">
            <Timer size={18} weight="fill" aria-hidden />
          </InfoIcon>
          <InfoText>
            <span>Previsão de entrega</span>
            <strong>20 min - 30 min</strong>
          </InfoText>
        </InfoRow>

        <InfoRow>
          <InfoIcon $tone="primaryDark">
            <CurrencyDollar size={18} weight="bold" aria-hidden />
          </InfoIcon>
          <InfoText>
            <span>Pagamento na entrega</span>
            <strong>{paymentLabels[order.paymentMethod]}</strong>
          </InfoText>
        </InfoRow>
      </InfoCard>
    </div>

    <DeliveryImage src={deliveryImage} alt="Ilustração de entregador em uma scooter roxa" />
  </Wrapper>
)
