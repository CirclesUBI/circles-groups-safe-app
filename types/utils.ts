import { BigNumber } from '@ethersproject/bignumber'
import { ContractReceipt, Overrides } from '@ethersproject/contracts'

export type ObjectValues<T> = T[keyof T]

export type Extends<T, U extends T> = U
export type Maybe<T> = T | null
export type RequiredNonNull<T> = { [P in keyof T]-?: NonNullable<T[P]> }
export type SwrResponse<T> = { data: T[]; loading: boolean; error: any }

export type UseTransactionReturn<Params> = {
  estimate: (params?: Params) => Promise<BigNumber | null>
  execute: (
    params?: Params | undefined,
    options?: Overrides | undefined,
  ) => Promise<ContractReceipt | null>
}
