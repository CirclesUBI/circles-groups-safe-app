import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'

export type GroupCurrencyToken = {
  id: string
  name: string
  members: Array<any> // TODO define Member's Group type
}

export type GroupRef = { id: string }

const getGroupQuery = (group?: GroupRef) => {
  return group
    ? {
        where: {
          id: group.id,
        },
      }
    : {}
}

export const fetchGroupCurrencyTokens = async (group?: GroupRef) => {
  const query = getGroupQuery(group)
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
