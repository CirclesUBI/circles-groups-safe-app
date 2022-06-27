import useSWR from 'swr'

import {
  GroupCurrencyToken,
  GroupRef,
  fetchGroupCurrencyTokens,
} from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { GROUP_MEMBERS } from '@/src/queries/groupMembers'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import { GroupMembers, GroupMembersVariables } from '@/types/subgraph/__generated__/GroupMembers'

export const fetchGroups = async (safeAddress: string) => {
  console.log({ safeAddress })
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        safe: safeAddress,
      },
    },
  )

  if (safeGroupMembers.length == 0) return [] as GroupCurrencyToken[]
  const groups = safeGroupMembers.map((member) => ({
    id: member.group.id,
  }))

  return (await fetchGroupCurrencyTokens(groups[0] as GroupRef)) as GroupCurrencyToken[]
}

export const useGroupsByMember = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens', safeAddress], () => {
    if (!safeAddress) return []
    return fetchGroups(safeAddress)
  })

  return { groupsByMember: data ?? [], error, refetch: mutate, loading: !error && !data }
}
