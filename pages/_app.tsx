import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import SafeProvider from '@safe-global/safe-apps-react-sdk'
import { SWRConfig } from 'swr'

import 'sanitize.css'

import { Layout } from '@/src/components/layout'
import SafeSuspense from '@/src/components/safeSuspense'
import Toast from '@/src/components/toast/Toast'
import GeneralContextProvider from '@/src/providers/generalProvider'
import { theme } from '@/src/theme'
import { GlobalStyle } from '@/src/theme/globalStyle'

const Web3ConnectionProvider = dynamic(() => import('@/src/providers/web3ConnectionProvider'), {
  ssr: false,
})

function App({ Component, pageProps }: AppProps) {
  const { hostname, port, protocol } =
    typeof window !== 'undefined'
      ? window.location
      : { hostname: 'localhost', port: 3000, protocol: 'http:' }
  const portString = port ? `:${port}` : ''
  const siteURL = typeof window !== 'undefined' ? `${protocol}//${hostname}${portString}` : ''
  const title = 'Circles'
  const description = 'Circles'
  const twitterHandle = '@'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta content={title} property="og:title" />
        <meta content={siteURL} property="og:url" />
        <meta content={`${siteURL}/shareable/ogImage.jpg`} property="og:image" />
        <meta content="website" property="og:type" />
        <meta content={description} property="og:description" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={title} name="twitter:site" />
        <meta content={twitterHandle} name="twitter:creator" />
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            suspense: true,
            revalidateOnFocus: false,
          }}
        >
          <SafeProvider>
            <Web3ConnectionProvider>
              <GlobalStyle />
              <SafeSuspense>
                <GeneralContextProvider>
                  <Toast />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </GeneralContextProvider>
              </SafeSuspense>
            </Web3ConnectionProvider>
          </SafeProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  )
}
export default App
