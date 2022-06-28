import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .fill {
    fill: ${({ theme: { colors } }) => colors.white};
  }
`

export const Loading: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`loading ${props.className}`}
    fill="none"
    height="100"
    viewBox="0 0 100 100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="6" cy="50" fill="#fff" r="6" stroke="none">
      <animateTransform
        attributeName="transform"
        begin="0.1"
        calcMode="spline"
        dur="1s"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        repeatCount="indefinite"
        type="translate"
        values="0 15 ; 0 -15; 0 15"
      />
    </circle>
    <circle cx="30" cy="50" fill="#fff" r="6" stroke="none">
      <animateTransform
        attributeName="transform"
        begin="0.2"
        calcMode="spline"
        dur="1s"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        repeatCount="indefinite"
        type="translate"
        values="0 12 ; 0 -12; 0 12"
      />
    </circle>
    <circle cx="54" cy="50" fill="#fff" r="6" stroke="none">
      <animateTransform
        attributeName="transform"
        begin="0.3"
        calcMode="spline"
        dur="1s"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        repeatCount="indefinite"
        type="translate"
        values="0 9 ; 0 -9; 0 9"
      />
    </circle>
  </Wrapper>
)
