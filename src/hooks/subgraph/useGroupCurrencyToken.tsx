import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'

export const fetchGroupCurrencyTokens = () =>
  graphqlFetcher<GroupCurrencyTokens, GroupCurrencyTokensVariables>(GROUP_CURRENCY_TOKEN_QUERY)

export const useGroupCurrencyTokens = () => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens'], () => fetchGroupCurrencyTokens())
  return { groupCurrencyTokens: data, error, refetch: mutate, loading: !error && !data }
}
