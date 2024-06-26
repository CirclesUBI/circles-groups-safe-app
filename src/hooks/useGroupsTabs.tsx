import { useMemo } from 'react'

import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'

import { GroupList } from '@/src/components/lists/GroupList'
import { useGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'
import {
  GroupCurrencyToken_orderBy,
  OrderDirection,
} from '@/types/subgraph/__generated__/globalTypes'

export default function GroupsTabs() {
  const { connected, safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokens(GroupCurrencyToken_orderBy.time, OrderDirection.desc)
  const { groupsByMember } = useGroupsByMember(safe.safeAddress)
  const Tabs = useMemo(
    () => [
      {
        title: 'My groups',
        header: 'Groups I belong to',
        content: <GroupList canMint={connected} groups={groupsByMember} />,
      },
      {
        title: 'All groups',
        header: 'All existing Groups',
        content: <GroupList canMint={connected} groups={groups} />,
      },
    ],
    [connected, groups, groupsByMember],
  )
  return { Tabs }
}
