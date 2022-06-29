import { useCallback, useState } from 'react'

import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'
import useSWR from 'swr'

import { useWeb3Connected } from '../providers/web3ConnectionProvider'
import encodeGCTTransaction from '../utils/contracts/encodeGCTTransaction'
import encodeHubTransaction from '../utils/contracts/encodeHubTransaction'
import {
  getPath,
  transformPathToMintParams,
  transformPathToTransferThroughParams,
} from '../utils/pathfinderAPI'
import { useGroupCurrencyTokensById } from './subgraph/useGroupCurrencyToken'
import useSafeTransaction from './useSafeTransaction'

const fetchGroupMintTokenData = async (from: string, to: string) => {
  const data = await getPath(from, to)
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

  const { data, error, mutate } = useSWR(['useGroupMintToken', userAddress, groupAddress], () =>
    fetchGroupMintTokenData(userAddress, groupAddress),
  )

  const mintToken = useCallback(
    async (mintAmount: string) => {
      try {
        setLoading(true)
        if (group) {
          console.log('ERROR: group does not exists')
          return
        }
        if (!isAppConnected) {
          console.log('ERROR: app is not connected')
          return
        }
        // @TODO we can use a default provider instead of relaying on the web3 provider
        const provider = web3Provider.getSigner()

        const path = data?.path
        if (!path) {
          console.log('ERROR: path does not exists yet')
          return
        }
        const { dests, srcs, tokenOwners, wads } = transformPathToTransferThroughParams(path)
        const transferThroughTx = await encodeHubTransaction(provider, 'transferThrough', [
          tokenOwners,
          srcs,
          dests,
          wads,
        ])
        const collaterals = await transformPathToMintParams(dests, srcs, provider)
        const amounts = [mintAmount]
        if (collaterals.length === 0) {
          console.log('ERROR: collaterals must be filled with some elements')
          return
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
    [group, isAppConnected, web3Provider, data, execute, groupAddress],
  )
  return {
    path: data?.path,
    mintMaxAmount: data?.mintMaxAmount,
    error,
    refetch: mutate,
    mintToken,
    loading,
    group,
  }
}
