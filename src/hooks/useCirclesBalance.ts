import { useCallback, useMemo } from 'react'

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
export const getCirclesFromBalances = (tokenBalances: CirclesTokenBalance[]) => {
  const circlesAmounts = tokenBalances.map((crcToken) => crcToken.flatBalance)
  const totalAmount = circlesAmounts.reduce((prev, current) => {
    const bnAmount = BigNumber.from(current)
    return prev.add(bnAmount)
  }, BigNumber.from(0))

  return totalAmount.toString()
}

type CirclesTokenBalance = {
  isGroupCurrencyToken: boolean
  flatBalance: string
  balance: string
  address: string
  symbol: string
  name: string
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

  const groupAddresses = useMemo(
    () => groupMints.map((groupMint) => groupMint.groupAddress.toLowerCase()),
    [groupMints],
  )

  const isCRC = (tokenBalance: TokenBalance) => tokenBalance.tokenInfo.symbol === CRC
  const isGroup = useCallback(
    (tokenBalance: TokenBalance) =>
      groupAddresses.includes(tokenBalance.tokenInfo.address.toLowerCase()),
    [groupAddresses],
  )

  const getTCBalanceFromTokenBalance = (tokenBalance: TokenBalance) => {
    return formatNumber(circlesToTC(BigNumber.from(tokenBalance.balance).toString()))
  }

  const tokens = useMemo(() => {
    const filteredTokens = tokenBalances.filter((tb) => isCRC(tb) || isGroup(tb))
    return filteredTokens.map<CirclesTokenBalance>((tokenBalance) => {
      return {
        isGroupCurrencyToken: isGroup(tokenBalance),
        address: tokenBalance.tokenInfo.address,
        flatBalance: tokenBalance.balance,
        balance: getTCBalanceFromTokenBalance(tokenBalance),
        name: tokenBalance.tokenInfo.name,
        symbol: tokenBalance.tokenInfo.symbol,
      }
    })
  }, [tokenBalances, isGroup])

  const circles = useMemo(() => {
    const numericBalance = getCirclesFromBalances(tokens)
    const tcBalance = circlesToTC(numericBalance)
    return formatNumber(tcBalance)
  }, [tokens])

  return { circles, tokens }
}
