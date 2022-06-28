// @Reference https://github.com/chriseth/pathfinder

import { PATHFINDER_API } from '../constants/misc'

const MAX_VALUE_FROM_PATH = '500000000000000000000000'

export type PathfinderFlowResponse = {
  flow: string // a number represented in a string
  transfers: PathfinderTransfer[]
}

export type PathfinderTransfer = {
  from: string
  to: string
  token: string
  tokenOwner: string
  value: string // a number represented in a string
}

export const getPath = async (fromAddress: string, toAddress: string) => {
  const url = `${PATHFINDER_API}flow`
  const body = {
    from: fromAddress,
    to: toAddress,
    value: MAX_VALUE_FROM_PATH,
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = (await response.json()) as PathfinderFlowResponse
    return data
  } catch (_e) {
    console.log({ _e })
    return undefined
  }
}
