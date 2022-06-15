import { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ typeActivity: string }>`
  align-items: center;
  background-color: ${(props) =>
    props.typeActivity == 'information'
      ? ({ theme }) => theme.colors.tertiary
      : ({ theme }) => theme.colors.fourth};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.fontFamilyHeading};
  font-size: 32px;
  font-weight: 900;
  height: 40px;
  justify-content: center;
  text-align: center;
  width: 40px;
  flex-shrink: 0;
`

interface Props {
  icon: ReactNode
  type?: string
}

export const ActivityType: React.FC<Props> = ({ icon, type = '' }) => {
  return <Wrapper typeActivity={type}>{icon}</Wrapper>
}
