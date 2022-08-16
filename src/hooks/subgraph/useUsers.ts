import { useCallback, useMemo, useState } from 'react'

import { getAddress } from '@ethersproject/address'
import { debounce } from 'lodash'
import useSWR from 'swr'

import { DEBOUNCE_TIME } from '@/src/constants/misc'
import { USERS } from '@/src/queries/users'
import { getUsers, getUsersByAddressOrUsername } from '@/src/utils/circlesGardenAPI'
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

  // @todo debounce is used as an inline function that's why we use useMemo instead of useCallback
  const debouncedSearch = useMemo(
    () =>
      debounce(async (_query: string) => {
        if (!_query) {
          setUsers(circlesUsers)
        } else {
          const newSearchUsers = await getUsersByAddressOrUsername(_query)
          setUsers(newSearchUsers)
        }
      }, DEBOUNCE_TIME),
    [circlesUsers],
  )

  const search = useCallback(
    async (_query: string) => {
      setLoading(true)
      setQuery(_query)
      await debouncedSearch(_query)
      setLoading(false)
    },
    [debouncedSearch],
  )
  return {
    search,
    loading,
    users,
    query,
    allUsers: circlesUsers,
  }
}
