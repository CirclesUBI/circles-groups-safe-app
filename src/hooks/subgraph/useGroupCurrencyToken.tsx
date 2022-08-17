import useSWR from 'swr'

import { GROUP_CURRENCY_TOKEN_QUERY } from '@/src/queries/groupCurrencyToken'
import { circlesToTC } from '@/src/utils/circleConversor'
import formatNumber, { stringToValidFloat } from '@/src/utils/formatNumber'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupCurrencyTokens,
  GroupCurrencyTokensVariables,
  GroupCurrencyTokens_groupCurrencyTokens,
  GroupCurrencyTokens_groupCurrencyTokens_members,
} from '@/types/subgraph/__generated__/GroupCurrencyTokens'
import { GroupCurrencyToken_orderBy } from '@/types/subgraph/__generated__/globalTypes'

export type GroupSafeMember = {
  id: string // safeAddress + groupAddress
  safeAddress: string
}

export type GroupCurrencyToken = {
  id: string
  name: string
  symbol: string
  owner: string
  treasury: string
  hub: string
  mintFeePerThousand: number
  minted: string
  members: Array<GroupSafeMember> // TODO define Member's Group type
  onlyTrustedCanMint: boolean
  onlyOwnerCanMint: boolean
  allowedMintingUser: AllowedMintingUser
}

export enum AllowedMintingUser {
  all = 'ALL',
  trusted = 'TRUSTED',
  owners = 'OWNERS',
}

export const getAllowedMintingUser = (
  group: GroupCurrencyToken | GroupCurrencyTokens_groupCurrencyTokens,
) => {
  if (group.onlyOwnerCanMint) return AllowedMintingUser.owners
  if (group.onlyTrustedCanMint) return AllowedMintingUser.trusted
  return AllowedMintingUser.all
}

export const isUserAllowedToMint = (safeAddress: string, group: GroupCurrencyToken) => {
  if (AllowedMintingUser.all) {
    return true
  }
  if (group?.allowedMintingUser === AllowedMintingUser.owners) {
    const isOwnerUser = group?.owner.toLowerCase() === safeAddress.toLowerCase()
    return isOwnerUser
  }
  /**
   * @description a trusted user is an user who is member of the group
   * another way to verify this, is using the hub method trust!
   */
  if (group?.allowedMintingUser === AllowedMintingUser.trusted) {
    const isTrustedUser = group?.members.some(
      (member) => member.safeAddress.toLowerCase() === safeAddress.toLowerCase(),
    )
    return isTrustedUser
  }
  return false
}

const transformGroupSafeMember = (
  gctMember: GroupCurrencyTokens_groupCurrencyTokens_members,
): GroupSafeMember => {
  return {
    id: gctMember.id,
    safeAddress: gctMember.safe.id,
  }
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
    members: group.members.map(transformGroupSafeMember),
    onlyTrustedCanMint: group.onlyTrustedCanMint ?? false,
    onlyOwnerCanMint: group.onlyOwnerCanMint ?? false,
    allowedMintingUser: getAllowedMintingUser(group),
  }
}

export const fetchGroupCurrencyTokens = async (variables?: GroupCurrencyTokensVariables) => {
  const { groupCurrencyTokens } = await graphqlFetcher<
    GroupCurrencyTokens,
    GroupCurrencyTokensVariables
  >(GROUP_CURRENCY_TOKEN_QUERY, {
    where: variables?.where,
    orderBy: GroupCurrencyToken_orderBy.name,
  })
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
