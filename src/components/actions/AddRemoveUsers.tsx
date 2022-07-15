import React, { useState } from 'react'

import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { allUsers } from '@/src/constants/allUsers'
import { users } from '@/src/constants/users'

interface groupMember {
  id: number
  username: string
  safeAddress: string
  avatarUrl?: string
}

interface Props {
  notification: { opened: boolean; action: string; user: number }
  cancelAction: () => void
  groupMembers: groupMember[]
}

export const AddRemoveUsers: React.FC<Props> = ({ cancelAction, groupMembers, notification }) => {
  const [usersGroup, setUsers] = useState(users)
  const [usersAll, setUsersAll] = useState(allUsers)

  const handleRemove = (userID: number) => {
    // add user to all users list
    const moveUser = usersGroup.filter((user) => user.id == userID)
    setUsersAll((usersAll) => [moveUser[0], ...usersAll])

    // remove item from my group list
    const newList = usersGroup.filter((user) => user.id !== userID)
    setUsers(newList)
  }

  const handleAdd = (userID: number) => {
    // remove user all users list
    const newAllList = usersAll.filter((user) => user.id !== userID)
    setUsersAll(newAllList)

    // add user to my group list
    const newUser = usersAll.filter((user) => user.id == userID)
    setUsers((usersGroup) => [newUser[0], ...usersGroup])
  }

  const getUserNameAllList = (userID: number) => {
    // get user name from all members list
    const getUser = allUsers.filter((user) => user.id == userID)
    const getUserName = getUser[0].name
    return getUserName
  }

  const getUserNameMyGroupList = (userID: number) => {
    // get user name from group list
    const user = groupMembers.find((user) => user.id === userID)
    return user?.username ?? ''
  }

  return (
    <>
      {notification.opened && (
        <AnimatePresence>
          {notification.action == 'delete' ? (
            <AlertMessage
              confirmAction={() => handleRemove(notification.user)}
              onCloseAlert={cancelAction}
              text={
                'Are you sure you want to remove ' +
                getUserNameMyGroupList(notification.user) +
                ' from your group?'
              }
            />
          ) : (
            <AlertMessage
              confirmAction={() => handleAdd(notification.user)}
              onCloseAlert={cancelAction}
              text={
                'Are you sure you want to add ' +
                getUserNameAllList(notification.user) +
                ' to your group?'
              }
            />
          )}
        </AnimatePresence>
      )}
    </>
  )
}
