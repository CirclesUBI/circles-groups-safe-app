import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { circlesToTC } from '@/src/utils/circleConversor'
import formatNumber, { stringToValidFloat } from '@/src/utils/formatNumber'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
  GroupCurrencyTokens_groupCurrencyTokens,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'
import {
  GroupCurrencyToken_orderBy,
  OrderDirection,
} from '@/types/subgraph/__generated__/globalTypes'

export type GroupCurrencyToken = {
  id: string
  name: string
  symbol: string
  owner: string
  treasury: string
  hub: string
  mintFeePerThousand: number
  minted: string
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
    mintFeePerThousand: stringToValidFloat(group.mintFeePerThousand ?? '') / 10,
    minted: formatNumber(circlesToTC(group.minted)) ?? '0',
    members: group.members,
  }
}

export const fetchGroupCurrencyTokens = async (variables?: GroupCurrencyTokensVariables) => {
  const { groupCurrencyTokens } = await graphqlFetcher<
    GroupCurrencyTokens,
    GroupCurrencyTokensVariables
  >(GROUP_CURRENCY_TOKEN_QUERY, {
    ...variables,
    orderBy: variables?.orderBy ?? GroupCurrencyToken_orderBy.name,
  })
  return groupCurrencyTokens.map(transformToGroupCurrencyToken)
}

export const useGroupCurrencyTokens = (
  orderBy?: GroupCurrencyToken_orderBy,
  orderDirection?: OrderDirection,
) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokens'], () =>
    fetchGroupCurrencyTokens({
      orderBy,
      orderDirection,
    }),
  )
  return { groups: data ?? [], error, refetch: mutate, loading: !error && !data }
}

export const useGroupCurrencyTokensById = (
  groupId: string,
  orderBy?: GroupCurrencyToken_orderBy,
  orderDirection?: OrderDirection,
) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokensById', groupId], () =>
    fetchGroupCurrencyTokens({
      where: { id: groupId.toLowerCase() },
      orderBy,
      orderDirection,
    }),
  )
  return { group: data?.[0], error, refetch: mutate, loading: !error && !data }
}

export const useGroupCurrencyTokensByOwner = (
  owner: string,
  orderBy?: GroupCurrencyToken_orderBy,
  orderDirection?: OrderDirection,
) => {
  const { data, error, mutate } = useSWR(['groupCurrencyTokensByOwner', owner], () => {
    if (!owner) return []
    return fetchGroupCurrencyTokens({
      where: { owner: owner.toLowerCase() },
      orderBy,
      orderDirection,
    })
  })
  return { groups: data ?? [], error, refetch: mutate, loading: !error && !data }
}
