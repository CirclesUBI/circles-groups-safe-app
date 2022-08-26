import { useCallback, useEffect, useState } from 'react'

import { isAddress } from '@ethersproject/address'
import { JsonRpcSigner } from '@ethersproject/providers'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { getUsers } from '../utils/circlesGardenAPI'
import { useGroupMembersByGroupId } from './subgraph/useGroupMembers'
import useSafeTransaction from '@/src/hooks/useSafeTransaction'
import { useWeb3Connected } from '@/src/providers/web3ConnectionProvider'
import encodeGCTTransaction from '@/src/utils/contracts/encodeGCTTransaction'
import hubCall from '@/src/utils/contracts/hubCall'
import { GroupCurrencyToken } from '@/types/typechain'

type User = {
  username: string
  address: string
}

export const useImportCsv = (groupAddress: string, isAdd = true) => {
  const [isFileLoaded, setIsFileLoaded] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [validUsers, setValidUsers] = useState<User[]>([])
  const [invalidUsers, setInvalidUsers] = useState<User[]>([])
  const [importMessage, setImportMessage] = useState<string>('')

  const { sdk } = useSafeAppsSDK()
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { execute } = useSafeTransaction(sdk)
  const { groupMembers } = useGroupMembersByGroupId(groupAddress)

  const resetFileLoaded = () => {
    setIsFileLoaded(false)
    setLoading(false)
    setValidUsers([])
    setInvalidUsers([])
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

  const isValidMember = useCallback(
    (address: string) => {
      if (isAdd) {
        return !isAlreadyAMember(address)
      }
      return isAlreadyAMember(address)
    },
    [isAlreadyAMember, isAdd],
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
      const valid = new Array<User>()
      let invalid = new Array<User>()
      let message = ''
      try {
        // @todo should we allow/add the gno:0x...
        const filteredAddresses = addresses.filter((address) => isAddress(address))
        if (!addresses.length || !filteredAddresses.length) {
          message = 'No valid addresses were given'
          throw new Error(message)
        }
        const circlesUsers = await getUsers(filteredAddresses)
        const users = circlesUsers.reduce<Record<string, string>>((prev, curr) => {
          prev[curr.safeAddress.toLowerCase()] = curr.username
          return prev
        }, {})
        const existUser = (address: string) => !!users[address.toLowerCase()]

        const nonExistingUsers = filteredAddresses
          .filter((address) => !existUser(address))
          .map((address) => ({
            username: 'Unknown',
            address,
          }))
        invalid = invalid.concat(nonExistingUsers)

        const existingUsers = filteredAddresses.filter(existUser)

        if (!existingUsers.length) {
          message = 'No existing safe addresses were given'
          throw new Error(message)
        }

        const invalidMembers = existingUsers
          .filter((address) => !isValidMember(address))
          .map((address) => ({
            username: users[address.toLowerCase()],
            address,
          }))
        invalid = invalid.concat(invalidMembers)

        const nonMemberAddresses = existingUsers.filter(isValidMember)
        if (!nonMemberAddresses.length) {
          message = `No ${isAdd ? 'non' : ''} member safe addresses were given`
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
          const username = users[token.userAddress.toLowerCase()]
          if (token.tokenAddress) {
            valid.push({ address: token.tokenAddress, username })
          } else {
            // @todo this case should not be possible
            invalid.push({ address: token.userAddress, username })
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
    [isValidMember, web3Provider, isAdd],
  )

  const onReadFile = async (fileContent: string | ArrayBuffer) => {
    const addresses = csvFileToArray(fileContent)
    setLoading(true)
    const { invalid, message, valid } = await parseAddresses(addresses)
    setLoading(false)
    setIsFileLoaded(true)
    setValidUsers(valid)
    setInvalidUsers(invalid)
    setImportMessage(message)
  }

  const readFile = (file: File) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const fileContent = event.target?.result
      if (fileContent) {
        onReadFile(fileContent)
      }
    }
    fileReader.readAsText(file)
  }

  const encodingFunction = useCallback(
    async (userToken: User, provider: JsonRpcSigner) => {
      // @todo: really ugly way to handle this type
      let method: keyof GroupCurrencyToken['functions'] = 'addMemberToken'
      if (!isAdd) {
        method = 'removeMemberToken'
      }

      return await encodeGCTTransaction(groupAddress, provider, method, [userToken.address])
    },
    [groupAddress, isAdd],
  )

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

  const onSubmit = useCallback(
    async (onSuccess?: () => void, onError?: () => void) => {
      try {
        setLoading(true)
        if (!isAppConnected) {
          throw new Error('App is not connected')
        }
        const provider = web3Provider.getSigner()

        if (!validUsers) {
          throw new Error('No valid addresses to submit')
        }

        const encodedTxPromises = validUsers.map(async (userToken) => {
          return await encodingFunction(userToken, provider)
        })
        const encondedTxs = await Promise.all(encodedTxPromises)
        if (!encondedTxs.length) {
          throw new Error('No user tokens txs to execute')
        }

        await execute(encondedTxs, onSuccess, onError)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    },
    [isAppConnected, web3Provider, execute, validUsers, encodingFunction],
  )

  useEffect(() => {
    // @todo should we keep the file loaded?
    resetFileLoaded()
  }, [groupAddress])

  return {
    loading,
    isFileLoaded,
    onLoad,
    onSubmit,
    validUsers,
    invalidUsers,
    importMessage,
    resetFileLoaded,
  }
}
