import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import styled from 'styled-components'

import heroImage from '../assets/hero.svg'
import { CoffeeCatalog } from '../components/CoffeeCatalog/CoffeeCatalog'
import { PageLayout } from '../components/PageLayout/PageLayout'

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 56px;
  padding: 40px 0 96px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 24px 0 64px;
  }
`

const HeroTitle = styled.h1`
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes.titleXl};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.title};

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.titleL};
  }

  @media (max-width: 479px) {
    font-size: 30px;
  }
`

const HeroSubtitle = styled.p`
  max-width: 34ch;
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.fontSizes.textL};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 479px) {
    font-size: ${({ theme }) => theme.fontSizes.textM};
  }
`

const Features = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 24px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 559px) {
    grid-template-columns: 1fr;
  }
`

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${({ theme }) => theme.fontSizes.textS};
  color: ${({ theme }) => theme.colors.text};
`

const FeatureIcon = styled.span<{ $tone: 'primary' | 'muted' | 'accent' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, $tone }) =>
    $tone === 'primary'
      ? theme.colors.primary
      : $tone === 'accent'
        ? theme.colors.accent
        : theme.colors.textMuted};
  color: #ffffff;
`

const HeroImage = styled.img`
  width: 100%;
  max-width: 480px;
  justify-self: center;
`

export const Home = () => (
  <PageLayout>
    <Hero aria-labelledby="hero-title">
      <div>
        <HeroTitle id="hero-title">Encontre o café perfeito para qualquer hora do dia</HeroTitle>
        <HeroSubtitle>
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
        </HeroSubtitle>
        <Features>
          <Feature>
            <FeatureIcon $tone="primary">
              <ShoppingCart size={18} weight="fill" aria-hidden />
            </FeatureIcon>
            Compra simples e segura
          </Feature>
          <Feature>
            <FeatureIcon $tone="muted">
              <Package size={18} weight="fill" aria-hidden />
            </FeatureIcon>
            Embalagem mantém o café intacto
          </Feature>
          <Feature>
            <FeatureIcon $tone="primary">
              <Timer size={18} weight="fill" aria-hidden />
            </FeatureIcon>
            Entrega rápida e rastreada
          </Feature>
          <Feature>
            <FeatureIcon $tone="accent">
              <Coffee size={18} weight="fill" aria-hidden />
            </FeatureIcon>
            O café chega fresquinho até você
          </Feature>
        </Features>
      </div>
      <HeroImage src={heroImage} alt="Copo de café Coffee Delivery cercado de grãos de café" />
    </Hero>

    <CoffeeCatalog />
  </PageLayout>
)
