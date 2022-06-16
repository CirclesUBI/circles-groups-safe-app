import type { NextPage } from 'next'
import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { ActivityList } from '@/src/components/lists/ActivityList'

const ActivityLog: NextPage = () => {
  return (
    <>
      <Title hasBackButton text="Activity log" />
      <section>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            initial={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ActivityList />
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
export default ActivityLog
