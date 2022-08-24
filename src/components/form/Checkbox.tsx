import styled, { css } from 'styled-components'

export const Checkbox = styled.div<{ active?: boolean; disabled?: boolean }>`
  background-color: ${({ active, theme: { checkBox } }) =>
    active ? checkBox.backgroundColorActive : checkBox.backgroundColor};
  border-color: ${({ active, theme: { checkBox } }) =>
    active ? checkBox.borderColorActive : checkBox.borderColor};
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  height: ${({ theme: { checkBox } }) => checkBox.dimensions};
  transition: all 0.3s linear;
  width: ${({ theme: { checkBox } }) => checkBox.dimensions};
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
  &:after {
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    height: 8px;
    width: 8px;
  }
`
