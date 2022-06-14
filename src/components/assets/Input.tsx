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
  value?: string
}

export const Input: React.FC<Props> = ({
  information = '',
  label = '',
  mandatory,
  name = '',
  placeholder = '',
  type = 'text',
  value = '',
}) => {
  return (
    <Wrapper>
      <LabelText>
        <strong>
          {label} {mandatory && '*'}
        </strong>
        {information && <Tooltip text={information} />}
      </LabelText>
      <InputField name={name ? name : label} placeholder={placeholder} type={type} value={value} />
    </Wrapper>
  )
}
