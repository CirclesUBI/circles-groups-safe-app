import { useCallback, useMemo } from 'react'

import { SendTransactionsParams, SendTransactionsResponse } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'
import { toast } from 'react-hot-toast'

import { getGnosisExplorerUrl } from '../web3/explorerUrls'
import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { createTransactionError } from '@/src/utils/TransactionError'

export default function useSafeTransaction(sdk: SafeAppsSDK) {
  /**
   * @todo this is a really BAD approach to handle confirmations:
   * a better way would be using a library which allow to wait for X time before
   * recalling a function
   */
  const waitForConfirmations = useCallback(
    async (safeTxHash: string) => {
      let attempts = 0
      let finished = false
      let txHash = ''
      if (!sdk) return txHash

      while (!finished || attempts < 15) {
        const txDetails = await sdk.txs.getBySafeTxHash(safeTxHash)
        finished = txDetails && txDetails.txStatus !== 'AWAITING_EXECUTION'
        if (txDetails.txHash) {
          txHash = txDetails.txHash
        }
        attempts += 1
      }
      return txHash
    },
    [sdk],
  )

  const execute = useCallback(
    async (
      safeTransaction: SendTransactionsParams,
      onSuccess?: () => void,
      onError?: () => void,
    ) => {
      if (!sdk) {
        console.error('Transaction failed, there is no sdk')
        return null
      }

      let txResponse: SendTransactionsResponse
      let txHash: string
      let txExplorerUrl
      try {
        console.info('Please sign the transaction.')
        txResponse = await sdk.txs.send(safeTransaction)
        const safeTxHash = txResponse.safeTxHash
        notify({ type: WAITING_TYPE, message: 'waiting for approval' })
        txHash = await waitForConfirmations(safeTxHash)
        txExplorerUrl = getGnosisExplorerUrl(txHash)

        notify({ type: SUCCESS_TYPE, explorerUrl: txExplorerUrl })
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
    [sdk, waitForConfirmations],
  )

  return useMemo(() => {
    return { execute }
  }, [execute])
}
