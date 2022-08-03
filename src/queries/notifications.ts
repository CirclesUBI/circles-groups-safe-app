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
    }
  }
`
