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
const black = '#000'
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
  buttonSecondary: {
    backgroundColor: secondary,
    backgroundColorHover: primary,
    borderColor: secondary,
    borderColorHover: primary,
    color: white,
    colorHover: white,
  },
  card: {
    backgroundColor: '#fff',
    backgroundOpacity: '1',
    borderRadius: '12px',
  },
  colors: {
    success: fourth,
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
    black: black,
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
    boxShadow:
      '0px 63px 109px rgba(0, 0, 0, 0.07), 0px 40.8333px 63.8356px rgba(0, 0, 0, 0.0531481), 0px 24.2667px 34.7185px rgba(0, 0, 0, 0.0425185), 0px 12.6px 17.7125px rgba(0, 0, 0, 0.035), 0px 5.13333px 8.88148px rgba(0, 0, 0, 0.0274815), 0px 1.16667px 4.28935px rgba(0, 0, 0, 0.0168519)',
    item: {
      backgroundColor: 'transparent',
      backgroundColorActive: 'rgba(0, 0, 0, 0.05)',
      backgroundColorHover: 'rgba(0, 0, 0, 0.05)',
      borderColor: '#E0E0E0',
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
  toast: {
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: '0.5px',
    backgroundColor: primary,
    boxShadow:
      '0px 63px 109px rgba(0, 0, 0, 0.07), 0px 40.8333px 63.8356px rgba(0, 0, 0, 0.0531481), 0px 24.2667px 34.7185px rgba(0, 0, 0, 0.0425185), 0px 12.6px 17.7125px rgba(0, 0, 0, 0.035), 0px 5.13333px 8.88148px rgba(0, 0, 0, 0.0274815), 0px 1.16667px 4.28935px rgba(0, 0, 0, 0.0168519)',
  },
  checkBox: {
    backgroundColorActive: fourth,
    backgroundColor: '#fff',
    borderColorActive: fourth,
    borderColor: primary,
    dimensions: '20px',
  },
}
