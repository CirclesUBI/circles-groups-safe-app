/**
 * This file contains utility functions to convert crc tokens into tc crc
 *
 * Reference: https://www.npmjs.com/package/@circles/timecircles
 */

import { crcToTc, tcToCrc } from '@circles/timecircles'

import { formatToken } from '../web3/bigNumber'

// @TODO using a default timestamp fixes the issue about calculating different amount per use
const CURRENT_TS = new Date()

/**
 * @param amount is a number in wei
 * @returns a formatted number with decimals
 */
export const circlesToTC = (amount?: string) => {
  if (!amount) return 0
  const formattedAmount = formatToken(amount)
  if (!formattedAmount) return 0
  const numberAmount = parseFloat(formattedAmount)
  const tc = crcToTc(CURRENT_TS, numberAmount)
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
  const numberAmount = parseFloat(amount)
  const circles = tcToCrc(CURRENT_TS, numberAmount)
  return circles
}
