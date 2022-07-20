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
  switchTab: (gotoTab?: number) => void
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
  LinksList: { title: string; href: string; gotoTab?: number }[]
}

export const ListItemMainMenu: React.FC<Props> = ({ LinksList, onClose, switchTab, variants }) => {
  return (
    <Wrapper as={motion.div} variants={variants}>
      <AnimatePresence>
        {LinksList.map(({ gotoTab, href, title }, index) => (
          <div key={`links_${index}`}>
            <ItemMainMenu
              closeMenu={() => {
                onClose(), switchTab(gotoTab)
              }}
              href={href}
              title={title}
            />
          </div>
        ))}
      </AnimatePresence>
    </Wrapper>
  )
}
