import { getAddress } from '@ethersproject/address'
import useSWR from 'swr'

import { GROUP_MEMBERS } from '@/src/queries/groupMembers'
import { CirclesGardenUser, getUsers } from '@/src/utils/circlesGardenAPI'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupMembers,
  GroupMembersVariables,
  GroupMembers_safeGroupMembers,
} from '@/types/subgraph/__generated__/GroupMembers'

export type GroupMember = CirclesGardenUser

const transformToGroupMembers = async (safeGroupmembers: GroupMembers_safeGroupMembers[]) => {
  const safeAddresses = safeGroupmembers.map((safeGroupMember) =>
    getAddress(safeGroupMember.safe.id),
  )
  return getUsers(safeAddresses)
}

export const fetchGroupMembers = async (query: GroupMembersVariables['where']) => {
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        ...query, // @TODO we might want to double check what we are sending as query object
      },
    },
  )

  return transformToGroupMembers(safeGroupMembers)
}

export const useGroupMembersByGroupId = (groupId?: string) => {
  const { data, error, mutate } = useSWR(['groupMembersByGroupId', groupId], () => {
    if (!groupId) return []
    return fetchGroupMembers({ group: groupId })
  })

  return { groupMembers: data ?? [], error, refetch: mutate }
}

export const useGroupMemberBySafeId = (safeId?: string) => {
  const { data, error, mutate } = useSWR(['groupMemberBySafeId', safeId], () => {
    if (!safeId) return undefined
    return fetchGroupMembers({ safe: safeId })
  })

  return { belongedGroups: data ?? [], error, refetch: mutate }
}

export const useGroupMemberById = (safeId?: string, groupId?: string) => {
  const { data, error, mutate } = useSWR(['groupMemberById', safeId, groupId], () => {
    return fetchGroupMembers({ safe: safeId, group: groupId })
  })
  const member = data && data[0]
  return { member, error, refetch: mutate }
}
