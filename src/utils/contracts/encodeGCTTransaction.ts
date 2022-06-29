import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk'

import { addresses } from '../addresses'
import encodeTransaction from '../encodeTransaction'
import { GroupCurrencyToken } from '@/types/typechain'

export default async function encodeGCTTransaction<
  Method extends keyof GroupCurrencyToken['functions'],
  Params extends Parameters<GroupCurrencyToken[Method]>,
>(
  address: string,
  provider: JsonRpcProvider | JsonRpcSigner,
  method: Method,
  params: Params,
): Promise<BaseTransaction> {
  // @TODO fetching an abi should be easier, also it is not inferring their types, network is hardcoded
  const { abi } = addresses['gnosis']['GROUP_CURRENCY_TOKEN']
  return encodeTransaction(address, abi, provider, method, params)
}
