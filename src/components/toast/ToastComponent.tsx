import { ReactNode } from 'react'
import styled from 'styled-components'

import { Toast, toast } from 'react-hot-toast'

import { Close } from '@/src/components/assets/Close'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 200px;
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
  min-height: 70px;
  border-radius: ${({ theme: { toast } }) => toast.borderRadius};
  border: none;
  background-color: ${({ theme: { toast } }) => toast.backgroundColor};
  box-shadow: ${({ theme: { toast } }) => toast.boxShadow};
  position: relative;
  z-index: 1000;
  &.failed {
    background-color: ${({ theme }) => theme.colors.error};
  }
  &.success {
    background-color: ${({ theme }) => theme.colors.success};
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const InnerWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
`

const TextContainer = styled.div`
  padding: 5px;
`

const ButtonClose = styled.button`
  cursor: pointer;
  margin: 0;
  border: 0;
  padding: 0;
  outline: none;
  background: transparent;
`

const Title = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
`

const Link = styled.a`
  font-size: 1.2rem;
  color: ${({ theme: { colors } }) => colors.textColorLight};
`

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  margin: ${({ theme }) => theme.general.space / 4}px 0 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
`

export const ToastComponent = ({
  icon,
  link,
  message,
  t,
  title,
  toastStyle,
}: {
  icon: ReactNode
  link?: {
    url: string
    text: string
  }
  message?: string
  t: Toast
  title: string
  toastStyle: string
}) => (
  <Wrapper className={toastStyle}>
    <IconContainer>{icon}</IconContainer>
    <InnerWrapper>
      <TextContainer>
        <Title>{title}</Title>
        {link && (
          <Link href={link.url} rel="noreferrer" target="_blank">
            {link.text}
          </Link>
        )}
        {message && <Text>{message}</Text>}
      </TextContainer>
      <ButtonClose onClick={() => toast.dismiss(t.id)}>
        <Close />
      </ButtonClose>
    </InnerWrapper>
  </Wrapper>
)
