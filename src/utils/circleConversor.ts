/**
 * This file contains utility functions to convert crc tokens into tc crc
 *
 * Reference: https://www.npmjs.com/package/@circles/timecircles
 */

import { crcToTc, tcToCrc } from '@circles/timecircles'

import { formatToken } from '../web3/bigNumber'
import formatNumber from './formatNumber'

/**
 * @param amount is a number in wei
 * @returns a formatted number with decimals
 */
export const circlesToTC = (amount?: string) => {
  if (!amount) return 0
  const formattedAmount = formatToken(amount)
  if (!formattedAmount) return 0
  const ts = new Date()
  const numberAmount = parseFloat(formattedAmount)
  const tc = crcToTc(ts, numberAmount)
  return tc
}

/**
 * @param amount is a number in wei
 * @returns a formatted number with decimals
 */
export const tcToCircles = (amount?: string) => {
  if (!amount) return 0
  const formattedAmount = formatToken(amount)
  if (!formattedAmount) return 0
  const ts = new Date()
  const numberAmount = parseFloat(amount)
  const circles = tcToCrc(ts, numberAmount)
  return circles
}
