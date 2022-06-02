import styled from 'styled-components'

const Li = styled.li`
  align-items: flex-start;
  list-style: none;
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.general.space * 3}px;
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: ${({ theme }) => theme.general.space * 3}px;
  }
  &:nth-child(3n + 2) > div > div:first-child {
    background-color: ${({ theme }) => theme.colors.fifth};
  }
  &:nth-child(3n + 3) > div > div:first-child {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    flex-direction: row;
  }
`

export const ListItem: React.FC = ({ children }) => {
  return <Li>{children}</Li>
}
