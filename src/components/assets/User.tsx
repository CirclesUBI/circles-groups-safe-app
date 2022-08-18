import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'

const UserWrapper = styled.div<{ headerStyle: string }>`
  align-items: center;
  background: ${(props) =>
    props.headerStyle === 'header'
      ? ({ theme }) => theme.colors.primary
      : props.headerStyle === 'clean'
      ? 'transparent'
      : 'rgba(233, 232, 221, 0.5)'};
  border-radius: ${(props) =>
    props.headerStyle === 'header' ? '30px' : ({ theme }) => theme.general.borderRadius};
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => (props.headerStyle === 'clean' ? '1.6rem' : '1.4rem')};
  gap: ${({ theme }) => theme.general.space * 2}px;
  padding: ${(props) =>
    props.headerStyle === 'header'
      ? ({ theme }) => `${theme.general.space}px ${theme.general.space * 2}px`
      : ({ theme }) => `${theme.general.space * 2}px`};
  position: relative;
  width: 100%;
  img {
    border-radius: 50%;
    flex-shrink: 0;
  }
`
const UserName = styled.div<{ headerStyle: string }>`
  font-weight: ${(props) => (props.headerStyle === 'header' ? 500 : 700)};
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

const Tokens = styled.div<{ headerStyle: string }>`
  align-items: center;
  display: flex;
  font-weight: ${(props) => (props.headerStyle === 'clean' ? 700 : 500)};
  gap: ${({ theme }) => theme.general.space / 2}px;
  > span {
    flex-shrink: 0;
  }
`

interface Props {
  username: string
  userTokens: string
  userImage?: React.ReactNode
  headerStyle?: string
}

export const User: React.FC<Props> = ({ headerStyle = '', userImage, userTokens, username }) => {
  return (
    <UserWrapper headerStyle={headerStyle}>
      <UserInformation>
        {userImage}
        <UserName headerStyle={headerStyle}>@{username}</UserName>
      </UserInformation>
      <Tokens headerStyle={headerStyle}>
        <Crc /> {userTokens}
      </Tokens>
    </UserWrapper>
  )
}
