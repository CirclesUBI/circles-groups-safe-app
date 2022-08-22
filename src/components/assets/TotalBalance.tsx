import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.fourth};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-size: 1.4rem;
  margin: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px 0;
  display: block;
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  strong {
    font-size: 2.1rem;
    display: block;
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
      font-size: 2.8rem;
    }
  }
`

interface Props {
  userTokens: string
}

export const TotalBalance: React.FC<Props> = ({ userTokens }) => {
  return (
    <Wrapper>
      Total Tokens
      <strong>
        <Crc /> {userTokens}
      </strong>
    </Wrapper>
  )
}
