import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'
import { GroupCurrencyToken_filter } from '@/types/subgraph/__generated__/globalTypes'

export type GroupCurrencyToken = {
  id: string
  name: string
  members: Array<any> // TODO define Member's Group type
}

const getGroupQuery = (groupId?: string) => {
  const where = {} as GroupCurrencyToken_filter
  if (groupId) {
    where['id_in'] = [groupId]
  }
  return { where }
}

export const fetchGroupCurrencyTokens = async (groupId?: string) => {
  const query = getGroupQuery(groupId)
  const { groupCurrencyTokens } = await graphqlFetcher<
    GroupCurrencyTokens,
    GroupCurrencyTokensVariables
  >(GROUP_CURRENCY_TOKEN_QUERY, query)
  const groups = groupCurrencyTokens.map((group) => ({
    ...group,
  }))
  return groups as GroupCurrencyToken[]
}

export const useGroupCurrencyTokens = () => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens'], () => fetchGroupCurrencyTokens())
  return { groups: data ?? [], error, refetch: mutate, loading: !error && !data }
}
