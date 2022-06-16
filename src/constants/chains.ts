import nullthrows from 'nullthrows'

import {
  DEFAULT_CHAIN_ID,
  // RPC_URL_GOERLI,
  RPC_URL_GNOSIS,
  RPC_URL_KOVAN,
  RPC_URL_MAINNET,
  SUBGRAPH_API,
} from '@/src/constants/misc'
import { ObjectValues } from '@/types/utils'

export const Chains = {
  mainnet: 1,
  // goerli: 5,
  kovan: 42,
  gnosis: 100,
} as const

export type ChainsValues = ObjectValues<typeof Chains>
export type ChainsKeys = keyof typeof Chains

export type ChainConfig = {
  id: ChainsValues
  name: string
  shortName: string
  chainId: ChainsValues
  chainIdHex: string
  rpcUrl: string
  blockExplorerUrls: string[]
  iconUrls: string[]
  subgraphApi: string
}

// Default chain id from env var
export const INITIAL_APP_CHAIN_ID = Number(DEFAULT_CHAIN_ID) as ChainsValues

export const chainsConfig: Record<ChainsValues, ChainConfig> = {
  [Chains.mainnet]: {
    id: Chains.mainnet,
    name: 'Mainnet',
    shortName: 'Mainnet',
    chainId: Chains.mainnet,
    chainIdHex: '0x1',
    rpcUrl: RPC_URL_MAINNET,
    blockExplorerUrls: ['https://etherscan.io/'],
    iconUrls: [],
    subgraphApi: '',
  },
  [Chains.kovan]: {
    id: Chains.kovan,
    name: 'Kovan',
    shortName: 'Kovan',
    chainId: 42,
    chainIdHex: '0x2a',
    rpcUrl: RPC_URL_KOVAN,
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    iconUrls: [],
    subgraphApi: '',
  },
  [Chains.gnosis]: {
    id: Chains.gnosis,
    name: 'Gnosis Chain',
    shortName: 'Gnosis Chain',
    chainId: Chains.gnosis,
    chainIdHex: '0x64',
    rpcUrl: RPC_URL_GNOSIS,
    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
    iconUrls: [],
    subgraphApi: SUBGRAPH_API,
  },
}

export function getNetworkConfig(chainId: ChainsValues): ChainConfig {
  const networkConfig = chainsConfig[chainId]
  return nullthrows(networkConfig, `No config for chain id: ${chainId}`)
}
