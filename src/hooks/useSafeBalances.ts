import { useEffect, useState } from 'react'

import SafeAppsSDK, { TokenBalance } from '@gnosis.pm/safe-apps-sdk'

function useSafeBalances(sdk: SafeAppsSDK): [TokenBalance[], boolean] {
  const [assets, setAssets] = useState<TokenBalance[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadBalances() {
      const balances = await sdk.safe.experimental_getBalances()

      setAssets(balances.items)
      setLoaded(true)
    }

    loadBalances()
  }, [sdk])

  return [assets, loaded]
}

export { useSafeBalances }
