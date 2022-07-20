import useTransaction, { UseTransactionReturn } from '@/src/hooks/useTransaction'
import { addresses } from '@/src/utils/addresses'
import { GroupCurrencyToken } from '@/types/typechain'

export function useGroupCurrencyTokenTx<
  Method extends keyof GroupCurrencyToken['functions'],
  Params extends Parameters<GroupCurrencyToken[Method]>,
>(address: string, method: Method): UseTransactionReturn<Params> {
  const { abi } = addresses['gnosis']['GROUP_CURRENCY_TOKEN']

  return useTransaction(address, abi, method)
}
