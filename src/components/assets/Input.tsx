import Image from 'next/image'
import styled from 'styled-components'

import { Tooltip } from '@/src/components/assets/Tooltip'

const Wrapper = styled.label`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-weight: 500;
  font-size: 16px;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space}px;
`
const InputFieldWrapper = styled.div`
  position: relative;
`
const InputField = styled.input`
  background: rgba(233, 232, 221, 0.7);
  border: 1px solid rgba(233, 232, 221, 0.7);
  border-radius: 60px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  padding: ${({ theme }) => theme.general.space * 2}px;
  width: 100%;
  transition: all 0.2s linear;
  &:active,
  &:focus,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    outline: ${({ theme }) => theme.colors.primary} auto 1px;
  }
  &.icon {
    padding-left: ${({ theme }) => theme.general.space * 5}px;
  }
`
const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Icon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ theme }) => theme.general.space * 2}px;
  pointer-events: none;
`

interface Props {
  label: string
  mandatory: boolean
  name?: string
  placeholder?: string
  type?: string
  information?: string
  tokens?: boolean
}

export const Input: React.FC<Props> = ({
  information = '',
  label = '',
  mandatory,
  name = '',
  placeholder = '',
  tokens = false,
  type = 'text',
}) => {
  return (
    <Wrapper>
      <LabelText>
        <strong>
          {label} {mandatory && '*'}
        </strong>
        {information && <Tooltip text={information} />}
      </LabelText>
      <InputFieldWrapper>
        {tokens && (
          <Icon>
            <Image alt="Configuration" height={15} src="/images/crc.svg" width={11} />
          </Icon>
        )}
        <InputField
          className={tokens ? 'icon' : 'noIcon'}
          name={name ? name : label}
          placeholder={placeholder}
          type={type}
        />
      </InputFieldWrapper>
    </Wrapper>
  )
}
