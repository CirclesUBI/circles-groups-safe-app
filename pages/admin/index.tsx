import type { NextPage } from 'next'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0;
`

const Home: NextPage = () => {
  return (
    <>
      <Wrapper>
        <h1>Welcome to Circles!</h1>
        <p>
          Get started by editing <code>pages/index.js</code>
        </p>
      </Wrapper>
    </>
  )
}
export default Home
