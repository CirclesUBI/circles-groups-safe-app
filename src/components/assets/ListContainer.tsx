import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin: 0;
  padding: 0;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    gap: ${({ theme }) => theme.general.space * 3}px;
  }
`

export const ListContainer: React.FC = ({ children }) => {
  return (
    <Ul>
      <AnimatePresence exitBeforeEnter> {children} </AnimatePresence>
    </Ul>
  )
}
