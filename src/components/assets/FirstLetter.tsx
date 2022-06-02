import styled from 'styled-components'

const Character = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fourth};
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
  character: string
}

export const FirstLetter: React.FC<Props> = ({ character }) => {
  return <Character>{character}</Character>
}
