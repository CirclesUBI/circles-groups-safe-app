import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

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
`
interface Props {
  amountText?: string
  amountValue?: number
  name: string
  bgColor?: string
  group?: boolean
  userPhoto?: string
  label?: string
}

export const FromToInformation: React.FC<Props> = ({
  amountText = '',
  amountValue = 0,
  bgColor = 'light',
  group = false,
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
            {group ? (
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
                <Image alt="Configuration" height={12} src="/images/crc.svg" width={12} />{' '}
                {amountValue}
              </strong>
            </p>
          </InformationText>
        </InfoWrapper>
      </InformationBlock>
    </Wrapper>
  )
}
