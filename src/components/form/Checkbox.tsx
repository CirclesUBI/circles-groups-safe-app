import styled, { css } from 'styled-components'

export const Checkbox = styled.div<{ active?: boolean; disabled?: boolean }>`
  background-color: ${({ active, theme: { checkBox } }) =>
    active ? checkBox.backgroundColorActive : checkBox.backgroundColor};
  border-color: ${({ theme: { checkBox } }) => checkBox.borderColor};
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
  height: ${({ theme: { checkBox } }) => checkBox.dimensions};
  transition: all 0.15s linear;
  width: ${({ theme: { checkBox } }) => checkBox.dimensions};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`
