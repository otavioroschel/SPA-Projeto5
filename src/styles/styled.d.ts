import 'styled-components'

import type { ThemeMode } from '../types/theme'
import type { AppTheme } from './themes'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {
    mode: ThemeMode
  }
}
