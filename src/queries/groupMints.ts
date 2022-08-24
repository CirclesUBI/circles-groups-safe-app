import gql from 'graphql-tag'

export const GROUP_MINTS = gql`
  query GroupMints($where: GroupMint_filter) {
    groupMints(where: $where) {
      id
      amount
      receiver
      group {
        id
        name
      }
    }
  }
`
