import { useMemo } from 'react'

import { TokenBalance } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'

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
  const circles = circlesAmounts.reduce((prev, curr) => prev + parseInt(curr) ?? 0, 0)
  return String(circles)
}

export const useCirclesBalance = (sdk: SafeAppsSDK) => {
  const [tokenBalances] = useSafeBalances(sdk)
  const circles = useMemo(() => getCirclesFromBalances(tokenBalances), [tokenBalances])

  return { circles }
}
