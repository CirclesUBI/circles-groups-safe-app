import { ZERO_ADDRESS } from '../constants/misc'
import {
  UserNotification,
  UserNotificationHubTransfer,
  UserNotificationOwnership,
  UserNotificationTransfer,
  UserNotificationTrust,
} from '../hooks/subgraph/useNotifications'
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
      return value
    }
  }

  return Date.now().toString()
}

export const setLastSeen = (lastSeen: string) => {
  setItem(LAST_SEEN_NAME, lastSeen)
}

export const removeLastSeen = () => {
  removeItem(LAST_SEEN_NAME)
}

export const updateLastSeen = () => {
  const currentDateSeconds = new Date().getTime()
  const timestamp = Math.round(currentDateSeconds / 1000)
  const newTs = String(timestamp)
  setLastSeen(String(timestamp))
  return newTs
}

export type ActivityMessage = {
  addressActor: string
  addressOrigin: string
  addressTarget: string
  data: UserNotification
  messageId: string
  date: string
}

export const formatActivityMessage = (
  data: UserNotification,
  safeAddress: string,
): ActivityMessage => {
  let addressActor
  let addressOrigin
  let addressTarget
  let messageId
  let _data

  if (data.type === NotificationType.TRANSFER) {
    _data = data as UserNotificationTransfer
    addressOrigin = _data.transfer.from
    addressTarget = _data.transfer.to
    if (_data.transfer.from === ZERO_ADDRESS) {
      // I've received Circles from the Hub (UBI)
      messageId = 'ReceivedUBI'
    } else {
      messageId = 'SentUBI'
    }
  } else if (data.type === NotificationType.HUB_TRANSFER) {
    _data = data as UserNotificationHubTransfer
    addressOrigin = _data.hubTransfer.from
    addressTarget = _data.hubTransfer.to
    if (_data.hubTransfer.to === safeAddress) {
      // I've received Circles from someone
      messageId = 'ReceivedCircles'
      addressActor = _data.hubTransfer.from
    } else {
      // I've sent Circles to someone
      messageId = 'SentCircles'
      addressActor = _data.hubTransfer.to
    }
  } else if (data.type === NotificationType.OWNERSHIP) {
    _data = data as UserNotificationOwnership
    addressOrigin = safeAddress
    if (_data.ownership.adds) {
      addressTarget = _data.ownership.adds
      messageId = 'AddedToSafe'
    } else {
      addressTarget = _data.ownership.removes
      messageId = 'RemovedFromSafe'
    }
  } else if (data.type === NotificationType.TRUST) {
    _data = data as UserNotificationTrust
    messageId = 'TrustCircleUser'
    addressOrigin = safeAddress
    addressTarget = _data.trust.user
  }

  if (!messageId) {
    messageId = `Unknown activity type: ${data.type}`
  }

  return {
    addressActor: addressActor ?? '',
    addressOrigin: addressOrigin ?? '',
    addressTarget: addressTarget ?? '',
    data,
    messageId,
    date: new Date(data.time).toString(), // @TODO remember to parse date correctly
  }
}
