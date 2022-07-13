import { createContext, useState } from 'react'

import GroupsTabs from '@/src/constants/GroupsTabs'

interface AppContextInterface {
  activeTab: string
  setTab: (value: any) => void
}

interface Props {
  tab?: string
}

export const TabContext = createContext<AppContextInterface | null>(null)

const TabContainer: React.FC<Props> = ({ children, tab }) => {
  const { Tabs } = GroupsTabs()
  const [activeTab, setTab] = useState(tab ? tab : Tabs[0].title)
  const initialTab = { activeTab, setTab }

  return <TabContext.Provider value={initialTab}>{children}</TabContext.Provider>
}

export default TabContainer
