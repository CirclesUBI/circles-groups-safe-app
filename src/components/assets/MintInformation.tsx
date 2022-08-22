import styled from 'styled-components'

import { motion } from 'framer-motion'

import { Crc } from '@/src/components/assets/Crc'
import formatNumber from '@/src/utils/formatNumber'

const Wrapper = styled.label`
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`
const MintInfo = styled.div`
  border: 1px solid rgba(233, 232, 221, 0.9);
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  padding: ${({ theme }) => theme.general.space * 2}px;
  position: relative;
  width: 100%;
`
const LabelText = styled.h4`
  font-size: 1.2rem;
  font-weight: 400;
  display: inline-block;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.general.space / 2}px ${({ theme }) => theme.general.space}px;
  margin-bottom: ${({ theme }) => theme.general.space * 2}px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space}px;
  gap: ${({ theme }) => theme.general.space}px;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(233, 232, 221, 0.7);
  }
`
const Title = styled.span`
  font-size: 1.2rem;
`
const Value = styled.strong`
  font-size: 1.2rem;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  align-items: center;
`
const TextResult = styled.strong`
  margin-top: ${({ theme }) => theme.general.space * 2}px;
  display: block;
  font-size: 1.4rem;
`
const ValueResult = styled.strong`
  margin-top: ${({ theme }) => theme.general.space * 2}px;
  display: block;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  align-items: center;
  font-size: 1.8rem;
`

interface Props {
  fee: number
  mintAmount: number
}

export const MintInformation: React.FC<Props> = ({ fee, mintAmount }) => {
  const feeAmount = (mintAmount / 100) * fee
  const receivingTokensNumericAmount = mintAmount - feeAmount
  const receivingTokensAmount = formatNumber(receivingTokensNumericAmount, 3)
  const mintAmountNumber = formatNumber(mintAmount)

  return (
    <Wrapper
      animate={{ opacity: 1, height: 'auto' }}
      as={motion.div}
      exit={{ opacity: 0, height: 0 }}
      initial={{ opacity: 0, height: 0 }}
      key="content"
      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
      <MintInfo>
        <LabelText>
          <>Mint information</>
        </LabelText>
        <Row>
          <Title>Amount</Title>
          <Value>
            <Crc height={12} /> {mintAmountNumber}
          </Value>
        </Row>
        <Row>
          <Title>Fee</Title>
          <Value>{fee}%</Value>
        </Row>
        <Row>
          <TextResult>Due to group fee charge I will receive</TextResult>
          <ValueResult>
            <Crc /> {receivingTokensAmount}
          </ValueResult>
        </Row>
      </MintInfo>
    </Wrapper>
  )
}
