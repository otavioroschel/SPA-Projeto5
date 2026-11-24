import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout } from '../components/PageLayout/PageLayout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 64px 0;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.titleL};
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

export const NotFound = () => (
  <PageLayout>
    <Wrapper>
      <Title>Página não encontrada</Title>
      <p>O endereço informado não existe.</p>
      <BackLink to="/">Voltar para a Home</BackLink>
    </Wrapper>
  </PageLayout>
)
