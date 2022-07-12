import { createContext, useState } from 'react'

interface AppContextInterface {
  activeTab: string
  setTab: (value: any) => void
}

interface Props {
  tab: string
}

export const TabContext = createContext<AppContextInterface | null>(null)

const TabContainer: React.FC<Props> = ({ children, tab = '' }) => {
  const [activeTab, setTab] = useState(tab)
  const initialTab = { activeTab, setTab }

  return <TabContext.Provider value={initialTab}>{children}</TabContext.Provider>
}

export default TabContainer
