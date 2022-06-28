import useSWR from 'swr'

import { CirclesGardenUser, getUsers } from '../utils/circlesGardenAPI'

export const useUserSafe = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['useUserSafe', safeAddress], () =>
    getUsers([safeAddress]),
  )
  const result = { error, refetch: mutate }
  let user: CirclesGardenUser = {
    id: 0,
    username: safeAddress,
    safeAddress,
  }
  if (data && data.length > 0) {
    user = data[0]
  }
  return { ...result, user }
}
