import type { NextPage } from 'next'
import React, { useEffect, useMemo } from 'react'

import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { AnimatePresence, motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { ActivityList } from '@/src/components/lists/ActivityList'
import { useNotificationsByUser } from '@/src/hooks/subgraph/useNotifications'
import { formatActivityMessage, updateLastSeen } from '@/src/utils/notifications'

const ActivityLog: NextPage = () => {
  const { safe } = useSafeAppsSDK()
  const { notifications } = useNotificationsByUser(safe.safeAddress)
  const activities = useMemo(() => notifications.map(formatActivityMessage), [notifications])

  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotification = notifications[0].time
      updateLastSeen(lastNotification)
    }
  }, [notifications])

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
            <ActivityList activities={activities} />
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
export default ActivityLog
