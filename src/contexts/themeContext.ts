import { createContext } from 'react'

import type { ThemeMode } from '../types/theme'

export interface ThemeContextValue {
  mode: ThemeMode
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
