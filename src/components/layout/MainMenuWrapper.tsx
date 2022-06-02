import styled from 'styled-components'

import { motion } from 'framer-motion'

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
interface Props {
  closeMenu: () => void
}
export const MainMenuWrapper: React.FC<Props> = ({ children, closeMenu }) => {
  return (
    <>
      <MenuBackground
        animate={{ opacity: 0.8 }}
        as={motion.div}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={() => closeMenu()}
        transition={{ duration: 0.1, type: 'spring', stiffness: 1000, damping: 100 }}
      />
      <MenuWrapper
        animate={{ opacity: 1, x: '0' }}
        as={motion.div}
        exit={{ opacity: 0, x: '-150px' }}
        initial={{ opacity: 0, x: '-150px' }}
        transition={{ duration: 0.1, type: 'spring', stiffness: 1000, damping: 100 }}
      >
        <Menu>{children}</Menu>
      </MenuWrapper>
    </>
  )
}
