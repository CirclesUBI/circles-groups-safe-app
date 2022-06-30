import { useMemo } from 'react'

import useSWR from 'swr'

import { CirclesGardenUser, getUsers } from '../utils/circlesGardenAPI'

export const useUserSafe = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['useUserSafe', safeAddress], () =>
    getUsers([safeAddress]),
  )
  const result = { error, refetch: mutate }
  const user: CirclesGardenUser = useMemo(() => {
    let dataUser
    if (data && data.length > 0) {
      dataUser = data[0]
    }
    return {
      id: 0,
      username: safeAddress,
      safeAddress,
      ...dataUser,
    }
  }, [safeAddress, data])
  return { ...result, user }
}
