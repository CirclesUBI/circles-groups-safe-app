import styled, { css } from 'styled-components'

export const DisabledButtonCSS = css`
  cursor: not-allowed;
  opacity: 0.5;
`

export const ButtonCSS = css`
  align-items: center;
  border-radius: 30px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  width: min-content;
  font-family: ${({ theme }) => theme.fonts.fontFamily};
  font-size: 1.6rem;
  font-weight: 500;
  justify-content: center;
  line-height: 1.8;
  outline: none;
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 3}px;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s ease-out;
  user-select: none;
  white-space: nowrap;

  &:active {
    opacity: 0.7;
  }
`

export const ButtonPrimaryCSS = css`
  background-color: ${({ theme }) => theme.buttonPrimary.backgroundColor};
  border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
  color: ${({ theme }) => theme.buttonPrimary.color};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.backgroundColorHover};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColorHover};
    color: ${({ theme }) => theme.buttonPrimary.colorHover};
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    color: ${({ theme }) => theme.buttonPrimary.color};
    ${DisabledButtonCSS}
  }
`

export const ButtonAlertCSS = css`
  background-color: ${({ theme }) => theme.colors.alert};
  border-color: ${({ theme }) => theme.colors.alert};
  color: ${({ theme }) => theme.buttonPrimary.color};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.backgroundColorHover};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColorHover};
    color: ${({ theme }) => theme.buttonPrimary.colorHover};
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    color: ${({ theme }) => theme.buttonPrimary.color};
    ${DisabledButtonCSS}
  }
`

export const ButtonSuccessCSS = css`
  background-color: ${({ theme }) => theme.colors.success};
  border-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.buttonPrimary.color};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.backgroundColorHover};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColorHover};
    color: ${({ theme }) => theme.buttonPrimary.colorHover};
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    color: ${({ theme }) => theme.buttonPrimary.color};
    ${DisabledButtonCSS}
  }
`

export const ButtonPrimaryLineCSS = css`
  background-color: transparent;
  border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
  color: ${({ theme }) => theme.colors.primary};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    color: ${({ theme }) => theme.buttonPrimary.colorHover};
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    border-color: ${({ theme }) => theme.buttonPrimary.borderColor};
    color: ${({ theme }) => theme.buttonPrimary.color};
    ${DisabledButtonCSS}
  }
`

export const ButtonSecondaryCSS = css`
  background-color: ${({ theme }) => theme.buttonSecondary.backgroundColor};
  border-color: ${({ theme }) => theme.buttonSecondary.borderColor};
  color: ${({ theme }) => theme.buttonSecondary.color};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.buttonSecondary.backgroundColorHover};
    border-color: ${({ theme }) => theme.buttonSecondary.borderColorHover};
    color: ${({ theme }) => theme.buttonSecondary.colorHover};
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${({ theme }) => theme.buttonSecondary.borderColor};
    border-color: ${({ theme }) => theme.buttonSecondary.borderColor};
    color: ${({ theme }) => theme.buttonSecondary.color};
    ${DisabledButtonCSS}
  }
`

const BaseButton = styled.button`
  ${ButtonCSS}
`
const BaseLink = styled.a`
  ${ButtonCSS}
`

export const Button = styled(BaseButton)`
  &[disabled],
  &[disabled]:hover {
    ${DisabledButtonCSS}
  }
`

export const ButtonPrimary = styled(BaseButton)`
  ${ButtonPrimaryCSS}
`

export const ButtonSecondary = styled(BaseButton)`
  ${ButtonSecondaryCSS}
`

export const ButtonConfirm = styled(BaseButton)`
  ${ButtonSuccessCSS}
`

export const ButtonCancel = styled(BaseButton)`
  ${ButtonAlertCSS}
`

export const ButtonPrimaryLine = styled(BaseButton)`
  ${ButtonPrimaryLineCSS}
`

export const LinkButton = styled(BaseLink)`
  ${ButtonPrimaryCSS}
`
