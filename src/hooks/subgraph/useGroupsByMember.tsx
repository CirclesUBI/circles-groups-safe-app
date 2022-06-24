import useSWR from 'swr'

import { GroupCurrencyToken } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { GROUP_MEMBERS } from '@/src/queries/groupMembers'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'
import { GroupMembers, GroupMembersVariables } from '@/types/subgraph/__generated__/GroupMembers'

export const fetchGroups = async (memberId: string) => {
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        id: memberId,
      },
    },
  )

  const groups = safeGroupMembers.map((member) => ({
    id: member.group.id,
  }))

  const { groupCurrencyTokens } = await graphqlFetcher<
    GroupCurrencyTokens,
    GroupCurrencyTokensVariables
  >(GROUP_CURRENCY_TOKEN_QUERY, {
    where: {
      id: groups[0].id,
    },
  })

  const memberGroups = groupCurrencyTokens.map((group) => ({
    id: group.id,
    name: group.name,
    members: group.members,
  }))
  return memberGroups as GroupCurrencyToken[]
}

export const useGroupsByMember = (memberId?: string) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens', memberId], () => {
    if (!memberId) return []
    return fetchGroups(memberId)
  })

  return { memberGroups: data ?? [], error, refetch: mutate, loading: !error && !data }
}
