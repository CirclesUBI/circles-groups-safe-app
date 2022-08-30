import { useCallback, useMemo, useState } from 'react'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { CONFIRMATION_TIME } from '../constants/misc'
import { useWeb3Connected } from '../providers/web3ConnectionProvider'
import encodeGCTTransaction from '../utils/contracts/encodeGCTTransaction'
import { AllowedMintingUser, useGroupCurrencyTokensById } from './subgraph/useGroupCurrencyToken'
import useSafeTransaction from './useSafeTransaction'

export const useAllowedMintingUser = (groupAddress: string) => {
  const { group, refetch } = useGroupCurrencyTokensById(groupAddress)
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { safe, sdk } = useSafeAppsSDK()
  const { execute } = useSafeTransaction(sdk, safe.safeAddress)
  const [loading, setLoading] = useState<boolean>(false)

  // @todo the handling to update the group settings could be done in a different hook/file
  const [allowedMintingUser, setAllowedMintingUser] = useState<AllowedMintingUser>(
    group?.allowedMintingUser ?? AllowedMintingUser.trusted,
  )

  const saveAllowedUserConfiguration = useCallback(async () => {
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
      let setOnlyOwnerCanMint = false
      let setOnlyTrustedCanMint = false

      /**
       * @todo we only allow a specific setting per group
       * so we force that a group have a single setting (all user, only trusted, only owners)
       */
      if (allowedMintingUser === AllowedMintingUser.owners) {
        setOnlyOwnerCanMint = true
        setOnlyTrustedCanMint = false
      } else if (allowedMintingUser === AllowedMintingUser.members) {
        setOnlyOwnerCanMint = false
        setOnlyTrustedCanMint = true
      } else {
        setOnlyOwnerCanMint = false
        setOnlyTrustedCanMint = false
      }
      const tx1 = await encodeGCTTransaction(groupAddress, provider, 'setOnlyOwnerCanMint', [
        setOnlyOwnerCanMint,
      ])
      const tx2 = await encodeGCTTransaction(groupAddress, provider, 'setOnlyTrustedCanMint', [
        setOnlyTrustedCanMint,
      ])
      const txs = [tx1, tx2]
      await execute(txs)
      // @todo we should refetch the group information?
      setTimeout(() => {
        refetch()
      }, CONFIRMATION_TIME)
    } catch (e) {
      console.log({ e })
    } finally {
      setLoading(false)
    }
  }, [isAppConnected, group, web3Provider, execute, groupAddress, allowedMintingUser, refetch])

  const isDisabledUpdateAllowedMinting = useMemo(
    () => group?.allowedMintingUser === allowedMintingUser,
    [group?.allowedMintingUser, allowedMintingUser],
  )

  return {
    allowedMintingUser,
    setAllowedMintingUser,
    saveAllowedUserConfiguration,
    isDisabledUpdateAllowedMinting,
    loading,
  }
}
