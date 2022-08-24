import type { NextPage } from 'next'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { ManageGroupMembers } from '@/src/components/assets/ManageGroupMembers'
import { NoGroupCreated } from '@/src/components/assets/NoGroupCreated'
import { Title } from '@/src/components/assets/Title'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { genericSuspense } from '@/src/components/safeSuspense'
import { useGroupCurrencyTokensByOwner } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useGeneral } from '@/src/providers/generalProvider'

const GroupList = styled.ul`
  margin: ${({ theme }) => theme.general.space * 4}px 0 ${({ theme }) => theme.general.space}px;
  padding: 0;
`

const GroupItem = styled.li`
  align-items: center;
  background-color: ${({ theme }) => theme.dropdown.item.backgroundColor};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 1.8rem;
  font-weight: 400;
  justify-content: space-between;
  padding: ${({ theme }) => theme.general.space * 3}px 0;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  user-select: none;
  &:after {
    content: '';
    width: 6px;
    height: 10px;
    background-image: url(/images/chevron-right.svg);
    background-repeat: no-repeat;
    margin-right: 8px;
    transition: all 0.3s ease-in-out;
    flex-shrink: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.dropdown.item.borderColor};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.fourth};
    &:after {
      margin-right: 0;
    }
  }
`

const HomeAdmin: NextPage = () => {
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokensByOwner(safe.safeAddress)
  const { activeCreatedGroup, switchCreatedGroup } = useGeneral()
  const group = groups?.[activeCreatedGroup]
  const groupId = group?.id

  const { sdk } = useSafeAppsSDK()
  const { circles } = useCirclesBalance(safe.safeAddress, sdk)

  return (
    <>
      {groupId && activeCreatedGroup >= 0 ? (
        <>
          <TitleGroup
            amountNumber={circles}
            buttonHref={`/admin/${groupId}/group-configuration`}
            text={group.name}
          />
          <ManageGroupMembers groupAddress={groupId} />
        </>
      ) : activeCreatedGroup === -1 && groups.length > 0 ? (
        <>
          <h4>Select a group</h4>
          <GroupList>
            {groups.map(({ name }, index) => (
              <GroupItem key={index} onClick={() => switchCreatedGroup(index)}>
                <span>{name}</span>
              </GroupItem>
            ))}
          </GroupList>
        </>
      ) : (
        <>
          <Title
            buttonHref="/admin/create-group"
            buttonText="New group"
            hasLinkButton
            text="My groups"
          />
          <NoGroupCreated
            actionText="Create new group"
            href="/admin/create-group"
            text="You don't have any group created yet."
          />
        </>
      )}
    </>
  )
}
export default genericSuspense(HomeAdmin)
