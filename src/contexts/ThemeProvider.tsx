import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import type { ThemeMode } from '../types/theme'
import { GlobalStyle } from '../styles/GlobalStyle'
import { darkTheme, lightTheme } from '../styles/themes'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'
import { ThemeContext } from './themeContext'
import type { ThemeContextValue } from './themeContext'

const isThemeMode = (value: unknown): value is ThemeMode => value === 'light' || value === 'dark'

const getInitialMode = (): ThemeMode => {
  const stored = readStorage<ThemeMode>(STORAGE_KEYS.theme, (value) =>
    isThemeMode(value) ? value : null,
  )
  if (stored) return stored

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return 'light'
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, mode)
  }, [mode])

  const toggleTheme = useCallback(() => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<ThemeContextValue>(() => ({ mode, toggleTheme }), [mode, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
