import gql from 'graphql-tag'

export const GROUP_MEMBERS = gql`
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
