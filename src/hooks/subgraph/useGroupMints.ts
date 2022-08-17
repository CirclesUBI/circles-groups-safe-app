import useSWR from 'swr'

import { GROUP_MINTS } from '@/src/queries/groupMints'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupMints,
  GroupMintsVariables,
  GroupMints_groupMints,
} from '@/types/subgraph/__generated__/GroupMints'

export type GroupMint = {
  amount: string
  receiver: string
  groupAddress: string
  groupName: string
}

const transformToGroupMint = (groupMint: GroupMints_groupMints): GroupMint => {
  return {
    amount: groupMint.amount ?? '',
    receiver: groupMint.receiver ?? '',
    groupAddress: groupMint.group?.id ?? '',
    groupName: groupMint.group?.name ?? '',
  }
}

export const fetchGroupMints = async (safeAddress: string) => {
  const { groupMints } = await graphqlFetcher<GroupMints, GroupMintsVariables>(GROUP_MINTS, {
    where: {
      receiver: safeAddress.toLowerCase(),
    },
  })
  return groupMints.map(transformToGroupMint)
}

export const useGroupMints = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['useGroupMints', safeAddress], () => {
    if (!safeAddress) return []
    return fetchGroupMints(safeAddress)
  })
  return { groupMints: data ?? [], error, refetch: mutate, loading: !error && !data }
}
