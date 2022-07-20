import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { addresses } from '../addresses'
import contractCall from '@/src/utils/contractCall'
import { Hub } from '@/types/typechain'

export default function hubCall<
  Method extends keyof Hub['functions'],
  Params extends Parameters<Hub[Method]>,
  Return extends ReturnType<Hub[Method]>,
>(
  provider: JsonRpcProvider | JsonRpcSigner,
  method: Method,
  params: Params | null,
): Promise<Return | null> {
  const { abi, address } = addresses['gnosis']['HUB']

  return contractCall(address, abi, provider, method, params)
}
