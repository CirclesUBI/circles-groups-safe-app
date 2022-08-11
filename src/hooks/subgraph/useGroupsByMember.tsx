import useSWR from 'swr'

import { fetchGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { GROUP_MEMBERS } from '@/src/queries/groupMembers'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import { GroupMembers, GroupMembersVariables } from '@/types/subgraph/__generated__/GroupMembers'

export const fetchGroups = async (safeAddress: string) => {
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        safe: safeAddress.toLowerCase(),
      },
    },
  )
  if (safeGroupMembers.length == 0) return []
  const groupIds = safeGroupMembers.map((member) => member.group.id)
  return fetchGroupCurrencyTokens({ where: { id_in: groupIds } })
}

export const useGroupsByMember = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['useGroupsByMember', safeAddress], () => {
    if (!safeAddress) return []
    return fetchGroups(safeAddress)
  })

  return { groupsByMember: data ?? [], error, refetch: mutate, loading: !error && !data }
}
