import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'
import { FirstLetter } from '@/src/components/assets/FirstLetter'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space / 2}px;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-size: 1.6rem;
  align-items: center;
  justify-content: space-between;
`
const InformationBlock = styled.div<{ bgColor: string }>`
  background-color: rgba(233, 232, 221, 0.7);
  padding: ${({ theme }) => theme.general.space * 2}px;
  border-radius: 40px;
  color: ${({ theme }) => theme.colors.primary};
`
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.general.space * 2}px;
  justify-content: flex-start;
`
const InformationImage = styled.span`
  position: relative;
  flex-shrink: 0;
  img {
    border-radius: 50%;
  }
`
const InformationText = styled.span`
  display: flex;
  flex-direction: column;
  h4,
  p {
    margin: 0;
    padding: 0;
  }
  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
      flex-direction: row;
      gap: ${({ theme }) => theme.general.space}px;
    }
  }
  strong {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.general.space}px;
  }
`
interface Props {
  amountText?: string
  amountValue?: number
  name: string
  bgColor?: string
  isGroup?: boolean
  userPhoto?: string
  label?: string
}

export const TransferUserInformation: React.FC<Props> = ({
  amountText = '',
  amountValue = 0,
  bgColor = 'light',
  isGroup = false,
  label = '',
  name,
  userPhoto = '',
}) => {
  return (
    <Wrapper>
      {label && (
        <Label>
          <strong>{label}</strong>
        </Label>
      )}
      <InformationBlock bgColor={bgColor}>
        <InfoWrapper>
          <InformationImage>
            {isGroup ? (
              <FirstLetter character={name.charAt(0)} />
            ) : (
              <Image alt={name} height={40} src={userPhoto} width={40} />
            )}
          </InformationImage>
          <InformationText>
            <h4>{name}</h4>
            <p>
              {amountText}{' '}
              <strong>
                <Crc /> {amountValue}
              </strong>
            </p>
          </InformationText>
        </InfoWrapper>
      </InformationBlock>
    </Wrapper>
  )
}
