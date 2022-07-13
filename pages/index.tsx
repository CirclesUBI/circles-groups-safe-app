import type { NextPage } from 'next'
import styled from 'styled-components'

import { TabContent } from '@/src/components/tabs/TabContent'
import { TabHeader } from '@/src/components/tabs/TabHeader'
import GroupsTabs from '@/src/constants/GroupsTabs'

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
  const { Tabs } = GroupsTabs()

  return (
    <>
      <Nav>
        {Tabs.map(({ title }, index) => (
          <TabHeader key={index} title={title} />
        ))}
      </Nav>

      {Tabs.map(({ content, header, title }, index) => (
        <TabContent content={content} header={header} key={index} whenActive={title} />
      ))}
    </>
  )
}
export default Home
