import Image from 'next/image'
import styled from 'styled-components'

const UserWrapper = styled.div`
  align-items: center;
  background: rgba(233, 232, 221, 0.5);
  border-radius: ${({ theme }) => theme.general.space}px;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  padding: ${({ theme }) => theme.general.space * 2}px;
  width: 100%;
  img {
    border-radius: 50%;
  }
`

interface Props {
  username: string
  userPic: string
}

export const User: React.FC<Props> = ({ userPic, username }) => {
  return (
    <UserWrapper>
      <Image alt={username} height={40} objectFit="cover" src={userPic} width={40} />
      <strong>{username}</strong>
    </UserWrapper>
  )
}
