import { Chains, chainsConfig } from '../constants/chains'

// this url send user to the gnosis safe transaction history
export const getGnosisSafeUrl = (safeAddress: string) => {
  const gnosisUrl = chainsConfig[Chains.gnosis]?.blockExplorerUrls[1]
  const url = gnosisUrl.replace('SAFE_ADDRESS', safeAddress)
  return url
}

// this url send user to the xdai explorer
export const getGnosisExplorerUrl = (hash: string) => {
  const url = chainsConfig[Chains.gnosis]?.blockExplorerUrls[0]
  const type = hash.length > 42 ? 'tx' : 'address'
  return `${url}/${type}/${hash}`
}
