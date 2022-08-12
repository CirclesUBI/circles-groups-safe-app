import { useCallback, useState } from 'react'

import { getAddress } from '@ethersproject/address'
import useSWR from 'swr'

import { USERS } from '@/src/queries/users'
import {
  CirclesGardenUser,
  getUsers,
  getUsersByAddressOrUsername,
} from '@/src/utils/circlesGardenAPI'
import { graphqlFetcher } from '@/src/utils/graphqlFetcher'
import { Users, UsersVariables, Users_users } from '@/types/subgraph/__generated__/Users'
import { Safe_filter } from '@/types/subgraph/__generated__/globalTypes'

export type User = {
  id: string
  safes: Safe_filter[]
  safeAddresses: string[]
}

const transformToUsers = async (users: Users_users[]) => {
  const safeAddresses = users.map((user) => getAddress(user.safes[0].id))
  const allUsers = await getUsers(safeAddresses)

  return allUsers
}

export const fetchUsers = async () => {
  const { users } = await graphqlFetcher<Users, UsersVariables>(USERS)
  return transformToUsers(users)
}

export const useAllUsers = () => {
  const { data, error, mutate } = useSWR(['users'], () => fetchUsers())
  return { circlesUsers: data ?? [], error, refetch: mutate, loading: !error && !data }
}

export const useSearchUsers = () => {
  const { circlesUsers } = useAllUsers()
  const [users, setUsers] = useState(circlesUsers)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const search = useCallback(
    async (_query: string) => {
      setLoading(true)
      if (!_query) {
        setUsers(circlesUsers)
      } else {
        // @TODO should check that is a safe address? eg: gno:0x...
        const newSearchUsers = await getUsersByAddressOrUsername(_query)
        setUsers(newSearchUsers)
      }
      setLoading(false)
      setQuery(_query)
    },
    [circlesUsers],
  )
  return {
    search,
    loading,
    users,
    query,
    allUsers: circlesUsers,
  }
}
