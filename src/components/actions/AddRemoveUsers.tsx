import React from 'react'

import { AnimatePresence } from 'framer-motion'

import { ActionAddDelete } from '../assets/AddDeleteButton'
import { AlertMessage } from '@/src/components/assets/AlertMessage'

export type AddRemoveUserNotification = {
  opened: boolean
  action: ActionAddDelete
  username: string
}

interface Props {
  notification: AddRemoveUserNotification
  cancelAction: () => void
  onAddUserAction: () => void
  onRemoveUserAction: () => void
}

export const AddRemoveUsers: React.FC<Props> = ({
  cancelAction,
  notification,
  onAddUserAction,
  onRemoveUserAction,
}) => {
  const REMOVE_USER_TEXT = `Are you sure you want to remove ${notification.username} from your group?`
  const ADD_USER_TEXT = `Are you sure you want to add ${notification.username} to your group?`
  const alertAction = notification.action === 'delete' ? onRemoveUserAction : onAddUserAction
  const alertText = notification.action === 'delete' ? REMOVE_USER_TEXT : ADD_USER_TEXT
  return (
    <>
      {notification.opened && (
        <AnimatePresence>
          <AlertMessage confirmAction={alertAction} onCloseAlert={cancelAction} text={alertText} />
        </AnimatePresence>
      )}
    </>
  )
}
