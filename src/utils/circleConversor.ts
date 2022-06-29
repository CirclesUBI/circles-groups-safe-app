/**
 * This file contains utility functions to convert crc tokens into tc crc
 *
 * Reference: https://www.npmjs.com/package/@circles/timecircles
 */

import { crcToTc, tcToCrc } from '@circles/timecircles'

import formatNumber from './formatNumber'

/**
 * @param amount is a number in wei
 * @returns a formatted number with decimals
 */
export const circlesToTC = (amount?: string) => {
  if (!amount) return '0'
  const ts = new Date()
  // @TODO using parseInt might lose precision in the process
  const numberAmount = parseInt(amount)
  const tc = crcToTc(ts, numberAmount)
  return formatNumber(tc)
}

/**
 * @param amount is a number in wei
 * @returns a formatted number with decimals
 */
export const tcToCircles = (amount?: string) => {
  if (!amount) return '0'
  const ts = new Date()
  // @TODO using parseInt might lose precision in the process
  const numberAmount = parseInt(amount)
  const circles = tcToCrc(ts, numberAmount)
  return formatNumber(circles)
}
