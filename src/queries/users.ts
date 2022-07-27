import gql from 'graphql-tag'

export const USERS = gql`
  query Users($where: User_filter) {
    users(where: $where) {
      id
      safes {
        id
      }
      safeAddresses
    }
  }
`
