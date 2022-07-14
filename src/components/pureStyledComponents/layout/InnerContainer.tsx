import styled from 'styled-components'

import { ContainerPadding } from '@/src/components/pureStyledComponents/layout/ContainerPadding'

export const InnerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  box-shadow: 0px 63px 109px rgba(0, 0, 0, 0.07), 0px 40.8333px 63.8356px rgba(0, 0, 0, 0.0531481),
    0px 24.2667px 34.7185px rgba(0, 0, 0, 0.0425185), 0px 12.6px 17.7125px rgba(0, 0, 0, 0.035),
    0px 5.13333px 8.88148px rgba(0, 0, 0, 0.0274815),
    0px 1.16667px 4.28935px rgba(0, 0, 0, 0.0168519);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  transition: all 0.3s ease-in-out;
  width: auto;
  position: relative;
  z-index: 0;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    margin: 0 auto ${({ theme }) => theme.general.space * 2}px;
    width: ${({ theme }) => theme.general.containerWidth};
  }
  ${ContainerPadding}
`
