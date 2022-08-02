import styled from 'styled-components'

import { motion } from 'framer-motion'

const Li = styled.li`
  align-items: flex-start;
  list-style: none;
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: ${({ theme }) => theme.general.space * 2}px;
  }
  &:not(.noColors) {
    &:nth-child(3n + 2) > header > div:first-child {
      background-color: ${({ theme }) => theme.colors.fifth};
    }
    &:nth-child(3n + 3) > header > div:first-child {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    align-items: center;
    flex-direction: row;
    &:not(:last-child) {
      padding-bottom: ${({ theme }) => theme.general.space * 3}px;
    }
  }
`

interface Props {
  custom?: number
  unsetColors?: boolean
}

export const ListItem: React.FC<Props> = ({ children, custom = '', unsetColors = false }) => {
  return (
    <Li
      animate={{ opacity: 1 }}
      as={motion.li}
      className={unsetColors ? 'noColors' : 'withColors'}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key={custom}
      layout
      transition={{ duration: 0.3 }}
    >
      {children}
    </Li>
  )
}
