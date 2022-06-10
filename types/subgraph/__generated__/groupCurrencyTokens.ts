/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: groupCurrencyTokens
// ====================================================

export interface groupCurrencyTokens_groupCurrencyTokens {
  __typename: 'GroupCurrencyToken'
  id: string
  name: string | null
  symbol: string | null
  creator: string | null
  hub: string | null
  owner: string | null
  treasury: string | null
  mintFeePerThousand: BigInt | null
  suspended: boolean | null
  onlyOwnerCanMint: boolean | null
  onlyTrustedCanMint: boolean | null
}

export interface groupCurrencyTokens {
  groupCurrencyTokens: groupCurrencyTokens_groupCurrencyTokens[]
}
