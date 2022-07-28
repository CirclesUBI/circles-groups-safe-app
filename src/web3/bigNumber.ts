import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import Wei from '@synthetixio/wei'

import formatNumber from '@/src/utils/formatNumber'

export const fromBN = (value?: BigNumberish, valueScale = 18) => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return undefined
  }
  return new Wei(BigNumber.from(value), valueScale)
}

export function formatToken(value?: BigNumberish, valueScale = 18): string | undefined {
  const bn = fromBN(value, valueScale)
  return bn ? formatNumber(bn.toNumber()) : undefined
}

export const toBN = (value: string) => new Wei(value).toBN()
/**
 * @comment this function was recollected from the myxogastria and core circle repositories
 */
export const toFreckles = (value: string): string => toBN(value).toString()
