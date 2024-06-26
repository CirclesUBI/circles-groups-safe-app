import ms from 'ms'
import { Toast, Toaster, toast } from 'react-hot-toast'

import { Failed as FailedIcon } from '@/src/components/assets/Failed'
import { Loading as LoadingIcon } from '@/src/components/assets/Loading'
import { Success as SuccessIcon } from '@/src/components/assets/Success'
import { ToastComponent } from '@/src/components/toast/ToastComponent'
import { FAILED_TYPE, SUCCESS_TYPE, WAITING_TYPE } from '@/src/components/toast/types'

type ToastType = typeof FAILED_TYPE | typeof SUCCESS_TYPE | typeof WAITING_TYPE

type ToastComponentProps = {
  t: Toast
  explorerUrl?: string
  message?: string
}

const VerifyNetworkText = 'Click to verify on GnosisScan'

const ToastTypes = {
  [WAITING_TYPE]: ({ explorerUrl, message, t }: ToastComponentProps) => (
    <ToastComponent
      icon={<LoadingIcon />}
      link={explorerUrl ? { url: explorerUrl, text: VerifyNetworkText } : undefined}
      message={message ? message : undefined}
      t={t}
      title="Transaction Sent"
      toastStyle="waiting"
    />
  ),
  [FAILED_TYPE]: ({ explorerUrl, message, t }: ToastComponentProps) => (
    <ToastComponent
      icon={<FailedIcon />}
      link={explorerUrl ? { url: explorerUrl, text: VerifyNetworkText } : undefined}
      message={message ? message : undefined}
      t={t}
      title="Transaction Failed"
      toastStyle="failed"
    />
  ),
  [SUCCESS_TYPE]: ({ explorerUrl, message, t }: ToastComponentProps) => (
    <ToastComponent
      icon={<SuccessIcon />}
      link={explorerUrl ? { url: explorerUrl, text: VerifyNetworkText } : undefined}
      message={message ? message : undefined}
      t={t}
      title="Transaction confirmed"
      toastStyle="success"
    />
  ),
}

const notify = ({
  explorerUrl,
  message,
  type,
}: {
  explorerUrl?: string
  message?: string
  type: ToastType
}) => toast.custom((t: Toast) => ToastTypes[type]({ t, explorerUrl, message }))

const Toast = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      duration: ms('8s'),
    }}
  />
)

export default Toast
export { notify }
