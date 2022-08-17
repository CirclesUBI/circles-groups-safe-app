import gql from 'graphql-tag'

export const GROUP_CURRENCY_TOKEN_QUERY = gql`
  query GroupCurrencyTokens(
    $where: GroupCurrencyToken_filter
    $orderBy: GroupCurrencyToken_orderBy
    $orderDirection: OrderDirection
  ) {
    groupCurrencyTokens(where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      name
      symbol
      creator
      hub
      owner
      treasury
      mintFeePerThousand
      minted
      time
      suspended
      onlyOwnerCanMint
      onlyTrustedCanMint
      members {
        id
        safe {
          id
        }
      }
    }
  }
`
