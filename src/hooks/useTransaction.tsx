import { useCallback, useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import {
  Contract,
  ContractInterface,
  ContractReceipt,
  ContractTransaction,
  Overrides,
} from '@ethersproject/contracts'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { toast } from 'react-hot-toast'

import { getGnosisExplorerUrl, getGnosisSafeUrl } from '../web3/explorerUrls'
import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { ZERO_BN } from '@/src/constants/misc'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { createTransactionError } from '@/src/utils/TransactionError'

export type UseTransactionReturn<Params> = {
  estimate: (params?: Params) => Promise<BigNumber | null>
  execute: (
    params?: Params,
    options?: Overrides,
    onSuccess?: () => void,
    onError?: () => void,
  ) => Promise<ContractReceipt | null>
}

export type QueryOptions = {
  refetchInterval: number
}

export default function useTransaction<
  MyContract extends Contract,
  Method extends keyof MyContract & string,
  Params extends Parameters<MyContract[Method]>,
>(address: string, abi: ContractInterface, method: Method): UseTransactionReturn<Params> {
  const { connected, safe } = useSafeAppsSDK()
  const { isAppConnected, web3Provider } = useWeb3Connection()

  const execute = useCallback(
    async (params?: Params, options?: Overrides, onSuccess?: () => void, onError?: () => void) => {
      const signer = web3Provider?.getSigner()
      if (!signer) {
        // TODO replace console with some notification or toast
        console.error('Transaction failed, there is no provider')
        return null
      }

      if (!isAppConnected) {
        console.error('App is not connected')
        return null
      }

      if (!connected) {
        console.error('Safe User is not connected')
        return null
      }

      const contract = new Contract(address, abi, signer) as MyContract
      const _params = Array.isArray(params) ? params : []

      let tx: ContractTransaction
      try {
        console.info('Please sign the transaction.')
        const deployedContract = await contract.deployed()
        const contractMethod = deployedContract[method]
        tx = await contractMethod(..._params, { ...options })
        const url = getGnosisSafeUrl(safe.safeAddress)
        console.info(url, 'Awaiting tx execution')

        notify({ type: WAITING_TYPE, explorerUrl: url })
      } catch (e: any) {
        toast.dismiss()

        const error = createTransactionError(e)
        if (error.code === 4001) {
          notify({ type: FAILED_TYPE, message: 'User denied signature' })
          if (onError) onError()
          return null
        }
        console.error('Transaction error', error.message)

        notify({ type: FAILED_TYPE, message: error.message })
        if (onError) onError()
        return null
      }

      let url = ''
      try {
        const receipt = await tx.wait()
        if (receipt.events && receipt.events.length > 0) {
          const event = receipt.events[0]
          const hash = event.transactionHash
          url = getGnosisExplorerUrl(hash)
        } else {
          url = getGnosisSafeUrl(safe.safeAddress)
        }

        console.log(url, 'Transaction success')

        toast.dismiss()
        notify({ type: SUCCESS_TYPE, explorerUrl: url })
        if (onSuccess) onSuccess()
        return receipt
      } catch (e: any) {
        toast.dismiss()

        const error = createTransactionError(e)
        notify({ type: FAILED_TYPE, explorerUrl: url })

        console.error('Transaction error', error.message)
        if (onError) onError()
        return null
      }
    },
    [web3Provider, isAppConnected, address, abi, method, connected, safe.safeAddress],
  )

  const estimate = useCallback(
    async (params?: Params) => {
      const signer = web3Provider?.getSigner()
      if (!signer) {
        notify({ type: FAILED_TYPE, message: 'There is no provider' })
        console.error('Transaction failed, there is no provider')
        return null
      }

      if (!isAppConnected) {
        console.error('App is not connected')
        return null
      }

      const _params = Array.isArray(params) ? params : []

      const contract = new Contract(address, abi, signer) as MyContract
      try {
        console.info('Calculating transaction gas.')
        const result = await contract.estimateGas[method as string](..._params)
        return result
      } catch (e: any) {
        console.error('Gas estimate failed', e.message)
        return ZERO_BN
      }
    },
    [abi, address, isAppConnected, method, web3Provider],
  )

  return useMemo(() => {
    return { execute, estimate }
  }, [execute, estimate])
}
