import type { ReactNode } from 'react'
import styled from 'styled-components'

import { Header } from '../Header/Header'

const SkipLink = styled.a`
  position: absolute;
  left: 16px;
  top: -80px;
  z-index: 100;
  padding: 12px 16px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.accentDark};
  color: #ffffff;
  font-weight: 700;
  transition: top 0.15s ease;

  &:focus {
    top: 16px;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 32px;
  }
`

const Main = styled.main`
  padding-bottom: 64px;
`

export const PageLayout = ({ children }: { children: ReactNode }) => (
  <>
    <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>
    <Container>
      <Header />
    </Container>
    <Main id="conteudo" tabIndex={-1}>
      <Container>{children}</Container>
    </Main>
  </>
)
