import styled, { css } from 'styled-components'

import { Checkbox } from '@/src/components/form/Checkbox'

const Wrapper = styled.div<{ disabled?: boolean; active?: boolean }>`
  align-items: center;
  column-gap: 8px;
  display: grid;
  grid-template-columns: ${({ theme: { checkBox } }) => checkBox.dimensions} 1fr;
  max-width: fit-content;
  max-width: 100%;
  height: 52px;
  border: 1px solid #e0e0e0;
  padding-left: ${({ theme }) => theme.general.space * 2}px;
  flex-grow: 0;
  flex-shrink: 1;
  min-width: 33%;
  background-color: ${({ active }) => (active ? '#f8f8f5' : 'transparent')};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
        `}
`

const Label = styled.span`
  color: ${({ theme: { colors } }) => colors.textColor};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
  position: relative;
  top: 1px;
`

export const LabeledCheckbox: React.FC<{
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}> = ({ active, children, disabled, onClick, ...restProps }) => (
  <Wrapper active={active} disabled={disabled} onClick={onClick} {...restProps}>
    <Checkbox active={active} disabled={disabled} />
    <Label>{children}</Label>
  </Wrapper>
)
