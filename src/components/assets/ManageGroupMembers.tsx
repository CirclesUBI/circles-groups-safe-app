import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { UsersList } from '@/src/components/lists/UsersList'
import { useGroupCurrencyTokenTx } from '@/src/hooks/contracts/useGroupCurrencyTokenTx'
import { useAllUsers } from '@/src/hooks/subgraph/useUsers'
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
interface groupMember {
  id: number
  username: string
  safeAddress: string
  avatarUrl?: string
}

interface Props {
  groupAddress: string
  groupMembers: groupMember[]
}

export const ManageGroupMembers: React.FC<Props> = ({ groupAddress, groupMembers }) => {
  // @TODO we might need to delete this
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { circlesUsers } = useAllUsers()

  const tabs = ['Members', 'Add members']
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  // @TODO: cached users to fasten the add/remove of users
  const [users, setUsers] = useState(groupMembers)
  // @TODO: filter already groupMembers from allUsers
  const [allUsers, setAllUsers] = useState(circlesUsers)
  const { execute: execRemove } = useGroupCurrencyTokenTx(groupAddress, 'removeMemberToken')
  const { execute: execAdd } = useGroupCurrencyTokenTx(groupAddress, 'addMemberToken')
  const [membersCount, setMembersCount] = useState(groupMembers.length)

  const getUserToken = async (userAddress: string) => {
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
    return userToken
  }

  const removeUser = async (userAddress: string) => {
    try {
      const userToken = await getUserToken(userAddress)
      const onSuccess = () => {
        const newUsers = users.filter((user) => user.safeAddress !== userAddress)
        setUsers(newUsers)
        setMembersCount(membersCount - 1)
      }
      await execRemove([userToken], undefined, onSuccess)
    } catch (err) {
      console.log(err)
    }
  }

  const addUser = async (userAddress: string) => {
    try {
      const userToken = await getUserToken(userAddress)
      const onSuccess = () => {
        const addedUser = allUsers.filter((user) => user.safeAddress == userAddress)
        setUsers((users) => [...users, addedUser[0]])
        const nonMemberUsers = allUsers.filter((user) => user.safeAddress !== userAddress)
        setAllUsers(nonMemberUsers)
        setMembersCount(membersCount + 1)
      }
      await execAdd([userToken], undefined, onSuccess)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setUsers(groupMembers)
    setMembersCount(groupMembers.length)
  }, [groupMembers])

  return (
    <>
      <Section>
        <div className="groupsMenu">
          <Nav>
            {tabs.map((el, index) => (
              <Tab key={`tab_${index}`} onClick={() => setSelectedTab(el)}>
                <span className={selectedTab == el ? 'active' : 'inactive'}>
                  <>
                    {el} {el === 'Members' && '(' + groupMembers.length + ')'}
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
            key={selectedTab ? selectedTab : 'empty'}
            transition={{ duration: 0.2 }}
          >
            {selectedTab === 'Members' ? (
              <UsersList
                action={'delete'}
                membersList
                onRemoveUser={removeUser}
                shouldShowAlert
                users={users}
              />
            ) : (
              <UsersList action={'add'} onAddUser={addUser} shouldShowAlert users={allUsers} />
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  )
}
