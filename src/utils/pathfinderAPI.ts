// @Reference https://github.com/chriseth/pathfinder

import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { PATHFINDER_API } from '../constants/misc'
import { fromBN, toBN } from '../web3/bigNumber'
import { tcToCircles } from './circleConversor'
import hubCall from './contracts/hubCall'

// @TODO Pathfinder API does not allow '0' to fetch the maximum amount, so we need to pass the greater possible amount
const MAX_VALUE_FROM_PATH = '1000000000000000000000000000000'

export type PathfinderFlowResponse = {
  result: {
    maxFlowValue: string // a number represented in a string
    transferSteps: PathfinderTransfer[]
  }
}

export type PathfinderTransfer = {
  from: string
  to: string
  token: string
  token_owner: string
  value: string // a number represented in a string
}

export const getPath = async (fromAddress: string, toAddress: string, amount?: string) => {
  const computeTransferParams = {
    from: fromAddress,
    to: toAddress,
    value: amount,
    iterative: false,
    prune: true,
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const body = JSON.stringify(
    {
      id: Date.now(),
      method: 'compute_transfer',
      params: computeTransferParams,
    },
    null,
    2,
  )

  try {
    const result = await fetch(PATHFINDER_API, {
      method: 'POST',
      headers,
      body,
    })
    return (await result.json()) as PathfinderFlowResponse
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
  const tokenOwners = path.map((p) => p.token_owner)
  const srcs = path.map((p) => p.from)
  const dests = path.map((p) => p.to)
  const wads = path.map((p) => {
    const circles = tcToCircles(p.value)
    const bn = toBN(String(circles))
    return bn?.toString() ?? '0'
  })
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
  groupAddress: string,
  userAddresses: string[],
  provider: JsonRpcProvider | JsonRpcSigner,
) => {
  if (userAddresses.length === 0) return []

  const userLimits = await Promise.all(
    userAddresses.map(async (user) => {
      const limit = await hubCall(provider, 'limits', [groupAddress, user])
      if (!limit) return null
      const limitBN = fromBN(limit)
      if (!limitBN) return null
      if (limitBN.eq(fromBN('0'))) return null
      return user
    }),
  )
  const filteredLimits = userLimits.filter(Boolean)
  const mintUser = filteredLimits[filteredLimits.length - 1]
  if (!mintUser) return []

  // @TODO we might want to mint to each user in the array
  const token = await hubCall(provider, 'userToToken', [mintUser])

  if (!token) return []
  const tokens = [token]
  return tokens
}
