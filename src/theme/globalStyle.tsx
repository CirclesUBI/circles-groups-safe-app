import { createGlobalStyle } from 'styled-components'

import { theme } from '@/src/theme/index'

type ThemeType = typeof theme

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  :root {}

  @font-face {
    font-family: 'ostrich_sansheavy';
    src: url('/fonts/ostrichsans-heavy-webfont.woff2') format('woff2'),
        url('/fonts/ostrichsans-heavy-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 10px;
    scroll-behavior: smooth;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textColor};
    font-family: ${({ theme }) => theme.fonts.fontFamily};
    font-size: ${({ theme }) => theme.fonts.defaultSize};
    min-height: 100vh;
    outline-color: ${({ theme }) => theme.colors.secondary};
  }
  ::selection {
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.primary} !important;
  }
  ::-moz-selection {
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.primary} !important;
  }
  a, button{
    transition: all 0.3s ease-in-out;
  }
  h1, h2{
    font-family: ${({ theme }) => theme.fonts.fontFamilyHeading};
  }
  h1, h2, h3, h4{
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    line-height: 1.2;
  }
  h1{
    font-size: 3.2rem;
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
      font-size: 3.6rem;
    }
  }
  h3{

  }
  h4{
    font-weight: 700;
    font-size: 16px;
    margin-bottom: ${({ theme }) => theme.general.space * 2}px;
  }
  code {
    font-family: ${({ theme }) => theme.fonts.fontFamilyCode};
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
  }
  hr{
    margin-top: ${({ theme }) => theme.general.space * 2}px;
    margin-bottom: ${({ theme }) => theme.general.space * 2}px;
    display: block; 
    height: 1px;
    border: 0; 
    border-top: 1px solid #e0e0e0;
  }
  .not-allowed{
    cursor: not-allowed !important;
  }
  .disabled {
    pointer-events: none !important;
    opacity: 0.4;
    &:hover{
      text-decoration: none;
    }
  }
`
