import { ReactNode } from 'react'
import styled from 'styled-components'

import { Toast, toast } from 'react-hot-toast'

import { Close } from '@/src/components/assets/Close'

const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.general.space * 2}px;
  grid-template-columns: 24px auto;
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
  min-height: 70px;
  width: 300px;
  max-width: 100%;
  border-radius: ${({ theme: { toast } }) => toast.borderRadius};
  border: none;
  background-color: ${({ theme: { toast } }) => toast.backgroundColor};
  box-shadow: ${({ theme: { toast } }) => toast.boxShadow};
  position: relative;
  z-index: 1000;
  a {
    font-size: 1.3rem;
    color: ${({ theme: { colors } }) => colors.white};
    &:hover {
      color: ${({ theme: { colors } }) => colors.secondary};
    }
  }
  &.failed {
    background-color: ${({ theme }) => theme.colors.error};
    a {
      &:hover {
        color: ${({ theme: { colors } }) => colors.black};
      }
    }
  }
  &.success {
    background-color: ${({ theme }) => theme.colors.success};
    a {
      &:hover {
        color: ${({ theme: { colors } }) => colors.black};
      }
    }
  }
  &.enter {
    animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running in;
  }
  &.leave {
    animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running out;
  }
  @keyframes in {
    0% {
      transform: translate3d(0, 200%, 0) scale(0.6);
      opacity: 0.5;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 1;
    }
  }
  @keyframes out {
    0% {
      transform: translate3d(0, 0, -1px) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 150%, -1px) scale(0.6);
      opacity: 0;
    }
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  flex-shrink: 0;
`

const InnerWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
`

const TextContainer = styled.div`
  padding: 5px 0;
`

const ButtonClose = styled.button`
  cursor: pointer;
  margin: 0;
  border: 0;
  padding: 0;
  outline: none;
  background: transparent;
  position: absolute;
  top: ${({ theme }) => theme.general.space}px;
  right: ${({ theme }) => theme.general.space}px;
  z-index: 1000;
`

const Title = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
`

const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  margin: ${({ theme }) => theme.general.space / 4}px 0 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
  white-space: pre-wrap;
  word-break: break-word;
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
  <Wrapper className={`${toastStyle} ${t.visible ? ' enter ' : ' leave '}`}>
    <IconContainer>{icon}</IconContainer>
    <InnerWrapper>
      <TextContainer>
        <Title>{title}</Title>
        {link && (
          <a href={link.url} rel="noreferrer" target="_blank">
            {link.text}
          </a>
        )}
        {message && <Text>{message}</Text>}
      </TextContainer>
    </InnerWrapper>
    <ButtonClose onClick={() => toast.dismiss(t.id)}>
      <Close />
    </ButtonClose>
  </Wrapper>
)
