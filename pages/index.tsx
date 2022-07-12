import type { NextPage } from 'next'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence } from 'framer-motion'

import { GroupList } from '@/src/components/lists/GroupList'
import { TabContent } from '@/src/components/tabs/TabContent'
import { TabHeader } from '@/src/components/tabs/TabHeader'
import { useGroupCurrencyTokens } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'
import TabContainer from '@/src/providers/groupsTabsProvider'

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

const Home: NextPage = () => {
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokens()
  const { groupsByMember } = useGroupsByMember(safe.safeAddress)

  const tabsGroups = [
    {
      title: 'My groups',
      header: 'Groups where i belong',
      content: <GroupList groups={groupsByMember} />,
    },
    {
      title: 'All groups',
      header: 'All existing Groups',
      content: <GroupList groups={groups} />,
    },
  ]

  return (
    <>
      <TabContainer tab={tabsGroups[0].title}>
        <Nav>
          {tabsGroups.map(({ title }, index) => (
            <TabHeader key={index} title={title} />
          ))}
        </Nav>
        <AnimatePresence exitBeforeEnter>
          {tabsGroups.map(({ content, header, title }, index) => (
            <TabContent content={content} header={header} key={index} whenActive={title} />
          ))}
        </AnimatePresence>
      </TabContainer>
    </>
  )
}
export default Home
