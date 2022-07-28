import { useCallback, useState } from 'react'

import { getAddress } from '@ethersproject/address'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'
import useSWR from 'swr'

import { useWeb3Connected } from '../providers/web3ConnectionProvider'
import { tcToCircles } from '../utils/circleConversor'
import encodeGCTTransaction from '../utils/contracts/encodeGCTTransaction'
import encodeHubTransaction from '../utils/contracts/encodeHubTransaction'
import {
  getPath,
  transformPathToMintParams,
  transformPathToTransferThroughParams,
} from '../utils/pathfinderAPI'
import { formatToken, toFreckles } from '../web3/bigNumber'
import { useGroupCurrencyTokensById } from './subgraph/useGroupCurrencyToken'
import useSafeTransaction from './useSafeTransaction'

const fetchGroupMintTokenData = async (from: string, to: string, amount?: string) => {
  if (!from || !to) return { path: [], mintMaxAmount: '0' }

  const checksumFromAddress = getAddress(from)
  const checksumToAddress = getAddress(to)
  const data = await getPath(checksumFromAddress, checksumToAddress, amount)
  const path = data?.transfers ?? []
  const mintMaxAmount = data?.flow ?? '0'
  return { path, mintMaxAmount }
}

export const useGroupMintToken = (userAddress: string, groupAddress: string, sdk: SafeAppsSDK) => {
  // @TODO we dont need this provider most of the time, we can get rid of it
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { group } = useGroupCurrencyTokensById(groupAddress)
  const { execute } = useSafeTransaction(sdk)

  const [loading, setLoading] = useState<boolean>(false)

  const {
    data: mintTokenData,
    error,
    mutate,
  } = useSWR(['useGroupMintToken', userAddress, groupAddress], () =>
    fetchGroupMintTokenData(userAddress, groupAddress),
  )

  const mintToken = useCallback(
    async (mintAmount: string) => {
      try {
        setLoading(true)
        if (!isAppConnected) {
          throw new Error('App is not connected')
        }
        if (!group) {
          throw new Error('Group does not exists')
        }
        // @TODO we can use a default provider instead of relaying on the web3 provider
        const provider = web3Provider.getSigner()

        const formattedMintAmount = toFreckles(mintAmount)

        const { mintMaxAmount, path } = await fetchGroupMintTokenData(
          userAddress,
          groupAddress,
          formattedMintAmount,
        )
        if (path.length === 0) {
          throw new Error('Path does not exists yet')
        }
        // @TODO we should verify that new max amount is greater or equals than expected mint amount
        const { dests, srcs, tokenOwners, wads } = transformPathToTransferThroughParams(path)

        const transferThroughTx = await encodeHubTransaction(provider, 'transferThrough', [
          tokenOwners,
          srcs,
          dests,
          wads,
        ])
        /**
         * @TODO is it correct that safe address will transfer to treasury?
         * Using this user will fix the issue when the path does not have a trusted user
         * to be able to call the mint method from the group
         */
        const users = dests
        const collaterals = await transformPathToMintParams(groupAddress, users, provider)
        // @TODO shall we convert mintAmount to tc?
        // const tcMintAmount = formattedMintAmount
        const tcMintAmount = String(tcToCircles(formattedMintAmount))
        const amounts = [tcMintAmount]
        if (collaterals.length === 0) {
          throw new Error('Collaterals must have some elements')
        }
        const mintTx = await encodeGCTTransaction(groupAddress, provider, 'mint', [
          collaterals,
          amounts,
        ])
        const txs = [transferThroughTx, mintTx]
        await execute(txs)
      } catch (err) {
        console.log({ err })
      } finally {
        setLoading(false)
      }
    },
    [group, isAppConnected, web3Provider, execute, groupAddress, userAddress],
  )
  return {
    // @TODO we don't convert anymore from circles to tc, investigate if this is correct
    mintMaxAmount: formatToken(mintTokenData?.mintMaxAmount) ?? '0',
    error,
    refetch: mutate,
    mintToken,
    loading,
    group,
  }
}
