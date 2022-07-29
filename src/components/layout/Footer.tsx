import styled from 'styled-components'

import { InnerContainer as BaseInnerContainer } from '@/src/components/pureStyledComponents/layout/InnerContainer'
import { BaseParagraph } from '@/src/components/pureStyledComponents/text/BaseParagraph'

const Wrapper = styled.footer`
  flex-shrink: 0;
  margin-bottom: 0;
  margin-top: auto;
  padding-bottom: 0;
  padding-top: 40px;
  width: 100%;
  z-index: -1;
`

const InnerContainer = styled(BaseInnerContainer)`
  align-items: center;
  background-color: transparent;
  box-shadow: unset;
  display: grid;
  grid-template-columns: 1fr;
`

const Paragraph = styled(BaseParagraph)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  line-height: 1.5;
  margin: 0;
  order: 2;
  text-align: center;
`

export const Footer: React.FC = (props) => {
  const year = new Date().getFullYear()

  return (
    <Wrapper {...props}>
      <InnerContainer>
        <Paragraph>Copyright © {year} • BootNode.dev • All Rights Reserved</Paragraph>
      </InnerContainer>
    </Wrapper>
  )
}
