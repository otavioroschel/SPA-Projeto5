/**
 * Tokens de origem do STYLE_GUIDE.md.
 * Não trocar os HEX por aproximações (PRD seção 8).
 */
export const brandColors = {
  yellowDark: '#C47F17',
  yellow: '#DBAC2C',
  yellowLight: '#F1E9C9',
  purpleDark: '#4B2995',
  purple: '#8047F8',
  purpleLight: '#EBE5F9',
} as const

export const baseColors = {
  title: '#272221',
  subtitle: '#403937',
  text: '#574F4D',
  label: '#8D8686',
  hover: '#D7D5D5',
  button: '#E6E5E5',
  input: '#EDEDED',
  card: '#F3F2F2',
  background: '#FAFAFA',
  white: '#FFFFFF',
} as const

export const fontFamilies = {
  heading: "'Baloo 2', 'Trebuchet MS', system-ui, sans-serif",
  body: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const

export const fontSizes = {
  titleXl: '48px',
  titleL: '32px',
  titleM: '24px',
  titleS: '20px',
  titleXs: '18px',
  textL: '20px',
  textM: '16px',
  textS: '14px',
  textXs: '12px',
  tag: '10px',
  buttonG: '14px',
  buttonM: '12px',
} as const

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const
