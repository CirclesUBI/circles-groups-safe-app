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
  const users = await getUsers(safeAddresses)

  return users
}

export const fetchGroupMembers = async (groupId: string) => {
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        group: groupId,
      },
    },
  )

  return transformToGroupMembers(safeGroupMembers)
}

export const useGroupMembers = (groupId?: string) => {
  const { data, error, mutate } = useSWR(['groupMembers', groupId], () => {
    if (!groupId) return []
    return fetchGroupMembers(groupId)
  })

  return { groupMembers: data ?? [], error, refetch: mutate }
}
