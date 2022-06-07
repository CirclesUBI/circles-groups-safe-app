import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 3}px;
  margin: 0;
  padding: 0;
`

export const ListContainer: React.FC = ({ children }) => {
  return (
    <Ul>
      <AnimatePresence> {children} </AnimatePresence>
    </Ul>
  )
}
