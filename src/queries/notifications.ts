import gql from 'graphql-tag'

export const NOTIFICATIONS = gql`
  query Notifications(
    $where: Notification_filter
    $orderBy: Notification_orderBy
    $orderDirection: OrderDirection
  ) {
    notifications(where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      transactionHash
      safeAddress
      type
      time
      trust {
        user
        canSendTo
        limitPercentage
      }
      transfer {
        from
        to
        amount
      }
      hubTransfer {
        from
        to
        amount
      }
      ownership {
        adds
        removes
      }
      groupCreation {
        id
        creator
        group {
          id
          name
        }
      }
      groupAddMember {
        id
        user {
          id
        }
        group {
          id
          name
        }
      }
      groupRemoveMember {
        id
        user {
          id
        }
        group {
          id
          name
        }
      }
      groupMint {
        id
        amount
        receiver
        mintFee
        group {
          id
          name
        }
      }
    }
  }
`
