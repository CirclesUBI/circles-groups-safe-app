import type { NextPage } from 'next'

import { ManageGroupMembers } from '@/src/components/assets/ManageGroupMembers'
import { NoGroupCreated } from '@/src/components/assets/NoGroupCreated'
import { Title } from '@/src/components/assets/Title'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'

const HomeAdmin: NextPage = () => {
  // @TODO: use a default group to fetch the members instead of this hardcoded group
  const groupId = '0x8c767b35123496469b21af9df28b1927b77441a7'
  const { groupMembers } = useGroupMembersByGroupId(groupId)
  const groupMembersCount = groupMembers?.length ?? 0

  return (
    <>
      {groupMembersCount == 0 ? (
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
          <ManageGroupMembers groupMembers={groupMembers} groupMembersCount={groupMembersCount} />
        </>
      )}
    </>
  )
}
export default HomeAdmin
