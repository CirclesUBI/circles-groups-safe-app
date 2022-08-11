import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import { isAddress } from '@ethersproject/address'

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
    justify-content: flex-start;
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
  amountValue?: string
  name: string
  bgColor?: string
  photo?: string
  label?: string
  address?: string
}

const formatName = (text: string) => {
  if (isAddress(text)) {
    return `${text.slice(0, 7)}...${text.slice(-4)}`
  }
  return text
}

export const TransferUserInformation: React.FC<Props> = ({
  address,
  amountText,
  amountValue,
  bgColor = 'light',
  label,
  name,
  photo,
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
            {!photo ? (
              <FirstLetter character={name.charAt(0)} />
            ) : (
              <Image alt={name} height={40} src={photo} width={40} />
            )}
          </InformationImage>
          <InformationText>
            <h4>@{formatName(name)}</h4>
            {address && <p>{address}</p>}
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
