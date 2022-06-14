import erc20 from '@/src/abis/ERC20.json'
import gctFactory from '@/src/abis/GroupCurrencyTokenFactory.json'
import hub from '@/src/abis/Hub.json'
import { Chains } from '@/src/constants/chains'
import { Contracts } from '@/types/Contracts'

export const addresses: {
  [key in keyof typeof Chains]: {
    [key in keyof typeof Contracts]: { address: string; abi: any[] }
  }
} = {
  mainnet: {
    USDC: {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      abi: erc20,
    },
    HUB: {
      address: '',
      abi: hub,
    },
    GCTFactory: {
      address: '',
      abi: gctFactory,
    },
  },
  kovan: {
    USDC: {
      address: '0x13512979ade267ab5100878e2e0f485b568328a4',
      abi: erc20,
    },
    HUB: {
      address: '',
      abi: hub,
    },
    GCTFactory: {
      address: '',
      abi: gctFactory,
    },
  },
  gnosis: {
    USDC: {
      address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
      abi: erc20,
    },
    HUB: {
      address: '0x29b9a7fBb8995b2423a71cC17cf9810798F6C543',
      abi: hub,
    },
    GCTFactory: {
      address: '0xf9842682376BC7570EA850f333801E79e40C3730',
      abi: gctFactory,
    },
  },
}
