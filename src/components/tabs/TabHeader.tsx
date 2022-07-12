import { useContext } from 'react'
import styled from 'styled-components'

import { TabContext } from '@/src/providers/groupsTabsProvider'

const Tab = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  span {
    transition: all 0.3s ease-in-out;
    &:not(.active) {
      opacity: 0.5;
    }
  }
`

interface Props {
  title: string
}

export const TabHeader: React.FC<Props> = ({ title }) => {
  const context = useContext(TabContext)
  const isActive = title === context?.activeTab
  const handleActive = () => context?.setTab(title)
  return (
    <Tab onClick={handleActive}>
      <span className={isActive ? 'active' : 'inactive'}>{title}</span>
    </Tab>
  )
}
