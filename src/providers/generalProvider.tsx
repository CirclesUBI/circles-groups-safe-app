import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { useGroupCurrencyTokensByOwner } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import GroupsTabs from '@/src/hooks/useGroupsTabs'

interface GeneralContextType {
  activeTab: string
  setTab: Dispatch<SetStateAction<string>>
  switchTab: (tab?: number) => void

  activeCreatedGroup: number
  setCreatedGroup: Dispatch<SetStateAction<number>>
  switchCreatedGroup: (groupIndex: number) => void
}

export const GeneralContext = createContext({} as GeneralContextType)

const GeneralContextProvider: React.FC = ({ children }) => {
  /* My groups, all groups TABS */
  const { Tabs } = GroupsTabs()
  const [activeTab, setTab] = useState(Tabs[0].title)
  const switchTab = (tab?: number) => {
    tab != null && setTab(Tabs[tab].title)
  }

  /* My created group selection */
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokensByOwner(safe.safeAddress)

  const groupIndex = groups.length === 1 ? 0 : -1
  const [activeCreatedGroup, setCreatedGroup] = useState(groupIndex)
  const switchCreatedGroup = (groupIndex: number) => {
    if (groupIndex !== -1) {
      setCreatedGroup(groupIndex)
    }
  }

  useEffect(() => switchCreatedGroup(groupIndex), [groupIndex])

  const initialValues = {
    activeTab,
    setTab,
    switchTab,
    activeCreatedGroup,
    setCreatedGroup,
    switchCreatedGroup,
  }

  return <GeneralContext.Provider value={initialValues}>{children}</GeneralContext.Provider>
}

export default GeneralContextProvider

export function useGeneral(): GeneralContextType {
  return useContext(GeneralContext)
}
