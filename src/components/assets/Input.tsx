import { ReactNode } from 'react'
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
  appearance: none;
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
    border: 1px solid rgba(233, 232, 221, 0.7);
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.colors.primary};
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

interface Props {
  label: string
  mandatory: boolean
  name?: string
  placeholder?: string
  type?: string
  information?: string
  icon?: ReactNode
  value?: string
}

export const Input: React.FC<Props> = ({
  icon = '',
  information = '',
  label = '',
  mandatory,
  name = '',
  placeholder = '',
  type = 'text',
  value = '',
}) => {
  console.log(typeof icon)
  return (
    <Wrapper>
      <LabelText>
        <strong>
          {label} {mandatory && '*'}
        </strong>
        {information && <Tooltip text={information} />}
      </LabelText>
      <InputFieldWrapper>
        {icon}
        <InputField
          className={icon ? 'icon' : 'noIcon'}
          name={name ? name : label}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </InputFieldWrapper>
    </Wrapper>
  )
}
