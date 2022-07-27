import { useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { TokenBalance } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'

import { circlesToTC } from '../utils/circleConversor'
import formatNumber from '../utils/formatNumber'
import { useSafeBalances } from './useSafeBalances'

const CRC = 'CRC'

/**
 * This function filter circles tokens given token balances
 * it only works when user is connected to the safe
 * @TODO we might want to fetch their balances using the SG
 */
export const getCirclesFromBalances = (tokenBalances: TokenBalance[]) => {
  const crcTokens = tokenBalances.filter((tokenBalance) => tokenBalance.tokenInfo.symbol === CRC)
  const circlesAmounts = crcTokens.map((crcToken) => crcToken.balance)
  let accumulatorBN = BigNumber.from(0)
  circlesAmounts.forEach((circlesAmount) => {
    const circlesAmountBN = BigNumber.from(circlesAmount)
    accumulatorBN = accumulatorBN.add(circlesAmountBN)
  })
  return accumulatorBN.toString()
}

export const useCirclesBalance = (sdk: SafeAppsSDK) => {
  const [tokenBalances] = useSafeBalances(sdk)
  const circles = useMemo(() => {
    const balance = getCirclesFromBalances(tokenBalances)
    const tc = circlesToTC(balance)
    return formatNumber(tc)
  }, [tokenBalances])

  return { circles }
}
