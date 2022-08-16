import useSWR from 'swr'

import { NOTIFICATIONS } from '@/src/queries/notifications'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  Notifications,
  NotificationsVariables,
  Notifications_notifications,
} from '@/types/subgraph/__generated__/Notifications'
import {
  NotificationType,
  Notification_orderBy,
  OrderDirection,
} from '@/types/subgraph/__generated__/globalTypes'

export type EventTrustData = {
  user: string
  canSendTo: string
  limitPercentage: string
}

export type EventTransferData = {
  from: string
  to: string
  amount: string
}

export type EventOwnershipData = {
  adds?: string
  removes?: string
}

export type EventGroupCreationData = {
  groupAddress: string
  groupName: string
  creatorAddress: string
}

export type EventGroupMintData = {
  receiver: string
  amount: string
  mintFee: string
  groupAddress: string
  groupName: string
}

export type EventGroupMemberUpdateData = {
  userAddress: string
  groupAddress: string
  groupName: string
}

export type UserNotification = {
  id: string
  transactionHash: string
  safeAddress: string
  type: NotificationType
  time: number
  trust?: EventTrustData
  transfer?: EventTransferData
  hubTransfer?: EventTransferData
  ownership?: EventOwnershipData
  groupCreation?: EventGroupCreationData
  groupMint?: EventGroupMintData
  groupAddMember?: EventGroupMemberUpdateData
  groupRemoveMember?: EventGroupMemberUpdateData
}

const transformToTrust = (notification: Notifications_notifications): EventTrustData => {
  return {
    user: notification.trust?.user ?? '',
    canSendTo: notification.trust?.canSendTo ?? '',
    limitPercentage: notification.trust?.limitPercentage ?? '',
  }
}

const transformToTransfer = (notification: Notifications_notifications): EventTransferData => {
  return {
    from: notification.transfer?.from ?? '',
    to: notification.transfer?.to ?? '',
    amount: notification.transfer?.amount ?? '',
  }
}

const transformToOwnership = (notification: Notifications_notifications): EventOwnershipData => {
  return {
    adds: notification.ownership?.adds ?? '',
    removes: notification.ownership?.removes ?? '',
  }
}

const transformGroupCreation = (
  notification: Notifications_notifications,
): EventGroupCreationData => {
  return {
    creatorAddress: notification.groupCreation?.creator ?? '',
    groupAddress: notification.groupCreation?.group?.id ?? '',
    groupName: notification.groupCreation?.group?.name ?? '',
  }
}
const transformGroupMint = (notification: Notifications_notifications): EventGroupMintData => {
  return {
    receiver: notification.groupMint?.receiver ?? '',
    amount: notification.groupMint?.amount ?? '',
    mintFee: notification.groupMint?.mintFee ?? '',
    groupAddress: notification.groupMint?.group?.id ?? '',
    groupName: notification.groupMint?.group?.name ?? '',
  }
}
const transformGroupMemberUpdate = (
  notification: Notifications_notifications,
): EventGroupMemberUpdateData => {
  return {
    groupAddress: notification.groupAddMember?.group?.id ?? '',
    groupName: notification.groupAddMember?.group?.name ?? '',
    userAddress: notification.groupAddMember?.user?.id ?? '',
  }
}

// @TODO keep only group notifications
const VALID_NOTIFICATION_TYPES = [
  NotificationType.GROUP_CREATION,
  NotificationType.GROUP_ADD_MEMBER,
  NotificationType.GROUP_REMOVE_MEMBER,
  NotificationType.GROUP_MINT,
]
const transformToUserNotification = (
  notification: Notifications_notifications,
): UserNotification | null => {
  if (!VALID_NOTIFICATION_TYPES.includes(notification.type)) return null
  return {
    id: notification.id,
    transactionHash: notification.transactionHash,
    safeAddress: notification.safeAddress,
    type: notification.type,
    time: parseInt(notification.time) * 1000, // transform to milliseconds
    trust: transformToTrust(notification),
    transfer: transformToTransfer(notification),
    hubTransfer: transformToTransfer(notification),
    ownership: transformToOwnership(notification),
    groupCreation: transformGroupCreation(notification),
    groupMint: transformGroupMint(notification),
    groupAddMember: transformGroupMemberUpdate(notification),
    groupRemoveMember: transformGroupMemberUpdate(notification),
  }
}

export const fetchNotifications = async (safeAddress: string) => {
  const { notifications } = await graphqlFetcher<Notifications, NotificationsVariables>(
    NOTIFICATIONS,
    {
      where: {
        safe: safeAddress.toLowerCase(),
        type_in: VALID_NOTIFICATION_TYPES, // @todo: we only show notifications related to groups
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
