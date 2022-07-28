import type { NextPage } from 'next'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { ManageGroupMembers } from '@/src/components/assets/ManageGroupMembers'
import { NoGroupCreated } from '@/src/components/assets/NoGroupCreated'
import { Title } from '@/src/components/assets/Title'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { genericSuspense } from '@/src/components/safeSuspense'
import { useGroupCurrencyTokensByOwner } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'

const HomeAdmin: NextPage = () => {
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokensByOwner(safe.safeAddress)
  // @TODO we will select the first group in the list
  const group = groups?.[0]
  const groupId = group?.id
  // @TODO it might not be necessary if we fetch the members info in the group hook
  const { groupMembers } = useGroupMembersByGroupId(groupId)
  const groupMembersCount = groupMembers?.length ?? 0

  return (
    <>
      {!groupId ? (
        <>
          <Title
            buttonHref="/admin/create-group"
            buttonText="New group"
            hasLinkButton
            text="Your groups"
          />
          <NoGroupCreated
            actionText="Create new group"
            href="/admin/create-group"
            text="You don't have any group created yet."
          />
        </>
      ) : (
        <>
          <TitleGroup
            amountNumber={7.268}
            buttonHref={`/admin/${groupId}/group-configuration`}
            text="Bootnode"
          />
          <ManageGroupMembers
            groupAddress={groupId}
            groupMembers={groupMembers}
            groupMembersCount={groupMembersCount}
          />
        </>
      )}
    </>
  )
}
export default genericSuspense(HomeAdmin)
