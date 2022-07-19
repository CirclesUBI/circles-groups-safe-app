import { DOMAttributes, cloneElement, createRef, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

export enum DropdownPosition {
  center,
  left,
  right,
}

export enum DropdownDirection {
  downwards = 'down',
  upwards = 'up',
}

const Wrapper = styled.div<{ fullWidth?: boolean; isOpen: boolean; disabled: boolean }>`
  outline: none;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'initial')};
  position: relative;
  z-index: ${(props) => (props.isOpen ? '100' : '0')};
  ${(props) => props.fullWidth && 'width: 100%;'}

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

Wrapper.defaultProps = {
  fullWidth: false,
}

const ButtonContainer = styled.div`
  background-color: transparent;
  border: none;
  display: block;
  outline: none;
  padding: 0;
  user-select: none;
  width: 100%;
`

const PositionLeftCSS = css`
  left: 0;
`

const PositionRightCSS = css`
  right: 0;
`

const PositionCenterCSS = css`
  left: 50%;
  transform: translateX(-50%);
`

const DirectionDownwardsCSS = css`
  top: calc(110%);
`

const DirectionUpwardsCSS = css`
  bottom: calc(100%);
`

const Items = styled.div<{
  dropdownDirection?: DropdownDirection
  dropdownPosition?: DropdownPosition
  isOpen: boolean
}>`
  background: ${({ theme }) => theme.dropdown.background};
  border: none;
  border-radius: ${({ theme }) => theme.dropdown.borderRadius};
  box-shadow: ${({ theme }) => theme.dropdown.boxShadow};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  min-width: 240px;
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px;
  position: absolute;
  white-space: nowrap;
  width: 100%;

  ${(props) => (props.dropdownPosition === DropdownPosition.left ? PositionLeftCSS : '')}
  ${(props) => (props.dropdownPosition === DropdownPosition.right ? PositionRightCSS : '')}
  ${(props) => (props.dropdownPosition === DropdownPosition.center ? PositionCenterCSS : '')}
  ${(props) =>
    props.dropdownDirection === DropdownDirection.downwards ? DirectionDownwardsCSS : ''}
  ${(props) => (props.dropdownDirection === DropdownDirection.upwards ? DirectionUpwardsCSS : '')}
`

Items.defaultProps = {
  dropdownDirection: DropdownDirection.downwards,
  dropdownPosition: DropdownPosition.left,
  isOpen: false,
}

export interface DropdownItemProps {
  disabled?: boolean
  justifyContent?: string
}

export const DropdownItemCSS = css<DropdownItemProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.dropdown.item.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.dropdown.item.borderColor};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  justify-content: ${(props) => props.justifyContent};
  line-height: 1.2;
  min-height: ${({ theme }) => theme.dropdown.item.height};
  overflow: hidden;
  padding: ${({ theme }) => theme.general.space + theme.general.space / 2}px 0;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  user-select: none;
  &:after {
    content: '';
    width: 6px;
    height: 10px;
    background-image: url(/images/chevron-right.svg);
    background-repeat: no-repeat;
    margin-right: 8px;
    transition: all 0.3s ease-in-out;
  }
  &.isActive {
    background-color: ${({ theme }) => theme.dropdown.item.backgroundColorActive};
    color: ${({ theme }) => theme.dropdown.item.colorActive};
    font-weight: 300;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.fourth};
    &:after {
      margin-right: 0;
    }
  }

  &:disabled,
  &[disabled] {
    &,
    &:hover {
      background-color: ${({ theme }) => theme.dropdown.item.backgroundColor};
      cursor: not-allowed;
      font-weight: 400;
      opacity: 0.5;
      pointer-events: none;
    }
  }
`

export const DropdownItem = styled.div<DropdownItemProps>`
  ${DropdownItemCSS}
`

DropdownItem.defaultProps = {
  disabled: false,
  justifyContent: 'space-between',
}

interface Props extends DOMAttributes<HTMLDivElement> {
  activeItemHighlight?: boolean | undefined
  className?: string
  closeOnClick?: boolean
  currentItem?: number | undefined
  disabled?: boolean
  dropdownButtonContent?: React.ReactNode | string
  dropdownDirection?: DropdownDirection | undefined
  dropdownPosition?: DropdownPosition | undefined
  fullWidth?: boolean
  items: Array<unknown>
  triggerClose?: boolean
  isOpen: boolean
  onDropDownClose: () => void
  onDropDownToggle: () => void
}

export const Dropdown: React.FC<Props> = (props) => {
  const {
    activeItemHighlight = true,
    className = '',
    closeOnClick = true,
    currentItem = 0,
    disabled = false,
    dropdownButtonContent,
    dropdownDirection,
    dropdownPosition,
    fullWidth,
    isOpen = false,
    items,
    onDropDownClose,
    onDropDownToggle,
    triggerClose,
    ...restProps
  } = props

  const node = createRef<HTMLDivElement>()

  const onButtonClick = useCallback(
    (e) => {
      e.stopPropagation()
      if (disabled) return
      onDropDownToggle()
    },
    [disabled, onDropDownToggle],
  )

  useEffect(() => {
    // Note: you can use triggerClose to close the dropdown when clicking on a specific element
    if (triggerClose) {
      onDropDownClose()
    }

    // Note: This code handles closing when clickin outside of the dropdown
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: any) => {
      if (node && node.current && node.current.contains(e.target)) {
        return
      }
      onDropDownClose()
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [node, triggerClose, onDropDownClose])

  return (
    <Wrapper
      className={`dropdown ${isOpen ? 'isOpen' : ''} ${className}`}
      disabled={disabled}
      fullWidth={fullWidth}
      isOpen={isOpen}
      ref={node}
      {...restProps}
    >
      <ButtonContainer className="dropdownButton" onClick={onButtonClick}>
        {dropdownButtonContent}
      </ButtonContainer>
      <Items
        className="dropdownItems"
        dropdownDirection={dropdownDirection}
        dropdownPosition={dropdownPosition}
        isOpen={isOpen}
      >
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items.map((item: any, index: number) => {
            const isActive = activeItemHighlight && index === currentItem
            const dropdownItem = cloneElement(item, {
              className: `dropdownItem ${isActive && 'isActive'}`,
              key: item.key ? item.key : index,
              onClick: (e) => {
                e.stopPropagation()

                if (closeOnClick) {
                  onDropDownClose()
                }

                if (!item.props.onClick) {
                  return
                }

                item.props.onClick()
              },
            })

            return dropdownItem
          })
        }
      </Items>
    </Wrapper>
  )
}
