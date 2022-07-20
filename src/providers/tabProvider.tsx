import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

import GroupsTabs from '@/src/hooks/useGroupsTabs'

interface AppContextInterface {
  activeTab: string
  setTab: Dispatch<SetStateAction<string>>
  switchTab: (tab?: number) => void
}

interface Props {
  tab?: string
}

export const TabContext = createContext({} as AppContextInterface)

const TabProvider: React.FC<Props> = ({ children, tab }) => {
  const { Tabs } = GroupsTabs()
  const [activeTab, setTab] = useState(tab ? tab : Tabs[0].title)

  const switchTab = (tab?: number) => {
    tab != null && setTab(Tabs[tab].title)
  }
  const initialTab = { activeTab, setTab, switchTab }

  return <TabContext.Provider value={initialTab}>{children}</TabContext.Provider>
}

export default TabProvider

export function useTab(): AppContextInterface {
  return useContext(TabContext)
}
