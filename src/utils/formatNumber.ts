import { DEFAULT_DECIMALS } from '../constants/misc'

export default (value: number, decimals?: number): string =>
  value !== undefined
    ? Intl.NumberFormat('en', {
        maximumFractionDigits: decimals ? decimals : DEFAULT_DECIMALS,
      }).format(value)
    : ''

/**
 * Removes comma from string. ex: 1,700.25 = 1700.25
 * Returns a parsed number in float notation
 */
export const stringToValidFloat = (strAmount: string): number => {
  const validFloat = strAmount.replace(',', '') || '0'
  return parseFloat(validFloat)
}
