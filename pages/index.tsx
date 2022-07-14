import type { NextPage } from 'next'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence, motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { GroupList } from '@/src/components/lists/GroupList'
import { useGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'

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
interface tab {
  text: string
}

interface Props {
  tabs: tab[]
  onChange: (text: string) => void
  selectedTab: string
}

const Home: NextPage<Props> = ({ onChange, selectedTab, tabs }) => {
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokens()
  const { groupsByMember } = useGroupsByMember(safe.safeAddress)
  return (
    <>
      <div className="groupsMenu">
        <Nav>
          {tabs.map(({ text }, index) => (
            <Tab key={`tab_${index}`} onClick={() => onChange(text)}>
              <span className={selectedTab == text ? 'active' : 'inactive'}>{text}</span>
            </Tab>
          ))}
        </Nav>
      </div>
      <Title text={selectedTab == 'My Groups' ? 'Groups where i belong' : 'All existing Groups'} />

      <section>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            initial={{ x: -20, opacity: 0 }}
            key={selectedTab ? selectedTab : 'empty'}
            transition={{ duration: 0.2 }}
          >
            {selectedTab == 'My Groups' ? (
              <GroupList groups={groupsByMember} />
            ) : (
              <GroupList groups={groups} />
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
export default Home
