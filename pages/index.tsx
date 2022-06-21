import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence, motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { GroupList } from '@/src/components/lists/GroupList'
import { useGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useSafeBalances } from '@/src/hooks/useSafeBalances'

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

const Section = styled.section``
const Home: NextPage = () => {
  const tabs = [{ text: 'My Groups' }, { text: 'All Groups' }]
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const { connected, safe, sdk } = useSafeAppsSDK()

  // Just exploring SafeApps SDK information and a hook for obtaining Assets balance
  // @TODO remove console logs and safe balances
  const [balances] = useSafeBalances(sdk)
  console.log({ safe })
  console.log({ connected })
  console.log({ balances })

  const { groups } = useGroupCurrencyTokens()

  return (
    <>
      <div className="groupsMenu">
        <Nav>
          {tabs.map(({ text }, index) => (
            <Tab key={`tab_${index}`} onClick={() => setSelectedTab({ text })}>
              <span className={selectedTab.text == text ? 'active' : 'inactive'}>{text}</span>
            </Tab>
          ))}
        </Nav>
      </div>
      <Title
        text={selectedTab.text == 'My Groups' ? 'Groups where i belong' : 'All existing Groups'}
      />

      <Section>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            initial={{ x: -20, opacity: 0 }}
            key={selectedTab.text ? selectedTab.text : 'empty'}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.text == 'My Groups' ? (
              <GroupList filter="member" groups={groups} />
            ) : (
              <GroupList filter="" groups={groups} />
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  )
}
export default Home
