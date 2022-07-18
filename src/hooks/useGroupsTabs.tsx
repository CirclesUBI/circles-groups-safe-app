import { useMemo } from 'react'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { GroupList } from '@/src/components/lists/GroupList'
import { useGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'

export default function GroupsTabs() {
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokens()
  const { groupsByMember } = useGroupsByMember(safe.safeAddress)
  const Tabs = useMemo(
    () => [
      {
        title: 'My groups',
        header: 'Groups where i belong',
        content: <GroupList groups={groupsByMember} />,
      },
      {
        title: 'All groups',
        header: 'All existing Groups',
        content: <GroupList groups={groups} />,
      },
    ],
    [groups, groupsByMember],
  )
  return { Tabs }
}
