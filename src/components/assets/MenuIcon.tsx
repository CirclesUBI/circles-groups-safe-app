import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: #fff;
  }
`

export const MenuIcon: React.FC<HTMLAttributes<SVGElement>> = (props) => {
  const { className, ...restProps } = props

  return (
    <Wrapper
      className={`CirclesLogo ${className}`}
      fill="none"
      height="15"
      viewBox="0 0 24 15"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect className="fill" height="2" rx="1" width="24" y="0.329102" />
      <rect className="fill" height="2" rx="1" width="24" y="6.3291" />
      <rect className="fill" height="2" rx="1" width="24" y="12.3291" />
    </Wrapper>
  )
}
