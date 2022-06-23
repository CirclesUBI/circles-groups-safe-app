import { GraphQLClient } from 'graphql-request'
import { ClientError } from 'graphql-request/dist/types'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
}

export type Balance = {
  __typename?: 'Balance'
  amount: Scalars['BigInt']
  id: Scalars['ID']
  owner: Safe
  token: Token
}

export type Balance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  owner?: InputMaybe<Scalars['String']>
  owner_contains?: InputMaybe<Scalars['String']>
  owner_contains_nocase?: InputMaybe<Scalars['String']>
  owner_ends_with?: InputMaybe<Scalars['String']>
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_gt?: InputMaybe<Scalars['String']>
  owner_gte?: InputMaybe<Scalars['String']>
  owner_in?: InputMaybe<Array<Scalars['String']>>
  owner_lt?: InputMaybe<Scalars['String']>
  owner_lte?: InputMaybe<Scalars['String']>
  owner_not?: InputMaybe<Scalars['String']>
  owner_not_contains?: InputMaybe<Scalars['String']>
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>
  owner_not_ends_with?: InputMaybe<Scalars['String']>
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_not_in?: InputMaybe<Array<Scalars['String']>>
  owner_not_starts_with?: InputMaybe<Scalars['String']>
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  owner_starts_with?: InputMaybe<Scalars['String']>
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>
  token?: InputMaybe<Scalars['String']>
  token_contains?: InputMaybe<Scalars['String']>
  token_contains_nocase?: InputMaybe<Scalars['String']>
  token_ends_with?: InputMaybe<Scalars['String']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_gt?: InputMaybe<Scalars['String']>
  token_gte?: InputMaybe<Scalars['String']>
  token_in?: InputMaybe<Array<Scalars['String']>>
  token_lt?: InputMaybe<Scalars['String']>
  token_lte?: InputMaybe<Scalars['String']>
  token_not?: InputMaybe<Scalars['String']>
  token_not_contains?: InputMaybe<Scalars['String']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']>
  token_not_ends_with?: InputMaybe<Scalars['String']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_not_in?: InputMaybe<Array<Scalars['String']>>
  token_not_starts_with?: InputMaybe<Scalars['String']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  token_starts_with?: InputMaybe<Scalars['String']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Balance_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Owner = 'owner',
  Token = 'token',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

export type Event = {
  id: Scalars['ID']
}

export type Event_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
}

export enum Event_OrderBy {
  Id = 'id',
}

export type GroupCurrencyToken = {
  __typename?: 'GroupCurrencyToken'
  creator?: Maybe<Scalars['String']>
  hub?: Maybe<Scalars['String']>
  id: Scalars['ID']
  members: Array<SafeGroupMember>
  mintFeePerThousand?: Maybe<Scalars['BigInt']>
  minted: Scalars['BigInt']
  name?: Maybe<Scalars['String']>
  onlyOwnerCanMint?: Maybe<Scalars['Boolean']>
  onlyTrustedCanMint?: Maybe<Scalars['Boolean']>
  owner?: Maybe<Scalars['String']>
  suspended?: Maybe<Scalars['Boolean']>
  symbol?: Maybe<Scalars['String']>
  treasury?: Maybe<Scalars['String']>
}

export type GroupCurrencyTokenMembersArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SafeGroupMember_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SafeGroupMember_Filter>
}

export type GroupCurrencyToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  creator?: InputMaybe<Scalars['String']>
  creator_contains?: InputMaybe<Scalars['String']>
  creator_contains_nocase?: InputMaybe<Scalars['String']>
  creator_ends_with?: InputMaybe<Scalars['String']>
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>
  creator_gt?: InputMaybe<Scalars['String']>
  creator_gte?: InputMaybe<Scalars['String']>
  creator_in?: InputMaybe<Array<Scalars['String']>>
  creator_lt?: InputMaybe<Scalars['String']>
  creator_lte?: InputMaybe<Scalars['String']>
  creator_not?: InputMaybe<Scalars['String']>
  creator_not_contains?: InputMaybe<Scalars['String']>
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>
  creator_not_ends_with?: InputMaybe<Scalars['String']>
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  creator_not_in?: InputMaybe<Array<Scalars['String']>>
  creator_not_starts_with?: InputMaybe<Scalars['String']>
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  creator_starts_with?: InputMaybe<Scalars['String']>
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>
  hub?: InputMaybe<Scalars['String']>
  hub_contains?: InputMaybe<Scalars['String']>
  hub_contains_nocase?: InputMaybe<Scalars['String']>
  hub_ends_with?: InputMaybe<Scalars['String']>
  hub_ends_with_nocase?: InputMaybe<Scalars['String']>
  hub_gt?: InputMaybe<Scalars['String']>
  hub_gte?: InputMaybe<Scalars['String']>
  hub_in?: InputMaybe<Array<Scalars['String']>>
  hub_lt?: InputMaybe<Scalars['String']>
  hub_lte?: InputMaybe<Scalars['String']>
  hub_not?: InputMaybe<Scalars['String']>
  hub_not_contains?: InputMaybe<Scalars['String']>
  hub_not_contains_nocase?: InputMaybe<Scalars['String']>
  hub_not_ends_with?: InputMaybe<Scalars['String']>
  hub_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  hub_not_in?: InputMaybe<Array<Scalars['String']>>
  hub_not_starts_with?: InputMaybe<Scalars['String']>
  hub_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  hub_starts_with?: InputMaybe<Scalars['String']>
  hub_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  mintFeePerThousand?: InputMaybe<Scalars['BigInt']>
  mintFeePerThousand_gt?: InputMaybe<Scalars['BigInt']>
  mintFeePerThousand_gte?: InputMaybe<Scalars['BigInt']>
  mintFeePerThousand_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintFeePerThousand_lt?: InputMaybe<Scalars['BigInt']>
  mintFeePerThousand_lte?: InputMaybe<Scalars['BigInt']>
  mintFeePerThousand_not?: InputMaybe<Scalars['BigInt']>
  mintFeePerThousand_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  minted?: InputMaybe<Scalars['BigInt']>
  minted_gt?: InputMaybe<Scalars['BigInt']>
  minted_gte?: InputMaybe<Scalars['BigInt']>
  minted_in?: InputMaybe<Array<Scalars['BigInt']>>
  minted_lt?: InputMaybe<Scalars['BigInt']>
  minted_lte?: InputMaybe<Scalars['BigInt']>
  minted_not?: InputMaybe<Scalars['BigInt']>
  minted_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  onlyOwnerCanMint?: InputMaybe<Scalars['Boolean']>
  onlyOwnerCanMint_in?: InputMaybe<Array<Scalars['Boolean']>>
  onlyOwnerCanMint_not?: InputMaybe<Scalars['Boolean']>
  onlyOwnerCanMint_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  onlyTrustedCanMint?: InputMaybe<Scalars['Boolean']>
  onlyTrustedCanMint_in?: InputMaybe<Array<Scalars['Boolean']>>
  onlyTrustedCanMint_not?: InputMaybe<Scalars['Boolean']>
  onlyTrustedCanMint_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  owner?: InputMaybe<Scalars['String']>
  owner_contains?: InputMaybe<Scalars['String']>
  owner_contains_nocase?: InputMaybe<Scalars['String']>
  owner_ends_with?: InputMaybe<Scalars['String']>
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_gt?: InputMaybe<Scalars['String']>
  owner_gte?: InputMaybe<Scalars['String']>
  owner_in?: InputMaybe<Array<Scalars['String']>>
  owner_lt?: InputMaybe<Scalars['String']>
  owner_lte?: InputMaybe<Scalars['String']>
  owner_not?: InputMaybe<Scalars['String']>
  owner_not_contains?: InputMaybe<Scalars['String']>
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>
  owner_not_ends_with?: InputMaybe<Scalars['String']>
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_not_in?: InputMaybe<Array<Scalars['String']>>
  owner_not_starts_with?: InputMaybe<Scalars['String']>
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  owner_starts_with?: InputMaybe<Scalars['String']>
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>
  suspended?: InputMaybe<Scalars['Boolean']>
  suspended_in?: InputMaybe<Array<Scalars['Boolean']>>
  suspended_not?: InputMaybe<Scalars['Boolean']>
  suspended_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  symbol?: InputMaybe<Scalars['String']>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_ends_with?: InputMaybe<Scalars['String']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  symbol_starts_with?: InputMaybe<Scalars['String']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>
  treasury?: InputMaybe<Scalars['String']>
  treasury_contains?: InputMaybe<Scalars['String']>
  treasury_contains_nocase?: InputMaybe<Scalars['String']>
  treasury_ends_with?: InputMaybe<Scalars['String']>
  treasury_ends_with_nocase?: InputMaybe<Scalars['String']>
  treasury_gt?: InputMaybe<Scalars['String']>
  treasury_gte?: InputMaybe<Scalars['String']>
  treasury_in?: InputMaybe<Array<Scalars['String']>>
  treasury_lt?: InputMaybe<Scalars['String']>
  treasury_lte?: InputMaybe<Scalars['String']>
  treasury_not?: InputMaybe<Scalars['String']>
  treasury_not_contains?: InputMaybe<Scalars['String']>
  treasury_not_contains_nocase?: InputMaybe<Scalars['String']>
  treasury_not_ends_with?: InputMaybe<Scalars['String']>
  treasury_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  treasury_not_in?: InputMaybe<Array<Scalars['String']>>
  treasury_not_starts_with?: InputMaybe<Scalars['String']>
  treasury_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  treasury_starts_with?: InputMaybe<Scalars['String']>
  treasury_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum GroupCurrencyToken_OrderBy {
  Creator = 'creator',
  Hub = 'hub',
  Id = 'id',
  Members = 'members',
  MintFeePerThousand = 'mintFeePerThousand',
  Minted = 'minted',
  Name = 'name',
  OnlyOwnerCanMint = 'onlyOwnerCanMint',
  OnlyTrustedCanMint = 'onlyTrustedCanMint',
  Owner = 'owner',
  Suspended = 'suspended',
  Symbol = 'symbol',
  Treasury = 'treasury',
}

export type HubTransfer = Event & {
  __typename?: 'HubTransfer'
  amount: Scalars['BigInt']
  from: Scalars['String']
  id: Scalars['ID']
  to: Scalars['String']
}

export type HubTransfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['String']>
  from_contains?: InputMaybe<Scalars['String']>
  from_contains_nocase?: InputMaybe<Scalars['String']>
  from_ends_with?: InputMaybe<Scalars['String']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_gt?: InputMaybe<Scalars['String']>
  from_gte?: InputMaybe<Scalars['String']>
  from_in?: InputMaybe<Array<Scalars['String']>>
  from_lt?: InputMaybe<Scalars['String']>
  from_lte?: InputMaybe<Scalars['String']>
  from_not?: InputMaybe<Scalars['String']>
  from_not_contains?: InputMaybe<Scalars['String']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']>
  from_not_ends_with?: InputMaybe<Scalars['String']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_not_in?: InputMaybe<Array<Scalars['String']>>
  from_not_starts_with?: InputMaybe<Scalars['String']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  from_starts_with?: InputMaybe<Scalars['String']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  to?: InputMaybe<Scalars['String']>
  to_contains?: InputMaybe<Scalars['String']>
  to_contains_nocase?: InputMaybe<Scalars['String']>
  to_ends_with?: InputMaybe<Scalars['String']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_gt?: InputMaybe<Scalars['String']>
  to_gte?: InputMaybe<Scalars['String']>
  to_in?: InputMaybe<Array<Scalars['String']>>
  to_lt?: InputMaybe<Scalars['String']>
  to_lte?: InputMaybe<Scalars['String']>
  to_not?: InputMaybe<Scalars['String']>
  to_not_contains?: InputMaybe<Scalars['String']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']>
  to_not_ends_with?: InputMaybe<Scalars['String']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_not_in?: InputMaybe<Array<Scalars['String']>>
  to_not_starts_with?: InputMaybe<Scalars['String']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  to_starts_with?: InputMaybe<Scalars['String']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum HubTransfer_OrderBy {
  Amount = 'amount',
  From = 'from',
  Id = 'id',
  To = 'to',
}

export type Notification = Event & {
  __typename?: 'Notification'
  hubTransfer?: Maybe<HubTransfer>
  id: Scalars['ID']
  ownership?: Maybe<OwnershipChange>
  safe?: Maybe<Safe>
  safeAddress: Scalars['String']
  time: Scalars['BigInt']
  transactionHash: Scalars['String']
  transfer?: Maybe<Transfer>
  trust?: Maybe<TrustChange>
  type: NotificationType
}

export enum NotificationType {
  HubTransfer = 'HUB_TRANSFER',
  Ownership = 'OWNERSHIP',
  Transfer = 'TRANSFER',
  Trust = 'TRUST',
}

export type Notification_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  hubTransfer?: InputMaybe<Scalars['String']>
  hubTransfer_contains?: InputMaybe<Scalars['String']>
  hubTransfer_contains_nocase?: InputMaybe<Scalars['String']>
  hubTransfer_ends_with?: InputMaybe<Scalars['String']>
  hubTransfer_ends_with_nocase?: InputMaybe<Scalars['String']>
  hubTransfer_gt?: InputMaybe<Scalars['String']>
  hubTransfer_gte?: InputMaybe<Scalars['String']>
  hubTransfer_in?: InputMaybe<Array<Scalars['String']>>
  hubTransfer_lt?: InputMaybe<Scalars['String']>
  hubTransfer_lte?: InputMaybe<Scalars['String']>
  hubTransfer_not?: InputMaybe<Scalars['String']>
  hubTransfer_not_contains?: InputMaybe<Scalars['String']>
  hubTransfer_not_contains_nocase?: InputMaybe<Scalars['String']>
  hubTransfer_not_ends_with?: InputMaybe<Scalars['String']>
  hubTransfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  hubTransfer_not_in?: InputMaybe<Array<Scalars['String']>>
  hubTransfer_not_starts_with?: InputMaybe<Scalars['String']>
  hubTransfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  hubTransfer_starts_with?: InputMaybe<Scalars['String']>
  hubTransfer_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  ownership?: InputMaybe<Scalars['String']>
  ownership_contains?: InputMaybe<Scalars['String']>
  ownership_contains_nocase?: InputMaybe<Scalars['String']>
  ownership_ends_with?: InputMaybe<Scalars['String']>
  ownership_ends_with_nocase?: InputMaybe<Scalars['String']>
  ownership_gt?: InputMaybe<Scalars['String']>
  ownership_gte?: InputMaybe<Scalars['String']>
  ownership_in?: InputMaybe<Array<Scalars['String']>>
  ownership_lt?: InputMaybe<Scalars['String']>
  ownership_lte?: InputMaybe<Scalars['String']>
  ownership_not?: InputMaybe<Scalars['String']>
  ownership_not_contains?: InputMaybe<Scalars['String']>
  ownership_not_contains_nocase?: InputMaybe<Scalars['String']>
  ownership_not_ends_with?: InputMaybe<Scalars['String']>
  ownership_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  ownership_not_in?: InputMaybe<Array<Scalars['String']>>
  ownership_not_starts_with?: InputMaybe<Scalars['String']>
  ownership_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  ownership_starts_with?: InputMaybe<Scalars['String']>
  ownership_starts_with_nocase?: InputMaybe<Scalars['String']>
  safe?: InputMaybe<Scalars['String']>
  safeAddress?: InputMaybe<Scalars['String']>
  safeAddress_contains?: InputMaybe<Scalars['String']>
  safeAddress_contains_nocase?: InputMaybe<Scalars['String']>
  safeAddress_ends_with?: InputMaybe<Scalars['String']>
  safeAddress_ends_with_nocase?: InputMaybe<Scalars['String']>
  safeAddress_gt?: InputMaybe<Scalars['String']>
  safeAddress_gte?: InputMaybe<Scalars['String']>
  safeAddress_in?: InputMaybe<Array<Scalars['String']>>
  safeAddress_lt?: InputMaybe<Scalars['String']>
  safeAddress_lte?: InputMaybe<Scalars['String']>
  safeAddress_not?: InputMaybe<Scalars['String']>
  safeAddress_not_contains?: InputMaybe<Scalars['String']>
  safeAddress_not_contains_nocase?: InputMaybe<Scalars['String']>
  safeAddress_not_ends_with?: InputMaybe<Scalars['String']>
  safeAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  safeAddress_not_in?: InputMaybe<Array<Scalars['String']>>
  safeAddress_not_starts_with?: InputMaybe<Scalars['String']>
  safeAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  safeAddress_starts_with?: InputMaybe<Scalars['String']>
  safeAddress_starts_with_nocase?: InputMaybe<Scalars['String']>
  safe_contains?: InputMaybe<Scalars['String']>
  safe_contains_nocase?: InputMaybe<Scalars['String']>
  safe_ends_with?: InputMaybe<Scalars['String']>
  safe_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_gt?: InputMaybe<Scalars['String']>
  safe_gte?: InputMaybe<Scalars['String']>
  safe_in?: InputMaybe<Array<Scalars['String']>>
  safe_lt?: InputMaybe<Scalars['String']>
  safe_lte?: InputMaybe<Scalars['String']>
  safe_not?: InputMaybe<Scalars['String']>
  safe_not_contains?: InputMaybe<Scalars['String']>
  safe_not_contains_nocase?: InputMaybe<Scalars['String']>
  safe_not_ends_with?: InputMaybe<Scalars['String']>
  safe_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_not_in?: InputMaybe<Array<Scalars['String']>>
  safe_not_starts_with?: InputMaybe<Scalars['String']>
  safe_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  safe_starts_with?: InputMaybe<Scalars['String']>
  safe_starts_with_nocase?: InputMaybe<Scalars['String']>
  time?: InputMaybe<Scalars['BigInt']>
  time_gt?: InputMaybe<Scalars['BigInt']>
  time_gte?: InputMaybe<Scalars['BigInt']>
  time_in?: InputMaybe<Array<Scalars['BigInt']>>
  time_lt?: InputMaybe<Scalars['BigInt']>
  time_lte?: InputMaybe<Scalars['BigInt']>
  time_not?: InputMaybe<Scalars['BigInt']>
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  transactionHash?: InputMaybe<Scalars['String']>
  transactionHash_contains?: InputMaybe<Scalars['String']>
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']>
  transactionHash_ends_with?: InputMaybe<Scalars['String']>
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']>
  transactionHash_gt?: InputMaybe<Scalars['String']>
  transactionHash_gte?: InputMaybe<Scalars['String']>
  transactionHash_in?: InputMaybe<Array<Scalars['String']>>
  transactionHash_lt?: InputMaybe<Scalars['String']>
  transactionHash_lte?: InputMaybe<Scalars['String']>
  transactionHash_not?: InputMaybe<Scalars['String']>
  transactionHash_not_contains?: InputMaybe<Scalars['String']>
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']>
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']>
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']>>
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']>
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  transactionHash_starts_with?: InputMaybe<Scalars['String']>
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']>
  transfer?: InputMaybe<Scalars['String']>
  transfer_contains?: InputMaybe<Scalars['String']>
  transfer_contains_nocase?: InputMaybe<Scalars['String']>
  transfer_ends_with?: InputMaybe<Scalars['String']>
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>
  transfer_gt?: InputMaybe<Scalars['String']>
  transfer_gte?: InputMaybe<Scalars['String']>
  transfer_in?: InputMaybe<Array<Scalars['String']>>
  transfer_lt?: InputMaybe<Scalars['String']>
  transfer_lte?: InputMaybe<Scalars['String']>
  transfer_not?: InputMaybe<Scalars['String']>
  transfer_not_contains?: InputMaybe<Scalars['String']>
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>
  transfer_not_ends_with?: InputMaybe<Scalars['String']>
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>
  transfer_not_starts_with?: InputMaybe<Scalars['String']>
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  transfer_starts_with?: InputMaybe<Scalars['String']>
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>
  trust?: InputMaybe<Scalars['String']>
  trust_contains?: InputMaybe<Scalars['String']>
  trust_contains_nocase?: InputMaybe<Scalars['String']>
  trust_ends_with?: InputMaybe<Scalars['String']>
  trust_ends_with_nocase?: InputMaybe<Scalars['String']>
  trust_gt?: InputMaybe<Scalars['String']>
  trust_gte?: InputMaybe<Scalars['String']>
  trust_in?: InputMaybe<Array<Scalars['String']>>
  trust_lt?: InputMaybe<Scalars['String']>
  trust_lte?: InputMaybe<Scalars['String']>
  trust_not?: InputMaybe<Scalars['String']>
  trust_not_contains?: InputMaybe<Scalars['String']>
  trust_not_contains_nocase?: InputMaybe<Scalars['String']>
  trust_not_ends_with?: InputMaybe<Scalars['String']>
  trust_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  trust_not_in?: InputMaybe<Array<Scalars['String']>>
  trust_not_starts_with?: InputMaybe<Scalars['String']>
  trust_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  trust_starts_with?: InputMaybe<Scalars['String']>
  trust_starts_with_nocase?: InputMaybe<Scalars['String']>
  type?: InputMaybe<NotificationType>
  type_in?: InputMaybe<Array<NotificationType>>
  type_not?: InputMaybe<NotificationType>
  type_not_in?: InputMaybe<Array<NotificationType>>
}

export enum Notification_OrderBy {
  HubTransfer = 'hubTransfer',
  Id = 'id',
  Ownership = 'ownership',
  Safe = 'safe',
  SafeAddress = 'safeAddress',
  Time = 'time',
  TransactionHash = 'transactionHash',
  Transfer = 'transfer',
  Trust = 'trust',
  Type = 'type',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type OrganizationSignup = Event & {
  __typename?: 'OrganizationSignup'
  id: Scalars['ID']
  safe: Scalars['String']
}

export type OrganizationSignup_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  safe?: InputMaybe<Scalars['String']>
  safe_contains?: InputMaybe<Scalars['String']>
  safe_contains_nocase?: InputMaybe<Scalars['String']>
  safe_ends_with?: InputMaybe<Scalars['String']>
  safe_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_gt?: InputMaybe<Scalars['String']>
  safe_gte?: InputMaybe<Scalars['String']>
  safe_in?: InputMaybe<Array<Scalars['String']>>
  safe_lt?: InputMaybe<Scalars['String']>
  safe_lte?: InputMaybe<Scalars['String']>
  safe_not?: InputMaybe<Scalars['String']>
  safe_not_contains?: InputMaybe<Scalars['String']>
  safe_not_contains_nocase?: InputMaybe<Scalars['String']>
  safe_not_ends_with?: InputMaybe<Scalars['String']>
  safe_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_not_in?: InputMaybe<Array<Scalars['String']>>
  safe_not_starts_with?: InputMaybe<Scalars['String']>
  safe_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  safe_starts_with?: InputMaybe<Scalars['String']>
  safe_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum OrganizationSignup_OrderBy {
  Id = 'id',
  Safe = 'safe',
}

export type OwnershipChange = Event & {
  __typename?: 'OwnershipChange'
  adds?: Maybe<Scalars['String']>
  id: Scalars['ID']
  removes?: Maybe<Scalars['String']>
}

export type OwnershipChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  adds?: InputMaybe<Scalars['String']>
  adds_contains?: InputMaybe<Scalars['String']>
  adds_contains_nocase?: InputMaybe<Scalars['String']>
  adds_ends_with?: InputMaybe<Scalars['String']>
  adds_ends_with_nocase?: InputMaybe<Scalars['String']>
  adds_gt?: InputMaybe<Scalars['String']>
  adds_gte?: InputMaybe<Scalars['String']>
  adds_in?: InputMaybe<Array<Scalars['String']>>
  adds_lt?: InputMaybe<Scalars['String']>
  adds_lte?: InputMaybe<Scalars['String']>
  adds_not?: InputMaybe<Scalars['String']>
  adds_not_contains?: InputMaybe<Scalars['String']>
  adds_not_contains_nocase?: InputMaybe<Scalars['String']>
  adds_not_ends_with?: InputMaybe<Scalars['String']>
  adds_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  adds_not_in?: InputMaybe<Array<Scalars['String']>>
  adds_not_starts_with?: InputMaybe<Scalars['String']>
  adds_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  adds_starts_with?: InputMaybe<Scalars['String']>
  adds_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  removes?: InputMaybe<Scalars['String']>
  removes_contains?: InputMaybe<Scalars['String']>
  removes_contains_nocase?: InputMaybe<Scalars['String']>
  removes_ends_with?: InputMaybe<Scalars['String']>
  removes_ends_with_nocase?: InputMaybe<Scalars['String']>
  removes_gt?: InputMaybe<Scalars['String']>
  removes_gte?: InputMaybe<Scalars['String']>
  removes_in?: InputMaybe<Array<Scalars['String']>>
  removes_lt?: InputMaybe<Scalars['String']>
  removes_lte?: InputMaybe<Scalars['String']>
  removes_not?: InputMaybe<Scalars['String']>
  removes_not_contains?: InputMaybe<Scalars['String']>
  removes_not_contains_nocase?: InputMaybe<Scalars['String']>
  removes_not_ends_with?: InputMaybe<Scalars['String']>
  removes_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  removes_not_in?: InputMaybe<Array<Scalars['String']>>
  removes_not_starts_with?: InputMaybe<Scalars['String']>
  removes_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  removes_starts_with?: InputMaybe<Scalars['String']>
  removes_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum OwnershipChange_OrderBy {
  Adds = 'adds',
  Id = 'id',
  Removes = 'removes',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  balance?: Maybe<Balance>
  balances: Array<Balance>
  event?: Maybe<Event>
  events: Array<Event>
  groupCurrencyToken?: Maybe<GroupCurrencyToken>
  groupCurrencyTokens: Array<GroupCurrencyToken>
  hubTransfer?: Maybe<HubTransfer>
  hubTransfers: Array<HubTransfer>
  notification?: Maybe<Notification>
  notifications: Array<Notification>
  organizationSignup?: Maybe<OrganizationSignup>
  organizationSignups: Array<OrganizationSignup>
  ownershipChange?: Maybe<OwnershipChange>
  ownershipChanges: Array<OwnershipChange>
  safe?: Maybe<Safe>
  safeGroupMember?: Maybe<SafeGroupMember>
  safeGroupMembers: Array<SafeGroupMember>
  safes: Array<Safe>
  signup?: Maybe<Signup>
  signups: Array<Signup>
  token?: Maybe<Token>
  tokens: Array<Token>
  transfer?: Maybe<Transfer>
  transfers: Array<Transfer>
  trust?: Maybe<Trust>
  trustChange?: Maybe<TrustChange>
  trustChanges: Array<TrustChange>
  trusts: Array<Trust>
  user?: Maybe<User>
  users: Array<User>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryBalanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryBalancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Balance_Filter>
}

export type QueryEventArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryEventsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Event_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Event_Filter>
}

export type QueryGroupCurrencyTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryGroupCurrencyTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<GroupCurrencyToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<GroupCurrencyToken_Filter>
}

export type QueryHubTransferArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryHubTransfersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<HubTransfer_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<HubTransfer_Filter>
}

export type QueryNotificationArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryNotificationsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Notification_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Notification_Filter>
}

export type QueryOrganizationSignupArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryOrganizationSignupsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OrganizationSignup_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<OrganizationSignup_Filter>
}

export type QueryOwnershipChangeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryOwnershipChangesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OwnershipChange_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<OwnershipChange_Filter>
}

export type QuerySafeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySafeGroupMemberArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySafeGroupMembersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SafeGroupMember_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SafeGroupMember_Filter>
}

export type QuerySafesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Safe_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Safe_Filter>
}

export type QuerySignupArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySignupsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Signup_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Signup_Filter>
}

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Transfer_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Transfer_Filter>
}

export type QueryTrustArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTrustChangeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTrustChangesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TrustChange_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TrustChange_Filter>
}

export type QueryTrustsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Trust_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Trust_Filter>
}

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
}

export type Safe = {
  __typename?: 'Safe'
  balances: Array<Balance>
  deployed?: Maybe<Scalars['Boolean']>
  groups?: Maybe<Array<SafeGroupMember>>
  id: Scalars['ID']
  incoming: Array<Trust>
  organization?: Maybe<Scalars['Boolean']>
  outgoing: Array<Trust>
  outgoingAddresses: Array<Scalars['String']>
  owners: Array<User>
}

export type SafeBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Balance_Filter>
}

export type SafeGroupsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SafeGroupMember_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SafeGroupMember_Filter>
}

export type SafeIncomingArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Trust_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Trust_Filter>
}

export type SafeOutgoingArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Trust_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Trust_Filter>
}

export type SafeOwnersArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<User_Filter>
}

export type SafeGroupMember = {
  __typename?: 'SafeGroupMember'
  group: GroupCurrencyToken
  id: Scalars['ID']
  safe: Safe
}

export type SafeGroupMember_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  group?: InputMaybe<Scalars['String']>
  group_contains?: InputMaybe<Scalars['String']>
  group_contains_nocase?: InputMaybe<Scalars['String']>
  group_ends_with?: InputMaybe<Scalars['String']>
  group_ends_with_nocase?: InputMaybe<Scalars['String']>
  group_gt?: InputMaybe<Scalars['String']>
  group_gte?: InputMaybe<Scalars['String']>
  group_in?: InputMaybe<Array<Scalars['String']>>
  group_lt?: InputMaybe<Scalars['String']>
  group_lte?: InputMaybe<Scalars['String']>
  group_not?: InputMaybe<Scalars['String']>
  group_not_contains?: InputMaybe<Scalars['String']>
  group_not_contains_nocase?: InputMaybe<Scalars['String']>
  group_not_ends_with?: InputMaybe<Scalars['String']>
  group_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  group_not_in?: InputMaybe<Array<Scalars['String']>>
  group_not_starts_with?: InputMaybe<Scalars['String']>
  group_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  group_starts_with?: InputMaybe<Scalars['String']>
  group_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  safe?: InputMaybe<Scalars['String']>
  safe_contains?: InputMaybe<Scalars['String']>
  safe_contains_nocase?: InputMaybe<Scalars['String']>
  safe_ends_with?: InputMaybe<Scalars['String']>
  safe_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_gt?: InputMaybe<Scalars['String']>
  safe_gte?: InputMaybe<Scalars['String']>
  safe_in?: InputMaybe<Array<Scalars['String']>>
  safe_lt?: InputMaybe<Scalars['String']>
  safe_lte?: InputMaybe<Scalars['String']>
  safe_not?: InputMaybe<Scalars['String']>
  safe_not_contains?: InputMaybe<Scalars['String']>
  safe_not_contains_nocase?: InputMaybe<Scalars['String']>
  safe_not_ends_with?: InputMaybe<Scalars['String']>
  safe_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_not_in?: InputMaybe<Array<Scalars['String']>>
  safe_not_starts_with?: InputMaybe<Scalars['String']>
  safe_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  safe_starts_with?: InputMaybe<Scalars['String']>
  safe_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum SafeGroupMember_OrderBy {
  Group = 'group',
  Id = 'id',
  Safe = 'safe',
}

export type Safe_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  deployed?: InputMaybe<Scalars['Boolean']>
  deployed_in?: InputMaybe<Array<Scalars['Boolean']>>
  deployed_not?: InputMaybe<Scalars['Boolean']>
  deployed_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  organization?: InputMaybe<Scalars['Boolean']>
  organization_in?: InputMaybe<Array<Scalars['Boolean']>>
  organization_not?: InputMaybe<Scalars['Boolean']>
  organization_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  outgoingAddresses?: InputMaybe<Array<Scalars['String']>>
  outgoingAddresses_contains?: InputMaybe<Array<Scalars['String']>>
  outgoingAddresses_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  outgoingAddresses_not?: InputMaybe<Array<Scalars['String']>>
  outgoingAddresses_not_contains?: InputMaybe<Array<Scalars['String']>>
  outgoingAddresses_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
}

export enum Safe_OrderBy {
  Balances = 'balances',
  Deployed = 'deployed',
  Groups = 'groups',
  Id = 'id',
  Incoming = 'incoming',
  Organization = 'organization',
  Outgoing = 'outgoing',
  OutgoingAddresses = 'outgoingAddresses',
  Owners = 'owners',
}

export type Signup = Event & {
  __typename?: 'Signup'
  id: Scalars['ID']
  safe: Scalars['String']
  token: Scalars['String']
}

export type Signup_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  safe?: InputMaybe<Scalars['String']>
  safe_contains?: InputMaybe<Scalars['String']>
  safe_contains_nocase?: InputMaybe<Scalars['String']>
  safe_ends_with?: InputMaybe<Scalars['String']>
  safe_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_gt?: InputMaybe<Scalars['String']>
  safe_gte?: InputMaybe<Scalars['String']>
  safe_in?: InputMaybe<Array<Scalars['String']>>
  safe_lt?: InputMaybe<Scalars['String']>
  safe_lte?: InputMaybe<Scalars['String']>
  safe_not?: InputMaybe<Scalars['String']>
  safe_not_contains?: InputMaybe<Scalars['String']>
  safe_not_contains_nocase?: InputMaybe<Scalars['String']>
  safe_not_ends_with?: InputMaybe<Scalars['String']>
  safe_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  safe_not_in?: InputMaybe<Array<Scalars['String']>>
  safe_not_starts_with?: InputMaybe<Scalars['String']>
  safe_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  safe_starts_with?: InputMaybe<Scalars['String']>
  safe_starts_with_nocase?: InputMaybe<Scalars['String']>
  token?: InputMaybe<Scalars['String']>
  token_contains?: InputMaybe<Scalars['String']>
  token_contains_nocase?: InputMaybe<Scalars['String']>
  token_ends_with?: InputMaybe<Scalars['String']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_gt?: InputMaybe<Scalars['String']>
  token_gte?: InputMaybe<Scalars['String']>
  token_in?: InputMaybe<Array<Scalars['String']>>
  token_lt?: InputMaybe<Scalars['String']>
  token_lte?: InputMaybe<Scalars['String']>
  token_not?: InputMaybe<Scalars['String']>
  token_not_contains?: InputMaybe<Scalars['String']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']>
  token_not_ends_with?: InputMaybe<Scalars['String']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_not_in?: InputMaybe<Array<Scalars['String']>>
  token_not_starts_with?: InputMaybe<Scalars['String']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  token_starts_with?: InputMaybe<Scalars['String']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Signup_OrderBy {
  Id = 'id',
  Safe = 'safe',
  Token = 'token',
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  balance?: Maybe<Balance>
  balances: Array<Balance>
  event?: Maybe<Event>
  events: Array<Event>
  groupCurrencyToken?: Maybe<GroupCurrencyToken>
  groupCurrencyTokens: Array<GroupCurrencyToken>
  hubTransfer?: Maybe<HubTransfer>
  hubTransfers: Array<HubTransfer>
  notification?: Maybe<Notification>
  notifications: Array<Notification>
  organizationSignup?: Maybe<OrganizationSignup>
  organizationSignups: Array<OrganizationSignup>
  ownershipChange?: Maybe<OwnershipChange>
  ownershipChanges: Array<OwnershipChange>
  safe?: Maybe<Safe>
  safeGroupMember?: Maybe<SafeGroupMember>
  safeGroupMembers: Array<SafeGroupMember>
  safes: Array<Safe>
  signup?: Maybe<Signup>
  signups: Array<Signup>
  token?: Maybe<Token>
  tokens: Array<Token>
  transfer?: Maybe<Transfer>
  transfers: Array<Transfer>
  trust?: Maybe<Trust>
  trustChange?: Maybe<TrustChange>
  trustChanges: Array<TrustChange>
  trusts: Array<Trust>
  user?: Maybe<User>
  users: Array<User>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionBalanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionBalancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Balance_Filter>
}

export type SubscriptionEventArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionEventsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Event_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Event_Filter>
}

export type SubscriptionGroupCurrencyTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionGroupCurrencyTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<GroupCurrencyToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<GroupCurrencyToken_Filter>
}

export type SubscriptionHubTransferArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionHubTransfersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<HubTransfer_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<HubTransfer_Filter>
}

export type SubscriptionNotificationArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionNotificationsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Notification_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Notification_Filter>
}

export type SubscriptionOrganizationSignupArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionOrganizationSignupsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OrganizationSignup_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<OrganizationSignup_Filter>
}

export type SubscriptionOwnershipChangeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionOwnershipChangesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OwnershipChange_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<OwnershipChange_Filter>
}

export type SubscriptionSafeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSafeGroupMemberArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSafeGroupMembersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SafeGroupMember_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SafeGroupMember_Filter>
}

export type SubscriptionSafesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Safe_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Safe_Filter>
}

export type SubscriptionSignupArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSignupsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Signup_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Signup_Filter>
}

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Transfer_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Transfer_Filter>
}

export type SubscriptionTrustArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTrustChangeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTrustChangesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TrustChange_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TrustChange_Filter>
}

export type SubscriptionTrustsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Trust_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Trust_Filter>
}

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
}

export type Token = {
  __typename?: 'Token'
  id: Scalars['ID']
  owner: Safe
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  owner?: InputMaybe<Scalars['String']>
  owner_contains?: InputMaybe<Scalars['String']>
  owner_contains_nocase?: InputMaybe<Scalars['String']>
  owner_ends_with?: InputMaybe<Scalars['String']>
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_gt?: InputMaybe<Scalars['String']>
  owner_gte?: InputMaybe<Scalars['String']>
  owner_in?: InputMaybe<Array<Scalars['String']>>
  owner_lt?: InputMaybe<Scalars['String']>
  owner_lte?: InputMaybe<Scalars['String']>
  owner_not?: InputMaybe<Scalars['String']>
  owner_not_contains?: InputMaybe<Scalars['String']>
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>
  owner_not_ends_with?: InputMaybe<Scalars['String']>
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  owner_not_in?: InputMaybe<Array<Scalars['String']>>
  owner_not_starts_with?: InputMaybe<Scalars['String']>
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  owner_starts_with?: InputMaybe<Scalars['String']>
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Token_OrderBy {
  Id = 'id',
  Owner = 'owner',
}

export type Transfer = Event & {
  __typename?: 'Transfer'
  amount: Scalars['BigInt']
  from: Scalars['String']
  id: Scalars['ID']
  to: Scalars['String']
}

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['String']>
  from_contains?: InputMaybe<Scalars['String']>
  from_contains_nocase?: InputMaybe<Scalars['String']>
  from_ends_with?: InputMaybe<Scalars['String']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_gt?: InputMaybe<Scalars['String']>
  from_gte?: InputMaybe<Scalars['String']>
  from_in?: InputMaybe<Array<Scalars['String']>>
  from_lt?: InputMaybe<Scalars['String']>
  from_lte?: InputMaybe<Scalars['String']>
  from_not?: InputMaybe<Scalars['String']>
  from_not_contains?: InputMaybe<Scalars['String']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']>
  from_not_ends_with?: InputMaybe<Scalars['String']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_not_in?: InputMaybe<Array<Scalars['String']>>
  from_not_starts_with?: InputMaybe<Scalars['String']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  from_starts_with?: InputMaybe<Scalars['String']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  to?: InputMaybe<Scalars['String']>
  to_contains?: InputMaybe<Scalars['String']>
  to_contains_nocase?: InputMaybe<Scalars['String']>
  to_ends_with?: InputMaybe<Scalars['String']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_gt?: InputMaybe<Scalars['String']>
  to_gte?: InputMaybe<Scalars['String']>
  to_in?: InputMaybe<Array<Scalars['String']>>
  to_lt?: InputMaybe<Scalars['String']>
  to_lte?: InputMaybe<Scalars['String']>
  to_not?: InputMaybe<Scalars['String']>
  to_not_contains?: InputMaybe<Scalars['String']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']>
  to_not_ends_with?: InputMaybe<Scalars['String']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_not_in?: InputMaybe<Array<Scalars['String']>>
  to_not_starts_with?: InputMaybe<Scalars['String']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  to_starts_with?: InputMaybe<Scalars['String']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Transfer_OrderBy {
  Amount = 'amount',
  From = 'from',
  Id = 'id',
  To = 'to',
}

export type Trust = Event & {
  __typename?: 'Trust'
  canSendTo?: Maybe<Safe>
  canSendToAddress: Scalars['String']
  id: Scalars['ID']
  limit?: Maybe<Scalars['BigInt']>
  limitPercentage: Scalars['BigInt']
  user?: Maybe<Safe>
  userAddress: Scalars['String']
}

export type TrustChange = Event & {
  __typename?: 'TrustChange'
  canSendTo: Scalars['String']
  id: Scalars['ID']
  limitPercentage: Scalars['BigInt']
  user: Scalars['String']
}

export type TrustChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  canSendTo?: InputMaybe<Scalars['String']>
  canSendTo_contains?: InputMaybe<Scalars['String']>
  canSendTo_contains_nocase?: InputMaybe<Scalars['String']>
  canSendTo_ends_with?: InputMaybe<Scalars['String']>
  canSendTo_ends_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_gt?: InputMaybe<Scalars['String']>
  canSendTo_gte?: InputMaybe<Scalars['String']>
  canSendTo_in?: InputMaybe<Array<Scalars['String']>>
  canSendTo_lt?: InputMaybe<Scalars['String']>
  canSendTo_lte?: InputMaybe<Scalars['String']>
  canSendTo_not?: InputMaybe<Scalars['String']>
  canSendTo_not_contains?: InputMaybe<Scalars['String']>
  canSendTo_not_contains_nocase?: InputMaybe<Scalars['String']>
  canSendTo_not_ends_with?: InputMaybe<Scalars['String']>
  canSendTo_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_not_in?: InputMaybe<Array<Scalars['String']>>
  canSendTo_not_starts_with?: InputMaybe<Scalars['String']>
  canSendTo_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_starts_with?: InputMaybe<Scalars['String']>
  canSendTo_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  limitPercentage?: InputMaybe<Scalars['BigInt']>
  limitPercentage_gt?: InputMaybe<Scalars['BigInt']>
  limitPercentage_gte?: InputMaybe<Scalars['BigInt']>
  limitPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>
  limitPercentage_lt?: InputMaybe<Scalars['BigInt']>
  limitPercentage_lte?: InputMaybe<Scalars['BigInt']>
  limitPercentage_not?: InputMaybe<Scalars['BigInt']>
  limitPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  user?: InputMaybe<Scalars['String']>
  user_contains?: InputMaybe<Scalars['String']>
  user_contains_nocase?: InputMaybe<Scalars['String']>
  user_ends_with?: InputMaybe<Scalars['String']>
  user_ends_with_nocase?: InputMaybe<Scalars['String']>
  user_gt?: InputMaybe<Scalars['String']>
  user_gte?: InputMaybe<Scalars['String']>
  user_in?: InputMaybe<Array<Scalars['String']>>
  user_lt?: InputMaybe<Scalars['String']>
  user_lte?: InputMaybe<Scalars['String']>
  user_not?: InputMaybe<Scalars['String']>
  user_not_contains?: InputMaybe<Scalars['String']>
  user_not_contains_nocase?: InputMaybe<Scalars['String']>
  user_not_ends_with?: InputMaybe<Scalars['String']>
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  user_not_in?: InputMaybe<Array<Scalars['String']>>
  user_not_starts_with?: InputMaybe<Scalars['String']>
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  user_starts_with?: InputMaybe<Scalars['String']>
  user_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum TrustChange_OrderBy {
  CanSendTo = 'canSendTo',
  Id = 'id',
  LimitPercentage = 'limitPercentage',
  User = 'user',
}

export type Trust_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  canSendTo?: InputMaybe<Scalars['String']>
  canSendToAddress?: InputMaybe<Scalars['String']>
  canSendToAddress_contains?: InputMaybe<Scalars['String']>
  canSendToAddress_contains_nocase?: InputMaybe<Scalars['String']>
  canSendToAddress_ends_with?: InputMaybe<Scalars['String']>
  canSendToAddress_ends_with_nocase?: InputMaybe<Scalars['String']>
  canSendToAddress_gt?: InputMaybe<Scalars['String']>
  canSendToAddress_gte?: InputMaybe<Scalars['String']>
  canSendToAddress_in?: InputMaybe<Array<Scalars['String']>>
  canSendToAddress_lt?: InputMaybe<Scalars['String']>
  canSendToAddress_lte?: InputMaybe<Scalars['String']>
  canSendToAddress_not?: InputMaybe<Scalars['String']>
  canSendToAddress_not_contains?: InputMaybe<Scalars['String']>
  canSendToAddress_not_contains_nocase?: InputMaybe<Scalars['String']>
  canSendToAddress_not_ends_with?: InputMaybe<Scalars['String']>
  canSendToAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  canSendToAddress_not_in?: InputMaybe<Array<Scalars['String']>>
  canSendToAddress_not_starts_with?: InputMaybe<Scalars['String']>
  canSendToAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  canSendToAddress_starts_with?: InputMaybe<Scalars['String']>
  canSendToAddress_starts_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_contains?: InputMaybe<Scalars['String']>
  canSendTo_contains_nocase?: InputMaybe<Scalars['String']>
  canSendTo_ends_with?: InputMaybe<Scalars['String']>
  canSendTo_ends_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_gt?: InputMaybe<Scalars['String']>
  canSendTo_gte?: InputMaybe<Scalars['String']>
  canSendTo_in?: InputMaybe<Array<Scalars['String']>>
  canSendTo_lt?: InputMaybe<Scalars['String']>
  canSendTo_lte?: InputMaybe<Scalars['String']>
  canSendTo_not?: InputMaybe<Scalars['String']>
  canSendTo_not_contains?: InputMaybe<Scalars['String']>
  canSendTo_not_contains_nocase?: InputMaybe<Scalars['String']>
  canSendTo_not_ends_with?: InputMaybe<Scalars['String']>
  canSendTo_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_not_in?: InputMaybe<Array<Scalars['String']>>
  canSendTo_not_starts_with?: InputMaybe<Scalars['String']>
  canSendTo_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  canSendTo_starts_with?: InputMaybe<Scalars['String']>
  canSendTo_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  limit?: InputMaybe<Scalars['BigInt']>
  limitPercentage?: InputMaybe<Scalars['BigInt']>
  limitPercentage_gt?: InputMaybe<Scalars['BigInt']>
  limitPercentage_gte?: InputMaybe<Scalars['BigInt']>
  limitPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>
  limitPercentage_lt?: InputMaybe<Scalars['BigInt']>
  limitPercentage_lte?: InputMaybe<Scalars['BigInt']>
  limitPercentage_not?: InputMaybe<Scalars['BigInt']>
  limitPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  limit_gt?: InputMaybe<Scalars['BigInt']>
  limit_gte?: InputMaybe<Scalars['BigInt']>
  limit_in?: InputMaybe<Array<Scalars['BigInt']>>
  limit_lt?: InputMaybe<Scalars['BigInt']>
  limit_lte?: InputMaybe<Scalars['BigInt']>
  limit_not?: InputMaybe<Scalars['BigInt']>
  limit_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  user?: InputMaybe<Scalars['String']>
  userAddress?: InputMaybe<Scalars['String']>
  userAddress_contains?: InputMaybe<Scalars['String']>
  userAddress_contains_nocase?: InputMaybe<Scalars['String']>
  userAddress_ends_with?: InputMaybe<Scalars['String']>
  userAddress_ends_with_nocase?: InputMaybe<Scalars['String']>
  userAddress_gt?: InputMaybe<Scalars['String']>
  userAddress_gte?: InputMaybe<Scalars['String']>
  userAddress_in?: InputMaybe<Array<Scalars['String']>>
  userAddress_lt?: InputMaybe<Scalars['String']>
  userAddress_lte?: InputMaybe<Scalars['String']>
  userAddress_not?: InputMaybe<Scalars['String']>
  userAddress_not_contains?: InputMaybe<Scalars['String']>
  userAddress_not_contains_nocase?: InputMaybe<Scalars['String']>
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  userAddress_starts_with?: InputMaybe<Scalars['String']>
  userAddress_starts_with_nocase?: InputMaybe<Scalars['String']>
  user_contains?: InputMaybe<Scalars['String']>
  user_contains_nocase?: InputMaybe<Scalars['String']>
  user_ends_with?: InputMaybe<Scalars['String']>
  user_ends_with_nocase?: InputMaybe<Scalars['String']>
  user_gt?: InputMaybe<Scalars['String']>
  user_gte?: InputMaybe<Scalars['String']>
  user_in?: InputMaybe<Array<Scalars['String']>>
  user_lt?: InputMaybe<Scalars['String']>
  user_lte?: InputMaybe<Scalars['String']>
  user_not?: InputMaybe<Scalars['String']>
  user_not_contains?: InputMaybe<Scalars['String']>
  user_not_contains_nocase?: InputMaybe<Scalars['String']>
  user_not_ends_with?: InputMaybe<Scalars['String']>
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  user_not_in?: InputMaybe<Array<Scalars['String']>>
  user_not_starts_with?: InputMaybe<Scalars['String']>
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  user_starts_with?: InputMaybe<Scalars['String']>
  user_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Trust_OrderBy {
  CanSendTo = 'canSendTo',
  CanSendToAddress = 'canSendToAddress',
  Id = 'id',
  Limit = 'limit',
  LimitPercentage = 'limitPercentage',
  User = 'user',
  UserAddress = 'userAddress',
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  safeAddresses?: Maybe<Array<Scalars['String']>>
  safes: Array<Safe>
}

export type UserSafesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Safe_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Safe_Filter>
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  safeAddresses?: InputMaybe<Array<Scalars['String']>>
  safeAddresses_contains?: InputMaybe<Array<Scalars['String']>>
  safeAddresses_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  safeAddresses_not?: InputMaybe<Array<Scalars['String']>>
  safeAddresses_not_contains?: InputMaybe<Array<Scalars['String']>>
  safeAddresses_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  safes?: InputMaybe<Array<Scalars['String']>>
  safes_contains?: InputMaybe<Array<Scalars['String']>>
  safes_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  safes_not?: InputMaybe<Array<Scalars['String']>>
  safes_not_contains?: InputMaybe<Array<Scalars['String']>>
  safes_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
}

export enum User_OrderBy {
  Id = 'id',
  SafeAddresses = 'safeAddresses',
  Safes = 'safes',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GroupMembersQueryVariables = Exact<{
  where?: InputMaybe<SafeGroupMember_Filter>
}>

export type GroupMembersQuery = {
  __typename?: 'Query'
  safeGroupMembers: Array<{
    __typename?: 'SafeGroupMember'
    id: string
    safe: { __typename?: 'Safe'; id: string }
    group: { __typename?: 'GroupCurrencyToken'; id: string }
  }>
}

export const GroupMembersDocument = gql`
  query GroupMembers($where: SafeGroupMember_filter) {
    safeGroupMembers(where: $where) {
      id
      safe {
        id
      }
      group {
        id
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GroupMembers(
      variables?: GroupMembersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GroupMembersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GroupMembersQuery>(GroupMembersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GroupMembers',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
export function getSdkWithHooks(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  const sdk = getSdk(client, withWrapper)
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(
    name: string,
    object: V = {} as V,
  ): SWRKeyInterface => [
    name,
    ...Object.keys(object)
      .sort()
      .map((key) => object[key]),
  ]
  return {
    ...sdk,
    useGroupMembers(
      variables?: GroupMembersQueryVariables,
      config?: SWRConfigInterface<GroupMembersQuery, ClientError>,
    ) {
      return useSWR<GroupMembersQuery, ClientError>(
        genKey<GroupMembersQueryVariables>('GroupMembers', variables),
        () => sdk.GroupMembers(variables),
        config,
      )
    },
  }
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>
