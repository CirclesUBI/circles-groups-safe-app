import { UserNotification } from '../hooks/subgraph/useNotifications'
import { circlesToTC } from './circleConversor'
import formatNumber from './formatNumber'
import { getItem, hasItem, isAvailable, removeItem, setItem } from './storage'
import { NotificationType } from '@/types/subgraph/__generated__/globalTypes'

const LAST_SEEN_NAME = 'lastSeen'

export const hasLastSeen = () => {
  return hasItem(LAST_SEEN_NAME)
}

export const getLastSeen = () => {
  if (isAvailable() && hasLastSeen()) {
    const value = getItem(LAST_SEEN_NAME)
    if (value) {
      return parseInt(value)
    }
  }

  return null
}

export const setLastSeen = (lastSeen: string) => {
  setItem(LAST_SEEN_NAME, lastSeen)
}

export const removeLastSeen = () => {
  removeItem(LAST_SEEN_NAME)
}

export const updateLastSeen = (ts: number) => {
  setLastSeen(String(ts))
}

export const getUnseenNotifications = (notifications: UserNotification[]) => {
  const lastSeen = getLastSeen()
  if (lastSeen) {
    return notifications.filter((notification) => notification.time > lastSeen)
  }
  return notifications
}

export type ActivityMessage = {
  message: string
  notification: UserNotification
  date: string
}

// @TODO notification is not receiving the group name in all cases
export const formatActivityMessage = (notification: UserNotification): ActivityMessage => {
  let message = ''

  if (notification.type === NotificationType.GROUP_CREATION && notification.groupCreation) {
    const groupName = notification.groupCreation.name
    message = `You have created the ${groupName} group`
  }
  if (notification.type === NotificationType.GROUP_ADD_MEMBER && notification.groupAddMember) {
    const groupName = notification.groupAddMember.group
    message = `You are now member of ${groupName} group`
  }
  if (
    notification.type === NotificationType.GROUP_REMOVE_MEMBER &&
    notification.groupRemoveMember
  ) {
    const groupName = notification.groupRemoveMember.group
    message = `You are no longer member of ${groupName} group`
  }
  if (notification.type === NotificationType.GROUP_MINT && notification.groupMint) {
    const groupName = notification.groupMint.group
    const tc = formatNumber(circlesToTC(notification.groupMint.amount))
    message = `You have minted ${tc} CRC on ${groupName} group`
  }
  if (!message) {
    message = `Unknown activity type: ${notification.type}`
  }

  const date: Date = new Date(notification.time)

  const day = date.getDay()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  console.log('Hours = ' + date.getHours())
  console.log('Minutes = ' + date.getMinutes())

  const isToday = (someDate: Date) => {
    const today = new Date()
    if (today.toDateString() === someDate.toDateString()) {
      return true
    }
    return false
  }

  let activityDate
  if (isToday(date)) {
    activityDate = hours + ':' + minutes
  } else {
    activityDate = day + ' ' + month + ', ' + year
  }

  return {
    notification,
    message,
    date: activityDate,
  }
}
