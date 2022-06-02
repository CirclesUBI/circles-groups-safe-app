const error = '#CC1E66'
const alert = '#CC1E66'
const primary = '#502A50'
const secondary = '#FAAD26'
const tertiary = '#3CC1CA'
const fourth = '#70BD9E'
const fifth = '#F26240'
const textColor = '#4E4E4E'
const gray = '#D9D9D9'
const white = '#fff'
const primaryGradient = 'linear-gradient(54.36deg, #AA5285 16.89%, #502A50 84.07%)'
const secondaryGradient = 'linear-gradient(59.47deg, #6EBE9F 16.72%, #502A50 79.34%)'
const borderRadius = '8px'
const containerWidth = '600px'
const space = 8

export const theme = {
  buttonPrimary: {
    backgroundColor: primary,
    backgroundColorHover: secondary,
    borderColor: primary,
    borderColorHover: secondary,
    color: white,
    colorHover: white,
  },
  card: {
    backgroundColor: '#fff',
    backgroundOpacity: '1',
    borderRadius: '12px',
  },
  colors: {
    error: error,
    alert: alert,
    mainBodyBackground: '#fff',
    primary: primary,
    secondary: secondary,
    tertiary: tertiary,
    fourth: fourth,
    fifth: fifth,
    gray: gray,
    white: white,
    textColor: textColor,
    primaryGradient: primaryGradient,
    secondaryGradient: secondaryGradient,
  },
  general: {
    space: space,
    borderRadius: borderRadius,
    containerWidth: containerWidth,
  },
  dropdown: {
    background: '#fff',
    borderColor: '#ccc',
    borderRadius: '6px',
    boxShadow: '0 0 24px 0 rgba(0, 0, 0, 0.1)',
    item: {
      backgroundColor: 'transparent',
      backgroundColorActive: 'rgba(0, 0, 0, 0.05)',
      backgroundColorHover: 'rgba(0, 0, 0, 0.05)',
      borderColor: '#ccc',
      color: '#000',
      colorActive: '#000',
      height: '38px',
      paddingHorizontal: '12px',
    },
  },
  fonts: {
    defaultSize: '1.4rem',
    fontFamilyHeading: `'ostrich_sansheavy', 'Helvetica Neue', 'Arial', 'sans-serif'`,
    fontFamily: `'Noto Sans', 'Helvetica Neue', 'Arial', 'sans-serif'`,
    fontFamilyCode: `'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'`,
  },
  footer: {},
  header: {},
  layout: {
    horizontalPaddingMobile: '4px',
    horizontalPaddingTabletPortraitStart: '16px',
    horizontalPaddingTabletLandscapeStart: '16px',
    maxWidth: '1122px',
  },
  themeBreakPoints: {
    desktopWideStart: '1281px',
    tabletPortraitStart: '481px',
    desktopStart: '1025px',
    tabletLandscapeStart: '769px',
  },
}
