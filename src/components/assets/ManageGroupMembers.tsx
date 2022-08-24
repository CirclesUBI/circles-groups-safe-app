import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { UsersList } from '@/src/components/lists/UsersList'
import { MIN_SEARCH_NUMBER } from '@/src/constants/misc'
import { useGroupCurrencyTokenTx } from '@/src/hooks/contracts/useGroupCurrencyTokenTx'
import {
  groupMemberMatches,
  useGroupMembersByGroupIdSearch,
} from '@/src/hooks/subgraph/useGroupMembers'
import { useSearchUsers } from '@/src/hooks/subgraph/useUsers'
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
interface Props {
  groupAddress: string
}

export const ManageGroupMembers: React.FC<Props> = ({ groupAddress }) => {
  // @TODO we might need to delete this
  const { isAppConnected, web3Provider } = useWeb3Connected()
  const { query: usersQuery, search: searchUsers, users } = useSearchUsers()
  const {
    addGroupMember,
    allGroupMembers,
    members,
    query: membersQuery,
    removeGroupMember,
    search: searchGroupMembers,
  } = useGroupMembersByGroupIdSearch(groupAddress)

  const tabs = ['Members', 'Add members']
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const { execute: execRemove } = useGroupCurrencyTokenTx(groupAddress, 'removeMemberToken')
  const { execute: execAdd } = useGroupCurrencyTokenTx(groupAddress, 'addMemberToken')

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
        const member = members.find(
          (user) => user.safeAddress.toLowerCase() === userAddress.toLowerCase(),
        )
        if (member) {
          removeGroupMember(member)
        }
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
        const user = users.find(
          (user) => user.safeAddress.toLowerCase() === userAddress.toLowerCase(),
        )
        if (user) {
          addGroupMember(user)
        }
      }
      await execAdd([userToken], undefined, onSuccess)
    } catch (err) {
      console.log(err)
    }
  }

  const memberAddressesLowerCase = allGroupMembers.map((member) => member.safeAddress.toLowerCase())
  const usersWithoutMembers = users.filter(
    (user) => !memberAddressesLowerCase.includes(user.safeAddress.toLowerCase()),
  )

  /**
   * @todo A couple of minor things
   * - no results text handling could be in a different file
   * - usersWithoutMembers could be in a useMemo
   * - existMember could be done differently (if users > 0 and usersWithoutMembers = 0)
   * - member search might need to match the entire query instead of including?
   */

  let NO_RESULTS_USERS_QUERY = 'There are no users.'
  if (users.length === 0) {
    NO_RESULTS_USERS_QUERY = `We couldn't find a match for ${usersQuery}.`
  } else {
    const existMember = allGroupMembers.some((member) => groupMemberMatches(member, usersQuery))
    if (usersWithoutMembers.length === 0 && existMember) {
      NO_RESULTS_USERS_QUERY = `The user ${usersQuery} is already a group member`
    } else {
      NO_RESULTS_USERS_QUERY = `We couldn't find a match for ${usersQuery}.`
    }
  }
  let NO_RESULTS_MEMBERS_QUERY = 'There are no members on this group.'
  if (membersQuery) {
    NO_RESULTS_MEMBERS_QUERY = `The user ${membersQuery} is not a group member.`
  }

  return (
    <>
      <Section>
        <div className="groupsMenu">
          <Nav>
            {tabs.map((el, index) => (
              <Tab key={`tab_${index}`} onClick={() => setSelectedTab(el)}>
                <span className={selectedTab == el ? 'active' : 'inactive'}>
                  <>
                    {el} {el === 'Members' && '(' + allGroupMembers.length + ')'}
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
                noResultText={NO_RESULTS_MEMBERS_QUERY}
                onRemoveUser={removeUser}
                onSearch={
                  allGroupMembers.length > MIN_SEARCH_NUMBER ? searchGroupMembers : undefined
                }
                query={membersQuery}
                shouldShowAlert
                users={members}
              />
            ) : (
              <UsersList
                action={'add'}
                groupAddress={groupAddress}
                noResultText={NO_RESULTS_USERS_QUERY}
                onAddUser={addUser}
                onSearch={searchUsers}
                query={usersQuery}
                shouldShowAlert
                users={usersWithoutMembers}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  )
}
