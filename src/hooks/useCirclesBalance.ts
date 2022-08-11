import { useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { TokenBalance } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'

import { circlesToTC } from '../utils/circleConversor'
import formatNumber from '../utils/formatNumber'
import { useGroupMints } from './subgraph/useGroupMints'
import { useSafeBalances } from './useSafeBalances'

const CRC = 'CRC'

/**
 * This function filter circles tokens given token balances
 * it only works when user is connected to the safe
 * @TODO we might want to fetch their balances using the SG
 */
export const getCirclesFromBalances = (tokenBalances: TokenBalance[]) => {
  const circlesAmounts = tokenBalances.map((crcToken) => crcToken.balance)
  let accumulatorBN = BigNumber.from(0)
  circlesAmounts.forEach((circlesAmount) => {
    const circlesAmountBN = BigNumber.from(circlesAmount)
    accumulatorBN = accumulatorBN.add(circlesAmountBN)
  })
  return accumulatorBN.toString()
}

/**
 * @description we fetch the group tokens owned by a user in the following way:
 * - we fetch the ERC20 user tokens using the gnosis useSafeBalances hook
 * - if a token has the symbol CRC then it's a normal CRC token
 * - if a token address belong to the minted tokens then it's a group CRC token
 *
 * @todo a better way should be using the Balance schema from the SG but ATM
 * it does not create balances for group tokens
 *
 */
export const useCirclesBalance = (safeAddress: string, sdk: SafeAppsSDK) => {
  const [tokenBalances] = useSafeBalances(sdk)
  const { groupMints } = useGroupMints(safeAddress)

  const circles = useMemo(() => {
    const groupAddresses = groupMints.map((groupMint) => groupMint.group.toLowerCase())
    const tokens = tokenBalances.filter((tokenBalance) => {
      const isCRC = tokenBalance.tokenInfo.symbol === CRC
      const tokenBalanceAddress = tokenBalance.tokenInfo.address.toLowerCase()
      const isGroup = groupAddresses.includes(tokenBalanceAddress)
      return isCRC || isGroup
    })
    const numericBalance = getCirclesFromBalances(tokens)
    const tcBalance = circlesToTC(numericBalance)
    return formatNumber(tcBalance)
  }, [tokenBalances, groupMints])

  return { circles }
}
