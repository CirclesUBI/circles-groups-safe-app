import { useCallback, useMemo } from 'react'

import { BaseTransaction, SendTransactionsResponse } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk'
import {
  TransactionDetails,
  TransactionStatus,
} from '@gnosis.pm/safe-apps-sdk/node_modules/@gnosis.pm/safe-react-gateway-sdk'
import { toast } from 'react-hot-toast'

import { retry } from '../utils/tools'
import { getGnosisExplorerUrl } from '../web3/explorerUrls'
import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { createTransactionError } from '@/src/utils/TransactionError'

export default function useSafeTransaction(sdk: SafeAppsSDK) {
  const waitForConfirmations = useCallback(
    async (safeTxHash: string) => {
      if (!sdk) return ''

      const getDetails = (_safeTxHash: string) => {
        return sdk.txs.getBySafeTxHash(_safeTxHash)
      }
      const untilFinished = (txDetails: TransactionDetails) => {
        return txDetails.txStatus !== TransactionStatus.AWAITING_CONFIRMATIONS
      }
      const details = await retry(safeTxHash, getDetails, untilFinished, 0)
      return details?.txHash ?? ''
    },
    [sdk],
  )

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
        txResponse = await sdk.txs.send({
          txs,
        })
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
