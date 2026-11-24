import { Moon, Sun } from '@phosphor-icons/react'
import styled from 'styled-components'

import { useTheme } from '../../hooks/useTheme'

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.buttonBg};
  color: ${({ theme }) => theme.colors.accentDark};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme()
  const isDark = mode === 'dark'
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'

  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label={label} title={label}>
      {isDark ? <Sun size={20} weight="bold" aria-hidden /> : <Moon size={20} weight="bold" aria-hidden />}
    </ToggleButton>
  )
}
