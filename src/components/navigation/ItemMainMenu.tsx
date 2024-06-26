import Link from 'next/link'
import styled from 'styled-components'

import { motion } from 'framer-motion'

const Item = styled.a`
  color: ${({ theme: { colors } }) => colors.primary};
  display: block;
  font-family: ${({ theme }) => theme.fonts.fontFamilyHeading};
  font-size: 2.6rem;
  font-weight: 900;
  line-height: 0.8;
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
  closeMenu: () => void
}

export const ItemMainMenu: React.FC<Props> = ({ closeMenu, href, title }) => {
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
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: '-20px' }}
        variants={variants}
        whileHover={{ x: '4px' }}
        whileTap={{ x: '8px' }}
      >
        <Link href={href} passHref>
          <Item onClick={closeMenu}>{title}</Item>
        </Link>
      </motion.div>
    </>
  )
}
