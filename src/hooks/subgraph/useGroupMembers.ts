import { useCallback, useEffect, useState } from 'react'

import { getAddress } from '@ethersproject/address'
import useSWR from 'swr'

import { CONFIRMATION_TIME, MIN_ADDRESS_MATCH } from '@/src/constants/misc'
import { GROUP_MEMBERS } from '@/src/queries/groupMembers'
import { CirclesGardenUser, getUsers } from '@/src/utils/circlesGardenAPI'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import {
  GroupMembers,
  GroupMembersVariables,
  GroupMembers_safeGroupMembers,
} from '@/types/subgraph/__generated__/GroupMembers'

export type GroupMember = CirclesGardenUser

const transformToGroupMembers = async (safeGroupmembers: GroupMembers_safeGroupMembers[]) => {
  const safeAddresses = safeGroupmembers.map((safeGroupMember) =>
    getAddress(safeGroupMember.safe.id),
  )
  return getUsers(safeAddresses)
}

export const fetchGroupMembers = async (query: GroupMembersVariables['where']) => {
  const { safeGroupMembers } = await graphqlFetcher<GroupMembers, GroupMembersVariables>(
    GROUP_MEMBERS,
    {
      where: {
        ...query, // @TODO we might want to double check what we are sending as query object
      },
    },
  )

  return transformToGroupMembers(safeGroupMembers)
}

export const useGroupMembersByGroupId = (groupId?: string) => {
  const { data, error, mutate } = useSWR(['groupMembersByGroupId', groupId], () => {
    if (!groupId) return []
    return fetchGroupMembers({ group: groupId })
  })

  return { groupMembers: data ?? [], error, refetch: mutate }
}

export const useGroupMemberBySafeId = (safeId?: string) => {
  const { data, error, mutate } = useSWR(['groupMemberBySafeId', safeId], () => {
    if (!safeId) return undefined
    return fetchGroupMembers({ safe: safeId })
  })

  return { belongedGroups: data ?? [], error, refetch: mutate }
}

export const useGroupMemberById = (safeId?: string, groupId?: string) => {
  const { data, error, mutate } = useSWR(['groupMemberById', safeId, groupId], () => {
    return fetchGroupMembers({ safe: safeId, group: groupId })
  })
  const member = data && data[0]
  return { member, error, refetch: mutate }
}

export const matchesGroupMember = (member: CirclesGardenUser, query: string) => {
  const doesIncludeUsername = member.username.toLowerCase().includes(query.toLowerCase())
  // @todo lets put a minimum of size to contain in the address
  const doesIncludeSafeAddress =
    query.length > MIN_ADDRESS_MATCH &&
    member.safeAddress.toLowerCase().includes(query.toLowerCase())
  return doesIncludeUsername || doesIncludeSafeAddress
}

/**
 * @todo we use an intermediate state for the group members because:
 * - we need to sync the new data (after add/remove) of the member
 * - with the SG which takes some time to update
 * - so we still call the refetch function after a couple of seconds
 * - to update the related data
 * - we should get rid of this intermediate cache ASAP if we can find
 * - a way to sync the SG data
 */
export const useGroupMembersByGroupIdSearch = (groupAddress: string) => {
  const { groupMembers, refetch } = useGroupMembersByGroupId(groupAddress)
  // @todo intermediate cache
  const [cacheMembers, setCacheMembers] = useState(groupMembers)
  const [members, setMembers] = useState(cacheMembers)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const search = useCallback(
    async (_query: string) => {
      setLoading(true)
      if (!_query) {
        setMembers(cacheMembers)
      } else {
        const filteredMembers = cacheMembers.filter((member) => matchesGroupMember(member, _query))
        setMembers(filteredMembers)
      }
      setLoading(false)
      setQuery(_query)
    },
    [cacheMembers],
  )

  const addGroupMember = (user: CirclesGardenUser) => {
    setCacheMembers([...cacheMembers, user])
    setMembers([...members, user])
    // @todo we should wait for X time after add (confirmations)
    setTimeout(() => {
      refetch()
    }, CONFIRMATION_TIME)
  }
  const removeGroupMember = (user: CirclesGardenUser) => {
    const newCacheMembers = cacheMembers.filter(
      (member) => member.safeAddress.toLowerCase() !== user.safeAddress.toLowerCase(),
    )
    const newMembers = members.filter(
      (member) => member.safeAddress.toLowerCase() !== user.safeAddress.toLowerCase(),
    )
    setCacheMembers(newCacheMembers)
    setMembers(newMembers)
    // @todo we should wait for X time after add (confirmations)
    setTimeout(() => {
      refetch()
    }, CONFIRMATION_TIME)
  }

  useEffect(() => {
    setCacheMembers(groupMembers)
    setMembers(groupMembers)
  }, [groupMembers])

  return {
    search,
    loading,
    members,
    query,
    addGroupMember,
    removeGroupMember,
    allGroupMembers: cacheMembers,
  }
}
