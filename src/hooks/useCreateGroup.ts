import useTransaction from './useTransaction'
import groupCurrencyTokenFactory from '@/src/abis/GroupCurrencyTokenFactory.json'
import { GroupCurrencyTokenFactory } from '@/types/typechain'
import { UseTransactionReturn } from '@/types/utils'

const gctFactoryAddress = '0xf9842682376BC7570EA850f333801E79e40C3730'
const gctFactoryMethod = 'createGroupCurrencyToken'

export function useCreateGroupTx<
  MethodName extends keyof GroupCurrencyTokenFactory['functions'],
  Params extends Parameters<GroupCurrencyTokenFactory[MethodName]>,
>(): UseTransactionReturn<Params> {
  return useTransaction(gctFactoryAddress, groupCurrencyTokenFactory, gctFactoryMethod)
}
