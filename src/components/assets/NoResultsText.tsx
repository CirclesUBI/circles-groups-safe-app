import React from 'react'
import styled from 'styled-components'

const NoResults = styled.h4`
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
  border-top: 1px solid #e0e0e0; ;
`

export const NoResultsText: React.FC<{ text: string }> = ({ text }) => {
  return <NoResults>{text}</NoResults>
}
