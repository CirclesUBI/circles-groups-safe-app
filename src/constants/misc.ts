import { BigNumber } from '@ethersproject/bignumber'
import BigNumberJS from 'bignumber.js'

// Be careful when/where use these constants!

// BIGNUMBER JS CONSTANTS
export const ZERO_BN_JS = new BigNumberJS(0)
export const ONE_BN_JS = new BigNumberJS(1)
export const TWO_BN_JS = new BigNumberJS(2)
export const MAX_UINT_256_BN_JS = TWO_BN_JS.pow(256).minus(1)

// ETHERS/BIGNUMBER CONSTANTS
export const ZERO_BN = BigNumber.from(0)
export const ONE_BN = BigNumber.from(1)
export const TWO_BN = BigNumber.from(2)
export const MAX_UINT_256 = TWO_BN_JS.pow(256).minus(1)

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const SUBGRAPH_API = process.env.NEXT_PUBLIC_REACT_APP_SUBGRAPH_API || ''
export const WAD_DECIMALS = 18
export const WAIT_BLOCKS = 8
export const DEFAULT_DECIMALS = 2

export const DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN_ID || '100'

// RPC URL
export const RPC_URL_GOERLI = process.env.NEXT_PUBLIC_REACT_APP_RPC_URL_GOERLI || ''
export const RPC_URL_KOVAN = process.env.NEXT_PUBLIC_REACT_APP_RPC_URL_KOVAN || ''
export const RPC_URL_MAINNET = process.env.NEXT_PUBLIC_REACT_APP_RPC_URL_MAINNET || ''
export const RPC_URL_GNOSIS = process.env.NEXT_PUBLIC_REACT_APP_RPC_URL_GNOSIS || ''

// CIRCLES GARDEN API
export const CIRCLES_GARDEN_API = process.env.NEXT_PUBLIC_REACT_APP_CIRCLES_GARDEN_API || ''

// PATHFINDER API
export const PATHFINDER_API = process.env.NEXT_PUBLIC_REACT_APP_PATHFINDER_API || ''

export const MIN_ADDRESS_MATCH = 5
export const DEBOUNCE_TIME = 500
export const CONFIRMATION_TIME = 2000
export const MIN_SEARCH_NUMBER = 4
