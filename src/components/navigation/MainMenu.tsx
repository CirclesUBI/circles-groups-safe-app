import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { MenuItem } from '@/src/components/navigation/MenuItem'
import { menuLinks } from '@/src/constants/menuLinks'

const MenuBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
`
const Menu = styled.nav`
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 48px;
`
const MenuWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  max-width: 90%;
  z-index: 20;
  padding: ${({ theme }) => theme.general.space * 4}px;
  box-shadow: 59.8671px 3.99114px 121px rgba(0, 0, 0, 0.07),
    30.3077px 2.02051px 52.7484px rgba(0, 0, 0, 0.04725),
    11.9734px 0.798228px 19.6625px rgba(0, 0, 0, 0.035),
    2.61919px 0.174612px 6.99531px rgba(0, 0, 0, 0.02275);
`
const MenuHeader = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const CloseMenu = styled.button`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 28px;
  width: 28px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`
const HomeLink = styled.a`
  width: 130px;
  display: block;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: 150px;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    width: 184px;
  }
`
const User = styled.div`
  align-items: center;
  background: rgba(233, 232, 221, 0.5);
  border-radius: ${({ theme }) => theme.general.space}px;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  padding: ${({ theme }) => theme.general.space * 2}px;
  width: 100%;
  img {
    border-radius: 50%;
  }
`
const LinksList = styled.ul`
  color: ${({ theme: { colors } }) => colors.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
  width: 100%;
`
type Props = {
  onClose: () => void
}

export const MainMenu: React.FC<Props> = ({ onClose }) => {
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  return (
    <>
      <MenuBackground
        animate={{ opacity: 0.8 }}
        as={motion.div}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={() => onClose()}
        transition={{ duration: 0.1, type: 'spring', stiffness: 1000, damping: 100 }}
      />
      <MenuWrapper
        animate={{ opacity: 1, x: '0' }}
        as={motion.div}
        exit={{ opacity: 0, x: '-150px' }}
        initial={{ opacity: 0, x: '-150px' }}
        transition={{ duration: 0.1, type: 'spring', stiffness: 1000, damping: 100 }}
      >
        <Menu>
          <MenuHeader>
            <Link href="/" passHref>
              <HomeLink onClick={() => onClose()}>
                <Image
                  alt="Circles Groups"
                  height={74}
                  layout="responsive"
                  src="/images/circlesLogoPositive.svg"
                  width={164}
                />
              </HomeLink>
            </Link>
            <CloseMenu onClick={() => onClose()}>
              <Image alt="Close" height={10} src="/images/icon-close.svg" width={10} />
            </CloseMenu>
          </MenuHeader>
          <User>
            <Image
              alt="@TomasBari"
              height={40}
              objectFit="cover"
              src="/images/user.jpg"
              width={40}
            />
            <strong>@TomasBari</strong>
          </User>

          <LinksList as={motion.div} variants={variants}>
            <AnimatePresence>
              {menuLinks.map(({ href, title }, index) => (
                <div key={`links_${index}`}>
                  <MenuItem href={href} onClose={onClose} title={title} />
                </div>
              ))}
            </AnimatePresence>
          </LinksList>
        </Menu>
      </MenuWrapper>
    </>
  )
}
