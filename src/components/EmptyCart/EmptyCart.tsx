import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 48px 0;
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.titleM};
  color: ${({ theme }) => theme.colors.subtitle};
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.textM};
  color: ${({ theme }) => theme.colors.textMuted};
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

export const EmptyCart = () => (
  <Wrapper>
    <Title>Seu carrinho está vazio</Title>
    <Text>Adicione cafés ao carrinho para continuar o pedido.</Text>
    <BackLink to="/">Ver cafés</BackLink>
  </Wrapper>
)
