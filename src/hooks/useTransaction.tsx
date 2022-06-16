import { useCallback, useMemo } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import {
  Contract,
  ContractInterface,
  ContractReceipt,
  ContractTransaction,
  Overrides,
} from '@ethersproject/contracts'
import { toast } from 'react-hot-toast'

import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { ZERO_BN } from '@/src/constants/misc'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { TransactionError } from '@/src/utils/TransactionError'

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
  const { getExplorerUrl, isAppConnected, web3Provider } = useWeb3Connection()

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

      const contract = new Contract(address, abi, signer) as MyContract
      const _params = Array.isArray(params) ? params : []

      let tx: ContractTransaction
      try {
        console.info('Please sign the transaction.')
        const deployedContract = await contract.deployed()
        const contractMethod = deployedContract[method]
        tx = await contractMethod(..._params, { ...options })
        console.info(getExplorerUrl(tx.hash), 'Awaiting tx execution')

        notify({ type: WAITING_TYPE, explorerUrl: getExplorerUrl(tx.hash) })
      } catch (e: any) {
        toast.dismiss()

        const error = new TransactionError(
          e.data?.message || e.message || 'Unable to decode revert reason',
          e.data?.code || e.code,
          e.data,
        )
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

      try {
        const receipt = await tx.wait()
        console.log(getExplorerUrl(tx.hash), 'Transaction success')

        toast.dismiss()
        notify({ type: SUCCESS_TYPE, explorerUrl: getExplorerUrl(tx.hash) })
        if (onSuccess) onSuccess()
        return receipt
      } catch (e: any) {
        toast.dismiss()

        const error = new TransactionError(
          e.data?.message || e.message || 'Unable to decode revert reason',
          e.data?.code || e.code,
          e.data,
        )

        notify({ type: FAILED_TYPE, explorerUrl: getExplorerUrl(tx.hash) })

        console.error('Transaction error', error.message)
        if (onError) onError()
        return null
      }
    },
    [web3Provider, isAppConnected, address, abi, method, getExplorerUrl],
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
