import { useCallback, useMemo } from 'react'

import { BaseTransaction, SendTransactionsResponse } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'
import { toast } from 'react-hot-toast'

import { Chains, chainsConfig } from '../constants/chains'
import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { createTransactionError } from '@/src/utils/TransactionError'

const getGnosisExplorerUrl = (hash: string) => {
  const url = chainsConfig[Chains.gnosis]?.blockExplorerUrls[0]
  const type = hash.length > 42 ? 'tx' : 'address'
  return `${url}/${type}/${hash}`
}

export default function useSafeTransaction(sdk: SafeAppsSDK) {
  const execute = useCallback(
    async (txs: BaseTransaction[], onSuccess?: () => void, onError?: () => void) => {
      if (!sdk) {
        console.error('Transaction failed, there is no sdk')
        return null
      }

      let txResponse: SendTransactionsResponse
      let txHash: string
      let txExplorerUrl
      try {
        console.info('Please sign the transaction.')
        notify({ type: WAITING_TYPE, explorerUrl: 'waiting for approval' })
        txResponse = await sdk.txs.send({
          txs,
        })
        txHash = txResponse.safeTxHash
        txExplorerUrl = getGnosisExplorerUrl(txHash)
        notify({ type: SUCCESS_TYPE, explorerUrl: txExplorerUrl })
        toast.dismiss()
        if (onSuccess) onSuccess()
        return txResponse.safeTxHash
      } catch (e: any) {
        toast.dismiss()

        const error = createTransactionError(e)
        if (error.code === 4001) {
          notify({ type: FAILED_TYPE, message: 'User denied signature' })
          if (onError) onError()
          return null
        }
        console.error('Transaction error', error.message)
        // notify({ type: FAILED_TYPE, explorerUrl: txExplorerUrl })
        notify({ type: FAILED_TYPE, message: error.message })
        if (onError) onError()
        return null
      }
    },
    [sdk],
  )

  return useMemo(() => {
    return { execute }
  }, [execute])
}
