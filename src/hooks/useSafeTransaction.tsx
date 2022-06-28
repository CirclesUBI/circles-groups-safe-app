import { useCallback, useMemo } from 'react'

import { BaseTransaction, SendTransactionsResponse } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'
import { toast } from 'react-hot-toast'

import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { TransactionError } from '@/src/utils/TransactionError'

export default function useSafeTransaction() {
  const execute = useCallback(
    async (
      sdk: SafeAppsSDK,
      txs: BaseTransaction[],
      onSuccess?: () => void,
      onError?: () => void,
    ) => {
      if (!sdk) {
        // TODO replace console with some notification or toast
        console.error('Transaction failed, there is no sdk')
        return null
      }

      let txResponse: SendTransactionsResponse
      try {
        console.info('Please sign the transaction.')
        notify({ type: WAITING_TYPE, explorerUrl: 'waiting for approval' })
        txResponse = await sdk.txs.send({
          txs,
        })
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
        notify({ type: SUCCESS_TYPE, explorerUrl: txResponse.safeTxHash })
        toast.dismiss()
        if (onSuccess) onSuccess()
        return txResponse.safeTxHash
      } catch (e: any) {
        toast.dismiss()

        const error = new TransactionError(
          e.data?.message || e.message || 'Unable to decode revert reason',
          e.data?.code || e.code,
          e.data,
        )

        notify({ type: FAILED_TYPE, explorerUrl: txResponse.safeTxHash })

        console.error('Transaction error', error.message)
        if (onError) onError()
        return null
      }
    },
    [],
  )

  return useMemo(() => {
    return { execute }
  }, [execute])
}
