import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { ItemMainMenu } from '@/src/components/navigation/ItemMainMenu'

const Wrapper = styled.div`
  color: ${({ theme: { colors } }) => colors.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 3}px;
  width: 100%;
`

type Props = {
  onClose: () => void
  onClick: (groupId: number) => void
  variants: {
    open: {
      transition: {
        staggerChildren: number
        delayChildren: number
      }
    }
    closed: {
      transition: {
        staggerChildren: number
        staggerDirection: number
      }
    }
  }
  groupsList: { id: string; name: string }[]
}

export const ListCreatedGroupsMenu: React.FC<Props> = ({
  groupsList,
  onClick,
  onClose,
  variants,
}) => {
  return (
    <Wrapper as={motion.div} variants={variants}>
      <AnimatePresence>
        {groupsList.map(({ name }, index) => (
          <ItemMainMenu
            closeMenu={() => {
              onClose(), onClick(index)
            }}
            href="/admin/"
            key={`links_${index}`}
            title={name}
          />
        ))}
      </AnimatePresence>
    </Wrapper>
  )
}
