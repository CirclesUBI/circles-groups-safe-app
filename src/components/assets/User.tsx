import Image from 'next/image'
import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'

const UserWrapper = styled.div<{ headerStyle: boolean }>`
  align-items: center;
  background: ${(props) =>
    props.headerStyle ? ({ theme }) => theme.colors.primary : 'rgba(233, 232, 221, 0.5)'};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  gap: ${({ theme }) => theme.general.space * 2}px;
  padding: ${(props) =>
    props.headerStyle
      ? ({ theme }) => theme.general.space + 'px'
      : ({ theme }) => theme.general.space * 2 + 'px'};
  position: relative;
  width: 100%;
  img {
    border-radius: 50%;
    flex-shrink: 0;
  }
`
const UserName = styled.div<{ headerStyle: boolean }>`
  font-weight: ${(props) => (props.headerStyle ? 500 : 700)};
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

interface Props {
  username: string
  userTokens: number
  userImage?: React.ReactNode
  headerStyle?: boolean
}

export const User: React.FC<Props> = ({ headerStyle = false, userImage, userTokens, username }) => {
  return (
    <UserWrapper headerStyle={headerStyle}>
      <UserInformation>
        {userImage}
        <UserName headerStyle={headerStyle}>{username}</UserName>
      </UserInformation>
      <Tokens>
        <Crc /> {userTokens}
      </Tokens>
    </UserWrapper>
  )
}
