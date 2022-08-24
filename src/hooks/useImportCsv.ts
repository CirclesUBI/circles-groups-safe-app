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

  const addUsersToGroup = useCallback(
    async (userAddresses: string[]) => {
      try {
        if (!userAddresses.length) {
          throw new Error('No user addresses where given')
        }
        // TODO: validate existent users all together with [userAddresses]
        // wrap isCirclesUser with a Promise.all()
        const isCirclesUser = async (userAddress: string) => {
          const fetchedUsers = await getUsers([userAddress])
          return fetchedUsers.length !== 0
        }
        const isAlreadyAMember = (userAddress: string) =>
          groupMembers.some(
            ({ safeAddress }) => safeAddress.toLowerCase() === userAddress.toLowerCase(),
          )
        const getUserToken = async (userAddress: string) => {
          if (!isAppConnected) {
            throw new Error('App is not connected')
          }
          const userToken = await hubCall(web3Provider, 'userToToken', [userAddress])
          if (!userToken) {
            throw new Error('User Token does not exists')
          }
          return userToken
        }
        setLoading(true)
        if (!isAppConnected) {
          throw new Error('App is not connected')
        }
        const provider = web3Provider.getSigner()
        const userTokenPromises = userAddresses.map(async (userAddress) => {
          if (
            isAddress(userAddress) &&
            (await isCirclesUser(userAddress)) &&
            !isAlreadyAMember(userAddress)
          ) {
            const userToken = await getUserToken(userAddress)
            return userToken
          }
          return ''
        })
        const userTokens = await Promise.all(userTokenPromises)

        if (!userTokens.length) {
          throw new Error('No user tokens for given addresses')
        }
        const filteredUserTokens = userTokens.filter(Boolean) // removes cases where userToken is empty string
        if (!filteredUserTokens.length) {
          throw new Error('No filtered user tokens for given addresses')
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
        // TODO: handle GroupMembers state update
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    },
    [isAppConnected, web3Provider, execute, groupMembers, groupAddress],
  )
  return {
    addUsersToGroup,
    loading,
  }
}
