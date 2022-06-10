import useTransaction from './useTransaction'
import groupCurrencyTokenFactory from '@/src/abis/GroupCurrencyTokenFactory.json'
import { addresses } from '@/src/utils/addresses'
import { GroupCurrencyTokenFactory } from '@/types/typechain'
import { UseTransactionReturn } from '@/types/utils'

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
