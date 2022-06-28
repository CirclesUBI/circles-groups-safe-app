import useSWR from 'swr'

import { getPath } from '../utils/pathfinderAPI'

const fetchGroupMintTokenData = async (from: string, to: string) => {
  const data = await getPath(from, to)
  const path = data?.transfers ?? []
  const mintMaxAmount = data?.flow ?? '0'
  return { path, mintMaxAmount }
}

export const useGroupMintToken = (from: string, to: string) => {
  const { data, error, mutate } = useSWR(['useGroupMintToken', from], () =>
    fetchGroupMintTokenData(from, to),
  )
  return { path: data?.path, mintMaxAmount: data?.mintMaxAmount, error, refetch: mutate }
}
