import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { UsersList } from '@/src/components/lists/UsersList'

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
  groupMembers: groupMember[]
  groupMembersCount: number
}

export const ManageGroupMembers: React.FC<Props> = ({ groupMembers, groupMembersCount }) => {
  const tabs = [{ text: 'Members' }, { text: 'Add members' }]
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  return (
    <>
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
              <UsersList action={'delete'} usersGroup={groupMembers} />
            ) : (
              <UsersList action={'add'} usersGroup={groupMembers} />
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  )
}
