import styled from 'styled-components'

import { motion } from 'framer-motion'

export const InformationTextStyled = styled(motion.small)`
  font-size: 1.3rem;
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.general.space * 2}px;
  position: relative;
  &:before {
    content: '';
    height: 1px;
    max-width: 150px;
    display: block;
    margin: 0 auto ${({ theme }) => theme.general.space * 3}px;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.2;
  }
`

export const InformationText: React.FC = ({ children }) => {
  return (
    <InformationTextStyled
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      initial={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </InformationTextStyled>
  )
}
