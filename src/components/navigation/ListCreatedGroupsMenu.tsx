import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { ItemMainMenu } from '@/src/components/navigation/ItemMainMenu'

const Wrapper = styled.div`
  color: ${({ theme: { colors } }) => colors.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
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
  GroupsList: { id: string; name: string }[]
}

export const ListCreatedGroupsMenu: React.FC<Props> = ({
  GroupsList,
  onClick,
  onClose,
  variants,
}) => {
  return (
    <Wrapper as={motion.div} variants={variants}>
      <AnimatePresence>
        {GroupsList.map(({ name }, index) => (
          <div key={`links_${index}`}>
            <ItemMainMenu
              closeMenu={() => {
                onClose(), onClick(index)
              }}
              href="/admin/"
              title={name}
            />
          </div>
        ))}
      </AnimatePresence>
    </Wrapper>
  )
}
