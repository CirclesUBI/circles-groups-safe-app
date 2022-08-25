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
  const [isFileLoaded, setIsFileLoaded] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [validAddresses, setValidAddresses] = useState<string[]>([])
  const [invalidAddresses, setInvalidAddresses] = useState<string[]>([])
  const [importMessage, setImportMessage] = useState<string>('')

  const { sdk } = useSafeAppsSDK()
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { execute } = useSafeTransaction(sdk)
  const { groupMembers } = useGroupMembersByGroupId(groupAddress)

  const resetFileLoaded = () => {
    setIsFileLoaded(false)
    setLoading(false)
    setValidAddresses([])
    setInvalidAddresses([])
    setImportMessage('')
  }

  // @todo verify valid csv format (atm we require a file where each line is separated by "enters")
  const csvFileToArray = (fileContent: string | ArrayBuffer) => {
    const csvRows = String(fileContent).split('\n')
    const filteredAddresses = csvRows.filter(Boolean)
    return filteredAddresses
  }

  const isAlreadyAMember = useCallback(
    (userAddress: string) =>
      groupMembers.some(
        ({ safeAddress }) => safeAddress.toLowerCase() === userAddress.toLowerCase(),
      ),
    [groupMembers],
  )

  /**
   * @description this function returns an object with the following:
   * - valid: an array of valid addresses, an address is valid if
   *   - it is an address (0x... or gno:0x...)
   *   - it is an existing user in the system
   *   - it is not a member of the group
   * - invalid: an array of invalid addresses (it wont take into consideration wrongly formatted strings)
   */
  const parseAddresses = useCallback(
    async (addresses: string[]) => {
      const valid = new Array<string>()
      let invalid = new Array<string>()
      let message = ''
      try {
        // @todo should we allow/add the gno:0x...
        const validAddresses = addresses.filter((address) => isAddress(address))
        if (!addresses.length || !validAddresses.length) {
          message = 'No valid addresses were given'
          throw new Error(message)
        }
        const circlesUsers = await getUsers(validAddresses)
        const existUser = (address: string) =>
          circlesUsers.some((user) => user.safeAddress.toLowerCase() === address.toLowerCase())

        const nonExistingUsers = validAddresses.filter((address) => !existUser(address))
        invalid = invalid.concat(nonExistingUsers)

        const existingUsers = validAddresses.filter(existUser)

        if (!existingUsers.length) {
          message = 'No existing safe addresses were given'
          throw new Error(message)
        }

        const alreadyMembers = existingUsers.filter(isAlreadyAMember)
        invalid = invalid.concat(alreadyMembers)

        const nonMemberAddresses = existingUsers.filter((address) => !isAlreadyAMember(address))
        if (!nonMemberAddresses.length) {
          message = 'No non-member safe addresses were given'
          throw new Error(message)
        }

        const userTokenPromises = nonMemberAddresses.map(async (userAddress: string) => {
          const userToken = await hubCall(web3Provider, 'userToToken', [userAddress])
          return {
            tokenAddress: userToken ?? '',
            userAddress,
          }
        })
        const userTokens = await Promise.all(userTokenPromises)
        userTokens.forEach((token) => {
          if (token.tokenAddress) {
            valid.push(token.tokenAddress)
          } else {
            // @todo this case should not be possible
            invalid.push(token.userAddress)
          }
        })
        if (!valid.length) {
          message = 'No existing user tokens for the safe addresses given'
          throw new Error(message)
        }
      } catch (e) {
        console.log(e)
      }
      return {
        valid,
        invalid,
        message,
      }
    },
    [isAlreadyAMember, web3Provider],
  )

  const onReadFile = async (content: string | ArrayBuffer) => {
    const addresses = csvFileToArray(content)
    setLoading(true)
    const { invalid, message, valid } = await parseAddresses(addresses)
    setLoading(false)
    setIsFileLoaded(true)
    setValidAddresses(valid)
    setInvalidAddresses(invalid)
    setImportMessage(message)
  }

  const readFile = (file: File) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const onloadResult = event.target?.result
      if (onloadResult) {
        onReadFile(onloadResult)
      }
    }
    fileReader.readAsText(file)
  }

  const onLoad = (fileList: FileList | null) => {
    // TODO: validate if file not present or invalid to disable/enable submit button
    if (fileList) {
      // @description we only use the first file loaded
      const uploadedFile = fileList.item(0)
      if (uploadedFile && uploadedFile.name.endsWith('.csv')) {
        readFile(uploadedFile)
      } else {
        resetFileLoaded()
      }
    } else {
      resetFileLoaded()
    }
  }

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      if (!isAppConnected) {
        throw new Error('App is not connected')
      }
      const provider = web3Provider.getSigner()

      if (!validAddresses) {
        throw new Error('No valid addresses to submit')
      }

      const encodedTxPromises = validAddresses.map(async (userToken) => {
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
  }, [isAppConnected, web3Provider, execute, groupAddress, validAddresses])
  return {
    loading,
    isFileLoaded,
    onLoad,
    onSubmit,
    validAddresses,
    invalidAddresses,
    importMessage,
  }
}
