import gql from 'graphql-tag'

export const GROUP_CURRENCY_TOKEN_QUERY = gql`
  query GroupCurrencyTokens($where: GroupCurrencyToken_filter) {
    groupCurrencyTokens(where: $where) {
      id
      name
      symbol
      creator
      hub
      owner
      treasury
      mintFeePerThousand
      minted
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
