import groupCurrencyToken from '@/src/abis/GroupCurrencyToken.json'
import useTransaction, { UseTransactionReturn } from '@/src/hooks/useTransaction'
import { GroupCurrencyToken } from '@/types/typechain'

export function useChangeOwner<
  MethodName extends keyof GroupCurrencyToken['functions'],
  Params extends Parameters<GroupCurrencyToken[MethodName]>,
>(groupAddress: string): UseTransactionReturn<Params> {
  return useTransaction(groupAddress, groupCurrencyToken, 'changeOwner')
}
