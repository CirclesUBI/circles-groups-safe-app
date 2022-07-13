import React, { ReactNode } from 'react'
import { useContext } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

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
        <>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              initial={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Title text={header} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              initial={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  )
}
