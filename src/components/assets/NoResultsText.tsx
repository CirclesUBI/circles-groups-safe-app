import React from 'react'
import styled from 'styled-components'

const NoResults = styled.h4`
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
  border-top: 1px solid #e0e0e0;
  &.notification {
    background-color: rgba(233, 232, 221, 0.3);
    border: 1px solid #e0e0e0;
    border-radius: ${({ theme }) => theme.general.borderRadius};
    font-size: 1.4rem;
    font-weight: 500;
    padding: ${({ theme }) => theme.general.space * 2}px;
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.general.space}px;
  }
`

export const NoResultsText: React.FC<{ className?: string; text: string }> = ({
  className,
  text,
}) => {
  return <NoResults className={className}>{text}</NoResults>
}
