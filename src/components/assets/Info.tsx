import Image from 'next/image'
import styled from 'styled-components'

const InfoWrapper = styled.span`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  height: 16px;
  padding: 3px;
  transition: all 0.3s ease-in-out;
  width: 16px;
`

export const Info: React.FC = () => {
  return (
    <InfoWrapper>
      {' '}
      <Image alt="information" height={14} src="/images/icon-information.svg" width={14} />
    </InfoWrapper>
  )
}
