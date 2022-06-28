import useSWR from 'swr'

import { getUsers } from '../utils/circlesGardenAPI'

export const useUserSafe = (safeAddress: string) => {
  const { data, error, mutate } = useSWR(['useUserSafe', safeAddress], () =>
    getUsers([safeAddress]),
  )
  const result = { error, refetch: mutate }
  if (data?.length === 0) {
    return {
      ...result,
      user: {
        id: 0,
        username: 'N/A',
        safeAddress,
      },
    }
  }
  const user = data && data[0]
  return { ...result, user }
}
