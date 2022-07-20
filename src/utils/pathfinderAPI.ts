// @Reference https://github.com/chriseth/pathfinder

import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { PATHFINDER_API } from '../constants/misc'
import hubCall from './contracts/hubCall'

// @TODO Pathfinder API does not allow '0' to fetch the maximum amount, so we need to pass the greater possible amount
const MAX_VALUE_FROM_PATH = '1000000000000000000000000000000'

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

export type TransferThroughParam = {
  tokenOwners: string[]
  srcs: string[]
  dests: string[]
  wads: string[]
}

export const transformPathToTransferThroughParams = (
  path: PathfinderTransfer[],
): TransferThroughParam => {
  const tokenOwners = path.map((p) => p.tokenOwner)
  const srcs = path.map((p) => p.from)
  const dests = path.map((p) => p.to)
  const wads = path.map((p) => p.value)
  return {
    tokenOwners,
    srcs,
    dests,
    wads,
  }
}

/**
 * mint params are:
 * - collateral[] is an array of circle tokens addresses which must be trusted by the sender
 * - amount[] is an array of string amounts to send to each of the USERS (not token) from the collateral array
 * - as the user who mint the token must be a trusted user, we will use the latest user from the path
 * - which is the second last from the dests array
 * - if there is a direct path to the group, we have to use the first user from the path
 * - which is the first element from the srcs array
 * - otherwise there are no way to create this collaterals string array
 */
export const transformPathToMintParams = async (
  dests: string[],
  srcs: string[],
  provider: JsonRpcProvider | JsonRpcSigner,
) => {
  let collaterals: string[] = []
  let user = undefined
  if (dests.length > 1) {
    user = dests[dests.length - 2]
  } else if (dests.length == 1) {
    user = srcs[0]
  } else {
    console.log('ERROR: no dests!!!')
  }
  if (!user) return collaterals

  const token = await hubCall(provider, 'userToToken', [user])
  if (token) {
    collaterals = [token]
  }
  return collaterals
}
