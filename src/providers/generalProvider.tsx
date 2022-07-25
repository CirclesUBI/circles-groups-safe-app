import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

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

interface Props {
  tab?: string
  groupIndex?: number
}

export const GeneralContext = createContext({} as GeneralContextType)

const GeneralContextProvider: React.FC<Props> = ({ children, tab, groupIndex = -1 }) => {
  /* My groups, all groups TABS */
  const { Tabs } = GroupsTabs()
  const [activeTab, setTab] = useState(tab ? tab : Tabs[0].title)
  const switchTab = (tab?: number) => {
    tab != null && setTab(Tabs[tab].title)
  }

  /* My created group selection */
  const { safe } = useSafeAppsSDK()
  const { groups } = useGroupCurrencyTokensByOwner(safe.safeAddress)
  if (groups.length === 1) {
    groupIndex = 0
  }
  const [activeCreatedGroup, setCreatedGroup] = useState(groupIndex)
  const switchCreatedGroup = (groupIndex: number) => {
    groupIndex != null && setCreatedGroup(groupIndex)
  }

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
