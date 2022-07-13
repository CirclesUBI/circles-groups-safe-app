import Link from 'next/link'
import { useContext } from 'react'
import styled from 'styled-components'

import { motion } from 'framer-motion'

import GroupsTabs from '@/src/constants/GroupsTabs'
import { TabContext } from '@/src/providers/groupsTabsProvider'

const Item = styled.a`
  color: ${({ theme: { colors } }) => colors.primary};
  display: block;
  font-family: ${({ theme }) => theme.fonts.fontFamilyHeading};
  font-size: 28px;
  font-weight: 900;
  line-height: 24px;
  text-decoration: none;
  width: 100%;
  &.active,
  &:hover {
    color: ${({ theme: { colors } }) => colors.secondary};
  }
`
type Props = {
  href: string
  title: string
  gotoTab?: number | null
  closeMenu: () => void
}

export const MenuItem: React.FC<Props> = ({ closeMenu, gotoTab = null, href, title }) => {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 2000, velocity: -100 },
      },
    },
    closed: {
      y: 30,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }
  const context = useContext(TabContext)
  const { Tabs } = GroupsTabs()
  const switchTab = () => {
    gotoTab != null && context?.setTab(Tabs[gotoTab].title)
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: '-20px' }}
        variants={variants}
        whileHover={{ x: '4px' }}
        whileTap={{ x: '8px' }}
      >
        <Link href={href} passHref>
          <Item
            onClick={() => {
              closeMenu()
              switchTab()
            }}
          >
            {' '}
            {title}{' '}
          </Item>
        </Link>
      </motion.div>
    </>
  )
}
