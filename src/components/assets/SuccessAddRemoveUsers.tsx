import Image from 'next/image'
import styled from 'styled-components'

import { motion } from 'framer-motion'

const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.general.space}px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.fourth};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  margin-top: ${({ theme }) => theme.general.space * 6}px;
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px;
  p {
    text-align: center;
    font-size: 1.8rem;
    margin: 0;
    strong {
      display: block;
    }
  }
`
const ImageBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  numberMembers: number
  isAdd?: boolean
}

export const SuccessAddRemoveUsers: React.FC<Props> = ({ isAdd = false, numberMembers = '' }) => {
  return (
    <Success
      animate={{ opacity: 1 }}
      as={motion.div}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1, type: 'spring', stiffness: 1000, damping: 100 }}
    >
      <ImageBox>
        <Image alt="Failed" height={16} src="/images/icon-success.svg" width={23} />
      </ImageBox>
      <p>
        <strong>{numberMembers} members</strong> were succesfully {isAdd ? 'added' : 'removed'}.
      </p>
    </Success>
  )
}
