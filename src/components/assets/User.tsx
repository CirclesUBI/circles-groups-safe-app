import styled from 'styled-components'

import { isAddress } from '@ethersproject/address'

import { Crc } from '@/src/components/assets/Crc'
import { shortenAddress } from '@/src/utils/tools'

const UserName = styled.div`
  font-weight: 700;
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
`

const UserInformation = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  > span {
    flex-shrink: 0;
  }
`

const Tokens = styled.div`
  align-items: center;
  display: flex;
  font-weight: 500;
  gap: ${({ theme }) => theme.general.space / 2}px;
  > span {
    flex-shrink: 0;
  }
`

const UserWrapper = styled.div`
  align-items: center;
  background-color: rgba(233, 232, 221, 0.5);
  border-radius: ${({ theme }) => theme.general.borderRadius};
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  gap: ${({ theme }) => theme.general.space * 2}px;
  padding: ${({ theme }) => `${theme.general.space * 2}px`};
  position: relative;
  width: 100%;
  img {
    border-radius: 50%;
    flex-shrink: 0;
  }
  &.header {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 30px;
    padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
    ${UserName} {
      font-weight: 500;
    }
  }
  &.clean {
    background-color: transparent;
    font-size: 1.6rem;
    padding: 0;
    margin: ${({ theme }) => `${theme.general.space * 2}px`};
    width: auto;
    ${Tokens} {
      font-weight: 700;
    }
  }
`
const formatName = (text: string) => {
  if (isAddress(text)) {
    return shortenAddress(text)
  }
  return text
}

interface Props {
  username: string
  userTokens: string
  userImage?: React.ReactNode
  headerStyle?: string
}

export const User: React.FC<Props> = ({ headerStyle = '', userImage, userTokens, username }) => {
  return (
    <UserWrapper className={headerStyle}>
      <UserInformation>
        {userImage}
        <UserName>@{formatName(username)}</UserName>
      </UserInformation>
      <Tokens>
        <Crc /> {userTokens}
      </Tokens>
    </UserWrapper>
  )
}
