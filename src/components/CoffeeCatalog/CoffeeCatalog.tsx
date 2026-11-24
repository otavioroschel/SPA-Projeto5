import styled from 'styled-components'

import { coffees } from '../../data/coffees'
import { CoffeeCard } from '../CoffeeCard/CoffeeCard'

const Section = styled.section`
  padding-bottom: 64px;
`

const Title = styled.h2`
  margin-bottom: 32px;
  font-size: ${({ theme }) => theme.fontSizes.titleL};
  color: ${({ theme }) => theme.colors.subtitle};

  @media (max-width: 479px) {
    font-size: ${({ theme }) => theme.fontSizes.titleM};
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px 20px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 559px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`

export const CoffeeCatalog = () => (
  <Section aria-labelledby="catalogo-title">
    <Title id="catalogo-title">Nossos cafés</Title>
    <Grid>
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </Grid>
  </Section>
)
