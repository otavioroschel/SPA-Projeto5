import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.textM};
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.title};
    line-height: 1.3;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  img,
  svg {
    max-width: 100%;
    display: block;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
    border-radius: 4px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
