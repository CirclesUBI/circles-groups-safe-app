import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import { isAddress } from '@ethersproject/address'

import { Crc } from '@/src/components/assets/Crc'
import { FirstLetter } from '@/src/components/assets/FirstLetter'
import { shortenAddress } from '@/src/utils/tools'

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
  border-radius: ${({ theme }) => theme.general.borderRadius};
  color: ${({ theme }) => theme.colors.primary};
`
const InfoWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.general.space * 2}px;
  justify-content: flex-start;
`
const InformationImage = styled.span`
  position: relative;
  flex-shrink: 0;
  margin-top: 5px;
  img {
    border-radius: 50%;
  }
`
const Address = styled.div`
  margin: ${({ theme }) => theme.general.space / 2}px 0 ${({ theme }) => theme.general.space}px;
  word-wrap: break-word;
  display: inline-block;
`
const InformationText = styled.span`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 1%;
  h4,
  p {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: ${({ theme }) => theme.general.space / 2}px;
    align-items: flex-start;
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
      flex-direction: row;
      gap: ${({ theme }) => theme.general.space}px;
    }
  }
  strong {
    flex-grow: 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.general.space}px;
    border-radius: ${({ theme }) => theme.general.borderRadius};
    background-color: rgba(255, 255, 255, 0.3);
    padding: ${({ theme }) => theme.general.space / 2}px ${({ theme }) => theme.general.space}px;
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    }
  }
`
const InformationValues = styled.div`
  margin-top: ${({ theme }) => theme.general.space / 2}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space / 2}px;
  p {
    margin: 0;
  }
`
interface Props {
  amountText?: string
  amountValue?: string
  name: string
  bgColor?: string
  groupUserTokens?: string
  photo?: string
  label?: string
  address?: string
}

const formatName = (text: string) => {
  if (isAddress(text)) {
    return shortenAddress(text)
  }
  return text
}

export const TransferUserInformation: React.FC<Props> = ({
  address,
  amountText,
  amountValue,
  bgColor = 'light',
  groupUserTokens,
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
            {address && <Address>{address}</Address>}
            <InformationValues>
              <p>
                {amountText}{' '}
                <strong>
                  <Crc /> {amountValue}
                </strong>
              </p>
              {groupUserTokens && (
                <p>
                  My group tokens:
                  <strong>
                    <Crc /> {groupUserTokens}
                  </strong>
                </p>
              )}
            </InformationValues>
          </InformationText>
        </InfoWrapper>
      </InformationBlock>
    </Wrapper>
  )
}
