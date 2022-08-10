import { useMemo } from 'react'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { GroupList } from '@/src/components/lists/GroupList'
import { useGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'

export default function GroupsTabs() {
  const { connected, safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokens()
  const { groupsByMember } = useGroupsByMember(safe.safeAddress)
  const Tabs = useMemo(
    () => [
      {
        title: 'My groups',
        header: 'Groups where i belong',
        content: <GroupList canMint={connected} groups={groupsByMember} sortAlphabetically />,
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
