import React, { ReactNode } from 'react'
import { useContext } from 'react'

import { motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { TabContext } from '@/src/providers/groupsTabsProvider'

interface Props {
  content: ReactNode
  header: string
  whenActive: string
}

export const TabContent: React.FC<Props> = ({ content, header, whenActive }) => {
  const context = useContext(TabContext)
  return (
    <>
      {whenActive == context?.activeTab && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0 }}
          initial={{ x: -20, opacity: 0 }}
          key={header}
          transition={{ duration: 0.3 }}
        >
          <Title text={header} /> {content}
        </motion.div>
      )}
    </>
  )
}
