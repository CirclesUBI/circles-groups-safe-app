import groupCurrencyToken from '@/src/abis/GroupCurrencyToken.json'
import useTransaction, { UseTransactionReturn } from '@/src/hooks/useTransaction'
import { GroupCurrencyToken } from '@/types/typechain'

export function useAddMemberTx<
  MethodName extends keyof GroupCurrencyToken['functions'],
  Params extends Parameters<GroupCurrencyToken[MethodName]>,
>(address: string): UseTransactionReturn<Params> {
  return useTransaction(address, groupCurrencyToken, 'addMemberToken')
}
