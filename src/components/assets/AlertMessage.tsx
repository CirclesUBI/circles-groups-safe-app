import Image from 'next/image'
import styled from 'styled-components'

import { motion } from 'framer-motion'

import { ButtonCancel, ButtonConfirm } from '@/src/components/pureStyledComponents/buttons/Button'

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 100;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    height: 100%;
    width: 100%;
    opacity: 0.9;
  }
`
const Message = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.general.space * 2}px 0;
  border-radius: ${({ theme }) => theme.general.borderRadius};
  position: relative;
  width: 350px;
  max-width: 80%;
  position: relative;
  z-index: 1;
  box-shadow: 0px 63px 109px rgba(0, 0, 0, 0.07), 0px 40.8333px 63.8356px rgba(0, 0, 0, 0.0531481),
    0px 24.2667px 34.7185px rgba(0, 0, 0, 0.0425185), 0px 12.6px 17.7125px rgba(0, 0, 0, 0.035),
    0px 5.13333px 8.88148px rgba(0, 0, 0, 0.0274815),
    0px 1.16667px 4.28935px rgba(0, 0, 0, 0.0168519);
`
const Close = styled.button`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 28px;
  position: absolute;
  top: ${({ theme }) => theme.general.space}px;
  right: ${({ theme }) => theme.general.space}px;
  width: 28px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`
const Text = styled.h3`
  line-height: 1.6;
  padding: ${({ theme }) => theme.general.space * 5}px ${({ theme }) => theme.general.space * 2}px
    ${({ theme }) => theme.general.space * 2}px;
`
const Actions = styled.div`
  align-items: center;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.general.space}px;
  margin-top: ${({ theme }) => theme.general.space * 3}px;
  padding: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px 0;
`

interface Props {
  text?: string
  onCloseAlert: () => void
  confirmAction: () => void
}

export const AlertMessage: React.FC<Props> = ({
  confirmAction,
  onCloseAlert,
  text = 'Are you sure you want to add USERNAME to your group?',
}) => {
  return (
    <Wrapper
      animate={{ opacity: 1 }}
      as={motion.section}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.3, type: 'spring', stiffness: 1000, damping: 100 }}
    >
      <Message>
        <Close onClick={onCloseAlert}>
          <Image alt="Close" height={10} src="/images/icon-close.svg" width={10} />
        </Close>
        <Text>{text}</Text>
        <Actions>
          <ButtonCancel onClick={onCloseAlert}>Cancel</ButtonCancel>
          <ButtonConfirm onClick={confirmAction}>Confirm</ButtonConfirm>
        </Actions>
      </Message>
    </Wrapper>
  )
}
