import { useCallback, useEffect, useState } from 'react'

import SafeAppsSDK from '@safe-global/safe-apps-react-sdk/node_modules/@safe-global/safe-apps-sdk/dist/src/sdk'
import { TokenBalance } from '@safe-global/safe-apps-sdk'

function useSafeBalances(sdk: SafeAppsSDK): [TokenBalance[], boolean] {
  const [assets, setAssets] = useState<TokenBalance[]>([])
  const [loaded, setLoaded] = useState(false)

  const loadBalances = useCallback(async () => {
    const balances = await sdk.safe.experimental_getBalances()
    setAssets(balances.items)
    setLoaded(true)
  }, [sdk])

  useEffect(() => {
    loadBalances()
  }, [loadBalances])

  return [assets, loaded]
}

export { useSafeBalances }
