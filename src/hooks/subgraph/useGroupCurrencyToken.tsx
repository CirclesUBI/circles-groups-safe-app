import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
  GroupCurrencyTokens_groupCurrencyTokens,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'

export type GroupCurrencyToken = {
  id: string
  name: string
  symbol: string
  owner: string
  treasury: string
  hub: string
  mintFeePerThousand: string
  members: Array<any> // TODO define Member's Group type
}

const transformToGroupCurrencyToken = (
  group: GroupCurrencyTokens_groupCurrencyTokens,
): GroupCurrencyToken => {
  return {
    id: group.id,
    name: group.name ?? '',
    symbol: group.symbol ?? '',
    owner: group.owner ?? '',
    treasury: group.treasury ?? '',
    hub: group.hub ?? '',
    mintFeePerThousand: group.mintFeePerThousand ?? '',
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

export const useGroupCurrencyTokensById = (groupId: string) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens', groupId], () =>
    fetchGroupCurrencyTokens({ where: { id: groupId } }),
  )
  return { group: data?.[0], error, refetch: mutate, loading: !error && !data }
}

export const useGroupCurrencyTokensByOwner = (owner: string) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokensByOwner', owner], () => {
    if (!owner) return []
    return fetchGroupCurrencyTokens({ where: { owner: owner.toLowerCase() } })
  })
  return { groups: data ?? [], error, refetch: mutate, loading: !error && !data }
}
