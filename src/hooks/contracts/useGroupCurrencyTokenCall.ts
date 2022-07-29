import useContractCall from '../useContractCall'
import { addresses } from '@/src/utils/addresses'
import { GroupCurrencyToken } from '@/types/typechain'

export function useGroupCurrencyTokenCall<
  Method extends keyof GroupCurrencyToken['functions'],
  Params extends Parameters<GroupCurrencyToken[Method]>,
  Return extends Awaited<ReturnType<GroupCurrencyToken[Method]>>,
>(address: string, method: Method, params: Params): [Return | null, () => void] {
  const { abi } = addresses['gnosis']['GROUP_CURRENCY_TOKEN']

  const [data, refetch] = useContractCall(address, abi, method, params)
  return [data, refetch]
}
