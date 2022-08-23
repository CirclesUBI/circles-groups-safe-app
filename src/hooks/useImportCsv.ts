import { useCallback, useState } from 'react'

import { isAddress } from '@ethersproject/address'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import useSafeTransaction from '@/src/hooks/useSafeTransaction'
import { useWeb3Connected } from '@/src/providers/web3ConnectionProvider'
import encodeGCTTransaction from '@/src/utils/contracts/encodeGCTTransaction'
import hubCall from '@/src/utils/contracts/hubCall'

export const useImportCsv = (groupAddress: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  // const [userTokens, setUserTokens] = useState<string[]>([])
  // const [addMemberTxs, setAddMemberTxs] = useState<BaseTransaction[]>([])
  // const [importReport, setImportReport] = useState({
  //   successed: 0,
  //   failed: 0,
  // })
  const { sdk } = useSafeAppsSDK()
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { execute } = useSafeTransaction(sdk)

  const addUsersToGroup = useCallback(
    async (userAddresses: string[]) => {
      try {
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
          // TODO: make use of contractTxs callbacks for import report
          // const onSuccess = () => {
          //   setImportReport((importReport) => ({
          //     ...importReport,
          //     successed: importReport.successed + 1,
          //   }))
          // }
          // const onError = () => {
          //   setImportReport((importReport) => ({ ...importReport, failed: importReport.failed + 1 }))
          // }
          // TODO: Address Validations
          //   * valid address
          //   * already group member
          //   * existant circles user
          if (isAddress(userAddress)) {
            const userToken = await getUserToken(userAddress)
            // setUserTokens((userTokens) => [...userTokens, userToken])
            return userToken
          }
          return ''
        })
        const userTokens = await Promise.all(userTokenPromises)

        if (!userTokens.length) {
          throw new Error('No user tokens for given addresses')
        }
        const filteredUserTokens = userTokens.filter(Boolean) // removes cases where userToken is empty string

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
    [isAppConnected, web3Provider, execute, groupAddress],
  )
  return {
    addUsersToGroup,
    // importReport,
    loading,
  }
}
