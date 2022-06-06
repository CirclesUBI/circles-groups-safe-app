import type { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { NoGroupCreated } from '@/src/components/assets/NoGroupCreated'
import { Title } from '@/src/components/assets/Title'
import { GroupList } from '@/src/components/lists/GroupList'

const Nav = styled.nav`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.general.space * 5}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 6}px
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
  margin-top: ${({ theme }) => theme.general.space * 4}px;
`

const Home: NextPage = () => {
  const tabs = [{ text: 'Members (4)' }, { text: 'Add members' }]
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [count, setCount] = useState(0)
  return (
    <>
      {count == 0 ? (
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
          <button onClick={() => setCount(count + 1)}>Add a group</button>
        </>
      ) : (
        <>
          <Title
            buttonHref="/admin/create-group"
            buttonText="New group"
            hasLinkButton
            text="Your groups"
          />
          <Section>
            <div className="groupsMenu">
              <Nav>
                {tabs.map(({ text }, index) => (
                  <Tab key={`tab_${index}`} onClick={() => setSelectedTab({ text })}>
                    <span className={selectedTab.text == text ? 'active' : 'inactive'}>{text}</span>
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
                {selectedTab.text == 'My Groups' ? (
                  <GroupList filter="member" />
                ) : (
                  <GroupList filter="" />
                )}
              </motion.div>
            </AnimatePresence>
          </Section>
        </>
      )}
    </>
  )
}
export default Home
