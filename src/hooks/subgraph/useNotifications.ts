import useSWR from 'swr'

import { NOTIFICATIONS } from '@/src/queries/notifications'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  Notifications,
  NotificationsVariables,
  Notifications_notifications,
  Notifications_notifications_hubTransfer,
  Notifications_notifications_ownership,
  Notifications_notifications_transfer,
  Notifications_notifications_trust,
} from '@/types/subgraph/__generated__/Notifications'
import {
  NotificationType,
  Notification_orderBy,
  OrderDirection,
} from '@/types/subgraph/__generated__/globalTypes'

export type UserNotificationTrustData = {
  user: string
  canSendTo: string
  limitPercentage: string
}

export type UserNotificationTransferData = {
  from: string
  to: string
  amount: string
}

export type UserNotificationOwnershipData = {
  adds?: string
  removes?: string
}

export type UserNotificationBase = {
  id: string
  transactionHash: string
  safeAddress: string
  type: NotificationType
  time: number
}

export type UserNotificationTrust = UserNotificationBase & {
  trust: UserNotificationTrustData
}

export type UserNotificationTransfer = UserNotificationBase & {
  transfer: UserNotificationTransferData
}

export type UserNotificationHubTransfer = UserNotificationBase & {
  hubTransfer: UserNotificationTransferData
}

export type UserNotificationOwnership = UserNotificationBase & {
  ownership: UserNotificationOwnershipData
}

export type UserNotification =
  | UserNotificationTrust
  | UserNotificationTransfer
  | UserNotificationHubTransfer
  | UserNotificationOwnership

const transformToTrust = (
  trust: Notifications_notifications_trust | null,
): UserNotificationTrustData => {
  return {
    user: trust?.user ?? '',
    canSendTo: trust?.canSendTo ?? '',
    limitPercentage: trust?.limitPercentage ?? '',
  }
}

const transformToTransfer = (
  transfer: Notifications_notifications_transfer | Notifications_notifications_hubTransfer | null,
): UserNotificationTransferData => {
  return {
    from: transfer?.from ?? '',
    to: transfer?.to ?? '',
    amount: transfer?.amount ?? '',
  }
}

const transformToOwnership = (
  ownership: Notifications_notifications_ownership | null,
): UserNotificationOwnershipData => {
  return {
    adds: ownership?.adds ?? '',
    removes: ownership?.adds ?? '',
  }
}

const transformToUserNotification = (
  notification: Notifications_notifications,
): UserNotification | null => {
  const _notification = {
    id: notification.id,
    transactionHash: notification.transactionHash,
    safeAddress: notification.safeAddress,
    type: notification.type,
    time: parseInt(notification.time) * 1000,
  }
  if (notification.type === NotificationType.TRUST) {
    return {
      ..._notification,
      trust: transformToTrust(notification.trust),
    } as UserNotificationTrust
  }
  if (notification.type === NotificationType.TRANSFER) {
    return {
      ..._notification,
      transfer: transformToTransfer(notification.transfer),
    } as UserNotificationTransfer
  }
  if (notification.type === NotificationType.HUB_TRANSFER) {
    return {
      ..._notification,
      hubTransfer: transformToTransfer(notification.hubTransfer),
    } as UserNotificationHubTransfer
  }
  if (notification.type === NotificationType.OWNERSHIP) {
    return {
      ..._notification,
      ownership: transformToOwnership(notification.ownership),
    } as UserNotificationOwnership
  }
  return null
}

export const fetchNotifications = async (safeAddress: string) => {
  const { notifications } = await graphqlFetcher<Notifications, NotificationsVariables>(
    NOTIFICATIONS,
    {
      where: {
        safe: safeAddress.toLowerCase(),
      },
      orderBy: Notification_orderBy.time,
      orderDirection: OrderDirection.desc,
    },
  )
  return notifications.map(transformToUserNotification).filter(Boolean) as UserNotification[]
}

export const useNotificationsByUser = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['useNotificationsByUser', safeAddress], () => {
    if (!safeAddress) return []
    return fetchNotifications(safeAddress)
  })

  return { notifications: data ?? [], error, refetch: mutate, loading: !error && !data }
}
