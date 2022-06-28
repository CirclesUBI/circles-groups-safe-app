import { crcToTc, tcToCrc } from '@circles/timecircles'

import formatNumber from './formatNumber'

export const circlesToTC = (amount?: string) => {
  if (!amount) return 0
  const ts = new Date()
  // @TODO using parseInt might provoke losing some precision in the process
  const numberAmount = parseInt(amount)
  const tc = crcToTc(ts, numberAmount)
  return formatNumber(tc)
}

export const tcToCircles = (amount?: string) => {
  if (!amount) return 0
  const ts = new Date()
  // @TODO using parseInt might provoke losing some precision in the process
  const circles = tcToCrc(ts, parseInt(amount))
  return formatNumber(circles)
}
