import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { FirstLetter } from '@/src/components/assets/FirstLetter'

const TitleWrapper = styled.div`
  align-items: flex-start;
  justify-content: space-between;
  display: flex;
  gap: ${({ theme }) => theme.general.space * 2}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 4}px;
  border-bottom: 1px solid #e0e0e0; ;
`

const TitleInformation = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.general.space * 4}px;
`
const GroupText = styled.div``
const GroupName = styled.h1`
  line-height: 1;
  margin: 0 0 ${({ theme }) => theme.general.space / 4}px;
  padding: 0;
`
const GroupInformation = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 16px;
`

const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
`

const LinkConfiguration = styled.a`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
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
const Amount = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.primary};
  gap: ${({ theme }) => theme.general.space / 2}px;
  margin-right: ${({ theme }) => theme.general.space}px;
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

interface Props {
  text: string
  hasBackButton?: boolean
  buttonHref: string
  information?: string
}

export const TitleGroup: React.FC<Props> = ({
  buttonHref = '',
  hasBackButton = false,
  information = 'Manage group',
  text,
}) => {
  const router = useRouter()

  return (
    <TitleWrapper>
      <TitleInformation>
        <FirstLetter character={text.charAt(0)} />
        <GroupText>
          <GroupName>{text}</GroupName>
          <GroupInformation>{information}</GroupInformation>
        </GroupText>
      </TitleInformation>

      <Actions>
        <Amount>
          <Image alt="Configuration" height={15} src="/images/crc.svg" width={11} />
          7.268
        </Amount>
        <Link href={buttonHref} passHref>
          <LinkConfiguration>
            <Image
              alt="Configuration"
              height={12}
              src="/images/icon-configuration.svg"
              width={12}
            />
          </LinkConfiguration>
        </Link>

        {hasBackButton && (
          <Back onClick={() => router.back()}>
            <Image alt="Close" height={12} src="/images/icon-back.svg" width={8} />
          </Back>
        )}
      </Actions>
    </TitleWrapper>
  )
}
