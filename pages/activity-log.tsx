import type { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { ActivityList } from '@/src/components/lists/ActivityList'

const Section = styled.section``

const ActivityLog: NextPage = () => {
  return (
    <>
      <Title hasBackButton text="Activity log" />
      <Section>
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
      </Section>
    </>
  )
}
export default ActivityLog
