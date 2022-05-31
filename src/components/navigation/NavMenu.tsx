import Link from 'next/link'
import styled from 'styled-components'

interface Props {
  isAdminLayout: boolean
}

const Nav = styled.nav`
  display: flex;
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  margin-bottom: ${({ theme }) => theme.general.space * -2}px;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  width: auto;
  position: relative;
  z-index: 0;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    margin: 0 auto;
    margin-bottom: ${({ theme }) => theme.general.space * -3}px;
    width: ${({ theme }) => theme.general.containerWidth};
  }
`
const LinkContent = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px 8px 0 0;
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
  font-size: 1.4rem;
  font-weight: 400;
  padding: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space}px
    ${({ theme }) => theme.general.space * 5}px;
  text-align: center;
  text-decoration: none;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    font-size: 1.6rem;
    padding: ${({ theme }) => theme.general.space * 3}px ${({ theme }) => theme.general.space * 2}px
      ${({ theme }) => theme.general.space * 6}px;
  }
  &.active,
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
  }
  &.active {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const NavMenu: React.FC<Props> = ({ isAdminLayout, ...restProps }) => {
  return (
    <Nav>
      <Link href="/" passHref>
        <LinkContent className={isAdminLayout ? '' : 'active'}>Groups</LinkContent>
      </Link>
      <Link href="/admin/" passHref>
        <LinkContent className={isAdminLayout ? 'active' : ''}>Manage groups</LinkContent>
      </Link>
    </Nav>
  )
}
