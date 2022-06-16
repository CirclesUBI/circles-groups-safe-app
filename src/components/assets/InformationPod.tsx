import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

const InformationBlock = styled.div<{ bgColor: string }>`
  background-color: ${(props) => {
    switch (props.bgColor) {
      case 'lightest':
        return 'rgba(233, 232, 221, 0.3)'
      default:
        return 'rgba(233, 232, 221, 0.5)'
    }
  }};
  font-weight: ${(props) => {
    switch (props.bgColor) {
      case 'light':
        return '700'
      default:
        return '500'
    }
  }};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space / 2}px;
  padding: ${({ theme }) => theme.general.space * 2}px;
  border-radius: ${({ theme }) => theme.general.borderRadius};
  font-size: 1.6rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.primary};
  small {
    display: block;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.2;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.textColor};
  }
`
const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.general.space * 2}px;
`
const Information = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.general.space / 2}px;
`
const Value = styled.p`
  flex-shrink: 1;
  margin: 0;
  word-break: break-word;
`

const LinkCanEdit = styled.a`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 22px;
  justify-content: center;
  width: 22px;
  flex-shrink: 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`

interface Props {
  label?: string
  text: string
  bgColor?: string
  owner?: boolean
  circles?: boolean
  icon?: ReactNode
}

export const InformationPod: React.FC<Props> = ({
  bgColor = 'lightest',
  icon,
  label,
  owner = false,
  text,
}) => {
  return (
    <InformationBlock bgColor={bgColor}>
      {label && <small>{label}</small>}
      <TextWrapper>
        <Information>
          {icon}
          <Value>{text}</Value>
        </Information>
        {owner && (
          <Link href="/admin/group-configurationn" passHref>
            <LinkCanEdit>
              <Image alt="Configuration" height={12} src="/images/icon-edit.svg" width={12} />
            </LinkCanEdit>
          </Link>
        )}
      </TextWrapper>
    </InformationBlock>
  )
}
