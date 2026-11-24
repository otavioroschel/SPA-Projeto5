import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { OrderSuccess } from '../components/OrderSuccess/OrderSuccess'
import { PageLayout } from '../components/PageLayout/PageLayout'
import { readLastOrder } from '../utils/order'

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 64px 0;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.titleM};
  color: ${({ theme }) => theme.colors.subtitle};
`

const BackLink = styled(Link)`
  padding: 12px 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.fontSizes.buttonG};
  font-weight: 700;
  text-transform: uppercase;
`

export const Success = () => {
  const order = readLastOrder()

  return (
    <PageLayout>
      {order ? (
        <OrderSuccess order={order} />
      ) : (
        <EmptyWrapper>
          <Title>Nenhum pedido encontrado</Title>
          <p>Finalize um pedido para visualizar a confirmação.</p>
          <BackLink to="/">Voltar para a Home</BackLink>
        </EmptyWrapper>
      )}
    </PageLayout>
  )
}
