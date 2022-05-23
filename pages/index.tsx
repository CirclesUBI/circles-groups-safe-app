import type { NextPage } from 'next'

import { InnerContainer } from '@/src/components/pureStyledComponents/layout/InnerContainer'

const Home: NextPage = () => {
  return (
    <>
      <InnerContainer as="main">
        <h2>Welcome to Circles!</h2>
        <p>
          Get started by editing <code>pages/index.js</code>
        </p>
      </InnerContainer>
    </>
  )
}

export default Home
