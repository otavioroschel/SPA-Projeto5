import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import styled from 'styled-components'

import heroImage from '../assets/hero.png'
import { CoffeeCatalog } from '../components/CoffeeCatalog/CoffeeCatalog'
import { PageLayout } from '../components/PageLayout/PageLayout'

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;

  /* Efeito de brilho suave (manchas roxas e amarelas) ao fundo do Hero */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(circle at 15% 35%, rgba(219, 172, 44, 0.14) 0%, transparent 45%),
      radial-gradient(circle at 82% 45%, rgba(128, 71, 248, 0.14) 0%, transparent 50%),
      radial-gradient(circle at 35% 75%, rgba(128, 71, 248, 0.08) 0%, transparent 45%);
    filter: blur(40px);
  }
`

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 476px;
  align-items: center;
  gap: 56px;
  padding: 92px 0 108px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 0 64px;
  }
`

const HeroTitle = styled.h1`
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes.titleXl};
  font-weight: 800;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.title};

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.titleL};
  }

  @media (max-width: 479px) {
    font-size: 30px;
  }
`

const HeroSubtitle = styled.p`
  max-width: 48ch;
  margin-bottom: 66px;
  font-size: ${({ theme }) => theme.fontSizes.textL};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.subtitle ?? theme.colors.text};

  @media (max-width: 767px) {
    margin-bottom: 40px;
  }

  @media (max-width: 479px) {
    font-size: ${({ theme }) => theme.fontSizes.textM};
  }
`

const Features = styled.ul`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 20px 40px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${({ theme }) => theme.fontSizes.textM};
  color: ${({ theme }) => theme.colors.text};
`

type IconTone = 'primary' | 'secondary' | 'muted' | 'accent'

const FeatureIcon = styled.span<{ $tone: IconTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #ffffff;
  background: ${({ theme, $tone }) => {
    switch ($tone) {
      case 'primary':
        return theme.colors.primaryHover // Amarelo escuro (#C47F17)
      case 'secondary':
        return theme.colors.primary // Amarelo médio (#DBAC2C)
      case 'accent':
        return theme.colors.accent // Roxo (#8047F8)
      case 'muted':
      default:
        return theme.colors.text // Cinza escuro (#574F4D)
    }
  }};
`

const HeroImage = styled.img`
  width: 100%;
  max-width: 476px;
  justify-self: end;

  @media (max-width: 1023px) {
    justify-self: center;
  }
`

export const Home = () => (
  <PageLayout>
    <HeroWrapper>
      <Hero aria-labelledby="hero-title">
        <div>
          <HeroTitle id="hero-title">Encontre o café perfeito para qualquer hora do dia</HeroTitle>
          <HeroSubtitle>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
          </HeroSubtitle>
          <Features>
            <Feature>
              <FeatureIcon $tone="primary">
                <ShoppingCart size={16} weight="fill" aria-hidden />
              </FeatureIcon>
              Compra simples e segura
            </Feature>
            <Feature>
              <FeatureIcon $tone="muted">
                <Package size={16} weight="fill" aria-hidden />
              </FeatureIcon>
              Embalagem mantém o café intacto
            </Feature>
            <Feature>
              <FeatureIcon $tone="secondary">
                <Timer size={16} weight="fill" aria-hidden />
              </FeatureIcon>
              Entrega rápida e rastreada
            </Feature>
            <Feature>
              <FeatureIcon $tone="accent">
                <Coffee size={16} weight="fill" aria-hidden />
              </FeatureIcon>
              O café chega fresquinho até você
            </Feature>
          </Features>
        </div>
        <HeroImage src={heroImage} alt="Copo de café Coffee Delivery cercado de grãos de café" />
      </Hero>
    </HeroWrapper>

    <CoffeeCatalog />
  </PageLayout>
)