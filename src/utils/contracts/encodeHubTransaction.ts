import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk'

import { addresses } from '../addresses'
import encodeTransaction from '../encodeTransaction'
import { Hub } from '@/types/typechain'

export default async function encodeHubTransaction<
  Method extends keyof Hub['functions'],
  Params extends Parameters<Hub[Method]>,
>(
  provider: JsonRpcProvider | JsonRpcSigner,
  method: Method,
  params?: Params,
): Promise<BaseTransaction> {
  // @TODO fetching an abi should be easier, also it is not inferring their types, network is hardcoded
  const { abi, address } = addresses['gnosis']['HUB']
  return encodeTransaction(address, abi, provider, method, params)
}
