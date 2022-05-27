import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: #fff;
  }
`
const IconAlert = styled.div`
  position: relative;
`
const Badge = styled.span`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.alert};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font-size: 1rem;
  height: 15px;
  justify-content: center;
  position: absolute;
  right: -8px;
  top: -4px;
  width: 15px;
`

export const AlertIcon: React.FC<HTMLAttributes<SVGElement>> = (props) => {
  const { className, ...restProps } = props

  return (
    <IconAlert>
      <Wrapper
        className={`CirclesLogo ${className}`}
        fill="none"
        height="21"
        viewBox="0 0 17 21"
        width="17"
        xmlns="http://www.w3.org/2000/svg"
        {...restProps}
      >
        <g clipPath="url(#clip0_150_836)">
          <path
            className="fill"
            d="M2.96683 15.3025H14.8752V8.98248C14.8752 5.4613 12.2093 2.60601 8.92104 2.60601C5.63277 2.60601 2.96683 5.4613 2.96683 8.98307V15.3025ZM8.92104 0.79248C13.1484 0.79248 16.5762 4.45895 16.5762 8.98248V17.1166H1.26587V8.98248C1.26587 4.45895 4.69373 0.79248 8.92104 0.79248ZM6.7947 18.0231H11.0474C11.0474 18.6243 10.8234 19.201 10.4246 19.6261C10.0258 20.0513 9.48498 20.2901 8.92104 20.2901C8.3571 20.2901 7.81626 20.0513 7.41749 19.6261C7.01872 19.201 6.7947 18.6243 6.7947 18.0231Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_150_836">
            <rect
              className="fill"
              height="20"
              transform="translate(0.921021 0.743652)"
              width="16"
            />
          </clipPath>
        </defs>
      </Wrapper>
      <Badge>4</Badge>
    </IconAlert>
  )
}
