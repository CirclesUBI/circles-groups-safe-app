import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { Crc } from '@/src/components/assets/Crc'
import { stringToValidFloat } from '@/src/utils/formatNumber'

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
  mintAmount: string
}

export const MintInformation: React.FC<Props> = ({ fee, mintAmount }) => {
  const dollarUSLocale = Intl.NumberFormat('en-US')
  // @TODO Change math count.
  const feeValue = fee * 1
  const tokensMaths =
    stringToValidFloat(mintAmount) > 0
      ? stringToValidFloat(mintAmount) - (stringToValidFloat(mintAmount) / 100) * feeValue
      : 0
  const tokens = dollarUSLocale.format(tokensMaths)

  const mintAmountNumber = dollarUSLocale.format(stringToValidFloat(mintAmount))

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
          <Value>{feeValue}%</Value>
        </Row>
        <Row>
          <TextResult>Due to group fee charge you will receive</TextResult>
          <ValueResult>
            <Crc /> {tokens}
          </ValueResult>
        </Row>
      </MintInfo>
    </Wrapper>
  )
}
