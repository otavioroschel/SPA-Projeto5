import { MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logoIcon from '../../assets/logo-icon.svg'
import { CartBadge } from '../CartBadge/CartBadge'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 32px 0;
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const BrandIcon = styled.img`
  width: 38px;
  height: 38px;
`

const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.accentDark};
  line-height: 1;

  strong {
    font-size: 22px;
    font-weight: 800;
  }

  span {
    font-size: 13px;
    font-weight: 700;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Location = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentDark};
  font-size: ${({ theme }) => theme.fontSizes.textS};
  white-space: nowrap;
`

export const Header = () => (
  <Bar>
    <Brand to="/" aria-label="Coffee Delivery — página inicial">
      <BrandIcon src={logoIcon} alt="" />
      <BrandText>
        <strong>Coffee</strong>
        <span>Delivery</span>
      </BrandText>
    </Brand>

    <Actions>
      <Location>
        <MapPin size={18} weight="fill" aria-hidden />
        Porto Alegre, RS
      </Location>
      <ThemeToggle />
      <CartBadge />
    </Actions>
  </Bar>
)
