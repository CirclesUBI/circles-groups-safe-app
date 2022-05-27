import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

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

export const Alert: React.FC<{ alerts: number }> = ({ alerts }) => {
  return (
    <IconAlert>
      <Image alt="Alerts" height={21} src="/images/icon-bell.svg" width={17} />
      {alerts > 0 && <Badge>{alerts}</Badge>}
    </IconAlert>
  )
}
