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
 * @description Mint Params
 * - users[] is an array of safe address signed into circles garden (See Hub signup)
 * @returns tokens[] which is an array of tokens
 * - for each user in the users array (See Hub userToToken)
 */
export const transformPathToMintParams = async (
  users: string[],
  provider: JsonRpcProvider | JsonRpcSigner,
) => {
  if (!users) return []

  const tokensResponse = users.map(async (user) => {
    const r = await hubCall(provider, 'userToToken', [user])
    return r ?? ''
  })
  const tokens = await Promise.all(tokensResponse)
  if (!tokens) return []

  return tokens
}
