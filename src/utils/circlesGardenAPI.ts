import { isAddress } from '@ethersproject/address'

import { CIRCLES_GARDEN_API } from '../constants/misc'

type CirclesResponse<T> = {
  status: string
  data: T[]
}

export type CirclesGardenUser = {
  id: number
  username: string
  safeAddress: string
  avatarUrl?: string
}

export const getUsers = async (safeAddresses: string[]) => {
  if (safeAddresses.length === 0) return []
  const addresses = safeAddresses.join('&address[]=')
  const url = `${CIRCLES_GARDEN_API}users/?address[]=${addresses}`
  const response = await fetch(url)
  const data = (await response.json()) as CirclesResponse<CirclesGardenUser>
  if (data.status !== 'ok') return []
  return data.data
}

export const getUsersByAddressOrUsername = async (searchTerm: string) => {
  if (searchTerm.length === 0) return []
  const api_endpoint = `${CIRCLES_GARDEN_API}users?`
  const url = isAddress(searchTerm)
    ? api_endpoint.concat(`address[]=${searchTerm}`)
    : api_endpoint.concat(`query=${searchTerm}`)
  const response = await fetch(url)
  const data = (await response.json()) as CirclesResponse<CirclesGardenUser>
  if (data.status !== 'ok') return []
  return data.data
}
