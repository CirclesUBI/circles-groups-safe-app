import groupCurrencyTokenFactory from '@/src/abis/GroupCurrencyTokenFactory.json'
import useTransaction, { UseTransactionReturn } from '@/src/hooks/useTransaction'
import { addresses } from '@/src/utils/addresses'
import { GroupCurrencyTokenFactory } from '@/types/typechain'

export function useCreateGroupTx<
  MethodName extends keyof GroupCurrencyTokenFactory['functions'],
  Params extends Parameters<GroupCurrencyTokenFactory[MethodName]>,
>(): UseTransactionReturn<Params> {
  return useTransaction(
    addresses.gnosis.GCTFactory.address,
    groupCurrencyTokenFactory,
    'createGroupCurrencyToken',
  )
}
