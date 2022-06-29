import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
  GroupCurrencyTokens_groupCurrencyTokens,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'
import { GroupCurrencyToken_filter } from '@/types/subgraph/__generated__/globalTypes'

export type GroupCurrencyToken = {
  id: string
  name: string
  members: Array<any> // TODO define Member's Group type
}

const transformToGroupCurrencyToken = (
  group: GroupCurrencyTokens_groupCurrencyTokens,
): GroupCurrencyToken => {
  return {
    id: group.id,
    name: group.name ?? '',
    members: group.members,
  }
}

export const fetchGroupCurrencyTokens = async (where?: GroupCurrencyTokensVariables) => {
  const { groupCurrencyTokens } = await graphqlFetcher<
    GroupCurrencyTokens,
    GroupCurrencyTokensVariables
  >(GROUP_CURRENCY_TOKEN_QUERY, where)
  return groupCurrencyTokens.map(transformToGroupCurrencyToken)
}

export const useGroupCurrencyTokens = () => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens'], () => fetchGroupCurrencyTokens())
  return { groups: data ?? [], error, refetch: mutate, loading: !error && !data }
}

export const useGroupCurrencyTokensByIds = (groupIds: string[]) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokensByIds', groupIds.join()], () =>
    fetchGroupCurrencyTokens({ where: { id_in: groupIds } }),
  )
  return { groups: data ?? [], error, refetch: mutate }
}

export const useGroupCurrencyTokensById = (groupId: string) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokensByIds', groupId], () =>
    fetchGroupCurrencyTokens({ where: { id: groupId } }),
  )
  return { group: data?.[0], error, refetch: mutate }
}
