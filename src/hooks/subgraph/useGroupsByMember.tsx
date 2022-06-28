import useSWR from 'swr'

import {
  GroupCurrencyToken,
  fetchGroupCurrencyTokens,
} from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { GROUP_MEMBERS } from '@/src/queries/groupMembers'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupMembers,
  GroupMembersVariables,
  GroupMembers_safeGroupMembers,
} from '@/types/subgraph/__generated__/GroupMembers'

const getGroupId = (safeGroupMembers: GroupMembers_safeGroupMembers[]) => {
  return safeGroupMembers[0].group.id
}

export const fetchGroups = async (safeAddress: string) => {
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        safe: safeAddress,
      },
    },
  )

  if (safeGroupMembers.length == 0) return []
  const groupId = getGroupId(safeGroupMembers)

  return fetchGroupCurrencyTokens({ where: { id_in: [groupId] } })
}

export const useGroupsByMember = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens', safeAddress], () => {
    if (!safeAddress) return []
    return fetchGroups(safeAddress)
  })

  return { groupsByMember: data ?? [], error, refetch: mutate, loading: !error && !data }
}
