import type { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'

import { getAddress } from '@ethersproject/address'
import { AnimatePresence, motion } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { NoGroupCreated } from '@/src/components/assets/NoGroupCreated'
import { Title } from '@/src/components/assets/Title'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { UsersList } from '@/src/components/lists/UsersList'
import { useGroupMembers } from '@/src/hooks/subgraph/useGroupMembers'
import { useAllUsers } from '@/src/hooks/subgraph/useUsers'
import { useAddMemberTx } from '@/src/hooks/useAddMember'
import { useWeb3Connected } from '@/src/providers/web3ConnectionProvider'
import hubCall from '@/src/utils/contracts/hubCall'

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
  const { groupMembers } = useGroupMembers(groupId)
  const groupMembersCount = groupMembers?.length ?? 0
  const { allUsers } = useAllUsers()
  const { execute } = useAddMemberTx(groupId)
  const { isAppConnected, web3Provider } = useWeb3Connected()

  const tabs = [{ text: 'Members' }, { text: 'Add members' }]
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const [usersGroup, setUsers] = useState(groupMembers)
  const [usersAll, setUsersAll] = useState(allUsers)
  const [notification, setNotification] = useState({
    opened: false,
    action: '',
    user: 0,
    userAddress: '',
  })

  const addMemberToken = async (userAddress: string) => {
    try {
      if (!isAppConnected) {
        throw new Error('App is not connected')
      }
      if (!userAddress) {
        throw new Error('User Address does not exists')
      }
      const userToken = await hubCall(web3Provider, 'userToToken', [userAddress])
      if (!userToken) {
        throw new Error('User Token does not exists')
      }
      await execute([userToken])
    } catch (err) {
      console.log(err)
    }
  }

  function notificationInfo(
    openedValue: boolean,
    actionValue: string,
    userValue: number,
    safeAddress: string,
  ) {
    setNotification({
      opened: openedValue,
      action: actionValue,
      user: userValue,
      userAddress: safeAddress,
    })
  }

  function handleRemove(userID: number) {
    notificationInfo(false, '', 0, '')
    // add user to all users list
    const moveUser = usersGroup.filter((user) => user.id == userID)
    setUsersAll((usersAll) => [moveUser[0], ...usersAll])

    // remove item from my group list
    const newList = usersGroup.filter((user) => user.id !== userID)
    setUsers(newList)
  }

  async function handleAdd(userID: number, userAddress: string) {
    await addMemberToken(userAddress)
    notificationInfo(false, '', 0, '')
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
    const getUserName = getUser[0]?.username ?? ''
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
                  userAddress: '',
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
              confirmAction={() => handleAdd(notification.user, notification.userAddress)}
              onCloseAlert={() =>
                setNotification({
                  opened: false,
                  action: '',
                  user: 0,
                  userAddress: '',
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
                  <UsersList action={'add'} onCloseAlert={notificationInfo} usersGroup={allUsers} />
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
