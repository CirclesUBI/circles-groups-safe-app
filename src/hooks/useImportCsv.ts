import { useCallback, useState } from 'react'

import { isAddress } from '@ethersproject/address'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { getUsers } from '../utils/circlesGardenAPI'
import { useGroupMembersByGroupId } from './subgraph/useGroupMembers'
import useSafeTransaction from '@/src/hooks/useSafeTransaction'
import { useWeb3Connected } from '@/src/providers/web3ConnectionProvider'
import encodeGCTTransaction from '@/src/utils/contracts/encodeGCTTransaction'
import hubCall from '@/src/utils/contracts/hubCall'

export const useImportCsv = (groupAddress: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { sdk } = useSafeAppsSDK()
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { execute } = useSafeTransaction(sdk)
  const { groupMembers } = useGroupMembersByGroupId(groupAddress)

  const isAlreadyAMember = useCallback(
    (userAddress: string) =>
      groupMembers.some(
        ({ safeAddress }) => safeAddress.toLowerCase() === userAddress.toLowerCase(),
      ),
    [groupMembers],
  )

  const addUsersToGroup = useCallback(
    async (userAddresses: string[]) => {
      try {
        setLoading(true)
        if (!isAppConnected) {
          throw new Error('App is not connected')
        }
        const provider = web3Provider.getSigner()

        if (!userAddresses.length) {
          throw new Error('No user addresses where given')
        }
        const addresses = userAddresses.filter((address) => isAddress(address))
        if (!addresses.length) {
          throw new Error('No valid user addresses where given')
        }
        const circlesUsers = await getUsers(addresses)

        const existingUserAddresses = addresses.filter((address) =>
          circlesUsers.some((user) => user.safeAddress.toLowerCase() === address.toLowerCase()),
        )
        if (!existingUserAddresses.length) {
          throw new Error('User addresses given does not exist in the system')
        }

        const nonAlreadyMemberAddresses = existingUserAddresses.filter(
          (address) => !isAlreadyAMember(address),
        )
        if (!nonAlreadyMemberAddresses.length) {
          throw new Error('User addresses given are already members of the group')
        }

        const userTokenPromises = userAddresses.map(async (userAddress: string) => {
          const userToken = await hubCall(web3Provider, 'userToToken', [userAddress])
          return userToken ?? ''
        })
        const userTokens = await Promise.all(userTokenPromises)
        const filteredUserTokens = userTokens.filter(Boolean) // removes cases where userToken is empty string
        if (!userTokens.length) {
          throw new Error('No user tokens for given addresses')
        }

        const encodedTxPromises = filteredUserTokens.map(async (userToken) => {
          const encodedTx = await encodeGCTTransaction(groupAddress, provider, 'addMemberToken', [
            userToken,
          ])
          return encodedTx
        })
        const encondedTxs = await Promise.all(encodedTxPromises)
        if (!encondedTxs.length) {
          throw new Error('No AddMemberToken txs to execute')
        }

        await execute(encondedTxs)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    },
    [isAppConnected, web3Provider, execute, groupAddress, isAlreadyAMember],
  )
  return {
    addUsersToGroup,
    loading,
  }
}
