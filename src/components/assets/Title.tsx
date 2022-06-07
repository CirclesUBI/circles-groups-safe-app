import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'

const TitleWrapper = styled.h1`
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: ${({ theme }) => theme.general.space * 2}px;
  line-height: 1;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
`

const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
`
const Back = styled.button`
  align-items: center;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 28px;
  justify-content: center;
  width: 28px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`
const ButtonText = styled.a`
  display: block;
`

interface Props {
  text: string
  hasBackButton?: boolean
  hasLinkButton?: boolean
  buttonText?: string
  buttonHref?: string
}

export const Title: React.FC<Props> = ({
  buttonHref = '',
  buttonText = '',
  hasBackButton = false,
  hasLinkButton = false,
  text,
}) => {
  const router = useRouter()

  return (
    <TitleWrapper>
      {text}
      <Actions>
        {hasLinkButton && (
          <Link href={buttonHref} passHref>
            <LinkButton>{buttonText}</LinkButton>
          </Link>
        )}
        {hasBackButton && (
          <Back onClick={() => router.back()}>
            <Image alt="Close" height={12} src="/images/icon-back.svg" width={8} />
          </Back>
        )}
      </Actions>
    </TitleWrapper>
  )
}
