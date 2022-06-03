import styled from 'styled-components'

const Row = styled.div<{ columnsNumber: number }>`
  display: grid;
  gap: ${({ theme }) => theme.general.space * 2}px;
  grid-template-columns: unset;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    grid-template-columns: repeat(${(props) => props.columnsNumber}, 1fr);
  }
`

interface Props {
  columnsNumber: number
}
export const Columns: React.FC<Props> = ({ children, columnsNumber }) => {
  return (
    <>
      <Row columnsNumber={columnsNumber}>{children}</Row>
    </>
  )
}
