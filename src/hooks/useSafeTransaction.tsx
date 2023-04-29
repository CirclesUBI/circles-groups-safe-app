import { useCallback, useMemo } from 'react'

import { BaseTransaction, TransactionStatus } from '@gnosis.pm/safe-apps-sdk'
import SafeAppsSDK from '@safe-global/safe-apps-react-sdk/node_modules/@safe-global/safe-apps-sdk/dist/src/sdk'
import { TransactionDetails } from '@safe-global/safe-gateway-typescript-sdk'
import { toast } from 'react-hot-toast'

import { retry } from '../utils/tools'
import { getGnosisExplorerUrl, getGnosisSafeUrl } from '../web3/explorerUrls'
import { notify } from '@/src/components/toast/Toast'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'
import { createTransactionError } from '@/src/utils/TransactionError'

export default function useSafeTransaction(sdk: SafeAppsSDK, safeAddress: string) {
  /**
   * @todo There are some 'weird' cases when we can not generate the tx url for
   * the gnosis explorer, instead we return the url to the gnosis safe transactions.
   * There seems to be an issue with the 'getBySafeTxHash' function which returns
   * a cancelled tx detail which does not have a txHash associated.
   */
  const getUrlAfterConfirmations = useCallback(
    async (safeTxHash: string) => {
      if (!sdk) return ''

      const getDetails = () => {
        return sdk.txs.getBySafeTxHash(safeTxHash)
      }
      const untilFinished = (txDetails: TransactionDetails) => {
        return txDetails.txStatus !== TransactionStatus.AWAITING_CONFIRMATIONS
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const details = await retry(safeTxHash, getDetails, untilFinished)
      if (details?.txStatus === TransactionStatus.SUCCESS && details?.txHash) {
        return getGnosisExplorerUrl(details.txHash)
      }
      return getGnosisSafeUrl(safeAddress)
    },
    [sdk, safeAddress],
  )

  const execute = useCallback(
    async (txs: BaseTransaction[], onSuccess?: () => void, onError?: () => void) => {
      if (!sdk) {
        console.error('Transaction failed, there is no sdk')
        return null
      }

      try {
        console.info('Please sign the transaction.')
        const txResponse = await sdk.txs.send({
          txs,
        })
        const safeTxHash = txResponse.safeTxHash
        notify({ type: WAITING_TYPE, message: 'waiting for approval' })
        const txURL = await getUrlAfterConfirmations(safeTxHash)
        notify({ type: SUCCESS_TYPE, explorerUrl: txURL })
        if (onSuccess) onSuccess()
        return safeTxHash
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
    [sdk, getUrlAfterConfirmations],
  )

  return useMemo(() => {
    return { execute }
  }, [execute])
}
