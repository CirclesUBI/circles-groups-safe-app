import type { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { NoGroupCreated } from '@/src/components/assets/NoGroupCreated'
import { Title } from '@/src/components/assets/Title'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { UsersList } from '@/src/components/lists/UsersList'
import { allUsers } from '@/src/constants/allUsers'
import { users } from '@/src/constants/users'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'

const Nav = styled.nav`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.general.space * 5}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px
    ${({ theme }) => theme.general.space * 2}px;
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    font-weight: 400;
  }
`
const Tab = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  span {
    &:not(.active) {
      opacity: 0.5;
    }
  }
`
const Section = styled.section`
  margin-top: ${({ theme }) => theme.general.space * 6}px;
`

const HomeAdmin: NextPage = () => {
  // @TODO: use a default group to fetch the members instead of this hardcoded group
  const groupId = '0x8c767b35123496469b21af9df28b1927b77441a7'
  const { groupMembers } = useGroupMembersByGroupId(groupId)
  const groupMembersCount = groupMembers?.length ?? 0

  const tabs = [{ text: 'Members' }, { text: 'Add members' }]
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const [usersGroup, setUsers] = useState(users)
  const [usersAll, setUsersAll] = useState(allUsers)
  const [notification, setNotification] = useState({
    opened: false,
    action: '',
    user: 0,
  })

  function notificationInfo(openedValue: boolean, actionValue: string, userValue: number) {
    setNotification({
      opened: openedValue,
      action: actionValue,
      user: userValue,
    })
  }

  function handleRemove(userID: number) {
    notificationInfo(false, '', 0)
    // add user to all users list
    const moveUser = usersGroup.filter((user) => user.id == userID)
    setUsersAll((usersAll) => [moveUser[0], ...usersAll])

    // remove item from my group list
    const newList = usersGroup.filter((user) => user.id !== userID)
    setUsers(newList)
  }

  function handleAdd(userID: number) {
    notificationInfo(false, '', 0)
    // remove user all users list
    const newAllList = usersAll.filter((user) => user.id !== userID)
    setUsersAll(newAllList)

    // add user to my group list
    const newUser = usersAll.filter((user) => user.id == userID)
    setUsers((usersGroup) => [newUser[0], ...usersGroup])
  }

  function getUserNameAllList(userID: number) {
    // get user name from all members list
    const getUser = usersAll.filter((user) => user.id == userID)
    const getUserName = getUser[0].name
    return getUserName
  }

  function getUserNameMyGroupList(userID: number) {
    // get user name from group list
    const user = groupMembers.find((user) => user.id === userID)
    return user?.username ?? ''
  }

  return (
    <>
      {notification.opened && (
        <AnimatePresence>
          {notification.action == 'delete' ? (
            <AlertMessage
              confirmAction={() => handleRemove(notification.user)}
              onCloseAlert={() =>
                setNotification({
                  opened: false,
                  action: '',
                  user: 0,
                })
              }
              text={
                'Are you sure you want to remove ' +
                getUserNameMyGroupList(notification.user) +
                ' from your group?'
              }
            />
          ) : (
            <AlertMessage
              confirmAction={() => handleAdd(notification.user)}
              onCloseAlert={() =>
                setNotification({
                  opened: false,
                  action: '',
                  user: 0,
                })
              }
              text={
                'Are you sure you want to add ' +
                getUserNameAllList(notification.user) +
                ' to your group?'
              }
            />
          )}
        </AnimatePresence>
      )}
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
            buttonHref="/admin/group-configuration"
            text="Bootnode"
          />
          <Section>
            <div className="groupsMenu">
              <Nav>
                {tabs.map(({ text }, index) => (
                  <Tab key={`tab_${index}`} onClick={() => setSelectedTab({ text })}>
                    <span className={selectedTab.text == text ? 'active' : 'inactive'}>
                      <>
                        {text} {text == 'Members' && '(' + groupMembersCount + ')'}
                      </>
                    </span>
                  </Tab>
                ))}
              </Nav>
            </div>

            <AnimatePresence exitBeforeEnter>
              <motion.div
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                initial={{ x: -20, opacity: 0 }}
                key={selectedTab.text ? selectedTab.text : 'empty'}
                transition={{ duration: 0.2 }}
              >
                {selectedTab.text == 'Members' ? (
                  <UsersList
                    action={'delete'}
                    onCloseAlert={notificationInfo}
                    usersGroup={groupMembers}
                  />
                ) : (
                  <UsersList
                    action={'add'}
                    onCloseAlert={notificationInfo}
                    usersGroup={groupMembers}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Section>
        </>
      )}
    </>
  )
}
export default HomeAdmin
