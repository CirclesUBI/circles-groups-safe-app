import { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

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
const InputField = styled.input<{ error: boolean }>`
  --box-shadow-color: ${(props) =>
    props.error ? ({ theme }) => theme.colors.error : ({ theme }) => theme.colors.primary};
  appearance: none;
  background: rgba(233, 232, 221, 0.7);
  border: 1px solid rgba(233, 232, 221, 0.7);
  border-radius: 60px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  padding: ${({ theme }) => theme.general.space * 2}px;
  width: 100%;
  transition: all 0.2s linear;
  border-color: ${(props) =>
    props.error ? ({ theme }) => theme.colors.error : 'rgba(233, 232, 221, 0.7)'};

  &:not(disabled) {
    &:active,
    &:focus,
    &:focus-visible {
      border-color: ${(props) =>
        props.error ? ({ theme }) => theme.colors.error : ({ theme }) => theme.colors.primary};

      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primary};
      outline: none;
      box-shadow: 0px 0px 1px 1px --box-shadow-color;
    }
  }
  &.icon {
    padding-left: ${({ theme }) => theme.general.space * 5}px;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ErrorText = styled(motion.small)`
  color: ${({ theme }) => theme.colors.error};
  text-align: right;
  margin-right: ${({ theme }) => theme.general.space * 2}px;
`

interface Props {
  disabled?: boolean
  label: string
  mandatory: boolean
  name?: string
  placeholder?: string
  type?: string
  information?: string
  icon?: ReactNode
  setValue?: (value: string) => void
  value?: string
  minLength?: number
  maxLength?: number
}

export const Input: React.FC<Props> = ({
  disabled = false,
  icon = '',
  information = '',
  label = '',
  mandatory,
  maxLength = 200,
  minLength = 2,
  name = '',
  placeholder = '',
  setValue,
  type = 'text',
  value = '',
}) => {
  const [errors, setErrors] = useState(false)
  function handleChange() {
    // Just for testing. Final validation code missing
    if (!value && mandatory) {
      setErrors(true)
    } else {
      setErrors(false)
    }
  }
  return (
    <Wrapper>
      <LabelText>
        <strong>
          {label} {mandatory && '*'}
        </strong>
        {information && <Tooltip text={information} />}
      </LabelText>
      <InputFieldWrapper className={errors ? 'whithErrors' : 'noErrors'}>
        {icon}
        <InputField
          className={icon ? 'icon' : 'noIcon'}
          disabled={disabled}
          error={errors}
          maxLength={maxLength}
          min={'0'}
          minLength={minLength}
          name={name ? name : label}
          onBlur={(e) => {
            handleChange()
          }}
          onChange={(e) => {
            setValue && setValue(String(e.target.value))
          }}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </InputFieldWrapper>
      {errors && (
        <AnimatePresence>
          <ErrorText
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            initial={{ y: -20, opacity: 0 }}
            key={name ? name : label}
            transition={{ duration: 0.2 }}
          >
            This field is required
          </ErrorText>
        </AnimatePresence>
      )}
    </Wrapper>
  )
}
