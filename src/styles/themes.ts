import type { ThemeMode } from '../types/theme'

import { baseColors, brandColors, breakpoints, fontFamilies, fontSizes } from './tokens'

export interface AppColors {
  bg: string
  surface: string
  surfaceAlt: string
  card: string
  text: string
  textMuted: string
  title: string
  subtitle: string
  border: string
  primary: string
  primaryHover: string
  primarySoft: string
  onPrimary: string
  accent: string
  accentHover: string
  accentDark: string
  accentSoft: string
  buttonBg: string
  buttonHover: string
  focusRing: string
  success: string
  error: string
  warning: string
  overlay: string
}

export interface AppTheme {
  mode: ThemeMode
  colors: AppColors
  fonts: {
    heading: string
    body: string
  }
  fontSizes: typeof fontSizes
  breakpoints: typeof breakpoints
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    bg: baseColors.background,
    surface: baseColors.white,
    surfaceAlt: baseColors.input,
    card: baseColors.card,
    text: baseColors.text,
    textMuted: baseColors.label,
    title: baseColors.title,
    subtitle: baseColors.subtitle,
    border: baseColors.button,
    primary: brandColors.yellow,
    primaryHover: brandColors.yellowDark,
    primarySoft: brandColors.yellowLight,
    onPrimary: baseColors.white,
    accent: brandColors.purple,
    accentHover: brandColors.purple,
    accentDark: brandColors.purpleDark,
    accentSoft: brandColors.purpleLight,
    buttonBg: baseColors.button,
    buttonHover: baseColors.hover,
    focusRing: brandColors.purple,
    success: '#2E7D32',
    error: '#B3261E',
    warning: '#A15C00',
    overlay: 'rgba(39, 34, 33, 0.45)',
  },
  fonts: fontFamilies,
  fontSizes,
  breakpoints,
}

/**
 * Tema escuro provisório. O STYLE_GUIDE.md descreve apenas a paleta clara.
 * A estrutura está pronta e os valores abaixo são uma proposta coerente,
 * registrada como pendência para validação do aluno (PRD seção 8).
 */
export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    bg: '#1B1614',
    surface: '#241E1B',
    surfaceAlt: '#2E2724',
    card: '#2A2320',
    text: '#E8E1DC',
    textMuted: '#B5AAA3',
    title: '#F7F2EE',
    subtitle: '#E1D8D2',
    border: '#3A322E',
    primary: brandColors.yellow,
    primaryHover: '#E7BC45',
    primarySoft: '#3A2F16',
    onPrimary: '#1B1614',
    accent: '#9B6BFF',
    accentHover: '#B18CFF',
    accentDark: brandColors.purple,
    accentSoft: '#2E2445',
    buttonBg: '#332B27',
    buttonHover: '#403631',
    focusRing: '#B18CFF',
    success: '#4ADE80',
    error: '#F87171',
    warning: '#FBBF24',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  fonts: fontFamilies,
  fontSizes,
  breakpoints,
}
