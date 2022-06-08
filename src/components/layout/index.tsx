import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { Footer } from '@/src/components/layout/Footer'
import { Header } from '@/src/components/layout/Header'
import { NavMenu } from '@/src/components/navigation/NavMenu'
import { InnerContainer } from '@/src/components/pureStyledComponents/layout/InnerContainer'

const Wrapper = styled.div<{ isAdminLayout: boolean }>`
  background: ${({ theme }) => theme.colors.primaryGradient};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  position: relative;
  transition: all 0.3s ease-in-out;
  width: 100%;
  &:before {
    content: '';
    background: ${({ theme }) => theme.colors.secondaryGradient};
    height: 100%;
    left: 0;
    opacity: ${(props) => (props.isAdminLayout ? 1 : 0)};
    position: absolute;
    top: 0;
    transition: all 0.3s ease-in-out;
    width: 100%;
    z-index: 0;
  }
`

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  const isAdminLayout = useMemo(() => router.pathname.includes('admin'), [router])

  const easing = [0.175, 0.85, 0.42, 0.96]
  const variants = {
    hidden: { opacity: 0, x: 0, y: -20 },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        type: 'spring',
        bounce: 0.5,
      },
    },
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  }
  const variantsBox = {
    hidden: { x: 0, y: -10 },
    enter: {
      y: 0,
      transition: {
        duration: 0.1,
        type: 'spring',
        bounce: 0.5,
      },
    },
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  }

  return (
    <Wrapper isAdminLayout={isAdminLayout}>
      <Header />
      <NavMenu isAdminLayout={isAdminLayout} />
      <AnimatePresence>
        <InnerContainer
          animate="enter"
          as={motion.main}
          initial="hidden"
          key={router.pathname}
          variants={variantsBox}
        >
          <motion.div animate="enter" initial="hidden" key={router.pathname} variants={variants}>
            {children}
          </motion.div>
        </InnerContainer>
      </AnimatePresence>
      <Footer />
    </Wrapper>
  )
}