import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'

export type GroupCurrencyToken = {
  name: string
  members: Array<any> // TODO define Member's Group type
}

export const fetchGroupCurrencyTokens = async () => {
  const { groupCurrencyTokens } = await graphqlFetcher<
    GroupCurrencyTokens,
    GroupCurrencyTokensVariables
  >(GROUP_CURRENCY_TOKEN_QUERY)
  const groups = groupCurrencyTokens.map((group) => ({
    name: group.name,
    members: group.members,
  }))
  return groups as GroupCurrencyToken[]
}

export const useGroupCurrencyTokens = () => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens'], () => fetchGroupCurrencyTokens())
  return { groups: data ?? [], error, refetch: mutate, loading: !error && !data }
}
