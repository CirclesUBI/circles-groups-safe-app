import styled from 'styled-components'

import { motion } from 'framer-motion'

import { Loading as LoadingIcon } from '@/src/components/assets/Loading'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const LoadingText = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: ${({ theme }) => theme.general.space}px;
  svg {
    height: 30px !important;
    width: 40px !important;
  }
`

interface Props {
  text?: string
}

export const LoadingMessage: React.FC<Props> = ({ text = 'Loading...' }) => {
  return (
    <Wrapper>
      <LoadingText
        animate={{ opacity: 1 }}
        as={motion.div}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2, type: 'spring', stiffness: 1000, damping: 100 }}
      >
        <LoadingIcon /> {text}
      </LoadingText>
    </Wrapper>
  )
}
