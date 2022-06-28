import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import Wei from '@synthetixio/wei'

import formatNumber from '@/src/utils/formatNumber'

export function formatToken(value?: BigNumberish, valueScale = 18): string | undefined {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return undefined
  }

  const numberInWei = new Wei(BigNumber.from(value), valueScale)
  return formatNumber(numberInWei.toNumber())
}
