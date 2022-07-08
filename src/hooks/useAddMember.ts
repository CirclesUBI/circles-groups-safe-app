import groupCurrencyToken from '@/src/abis/GroupCurrencyToken.json'
import useTransaction, { UseTransactionReturn } from '@/src/hooks/useTransaction'
import { addresses } from '@/src/utils/addresses'
import { GroupCurrencyToken } from '@/types/typechain'

export function useAddMemberTx<
  MethodName extends keyof GroupCurrencyToken['functions'],
  Params extends Parameters<GroupCurrencyToken[MethodName]>,
>(): UseTransactionReturn<Params> {
  return useTransaction(addresses.gnosis.GCT.address, groupCurrencyToken, 'addMemberToken')
}
