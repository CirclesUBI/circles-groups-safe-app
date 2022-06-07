import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const ActionItemLink = styled.a<{ color: string }>`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.general.space}px;
  text-decoration: none;

  strong {
    font-size: 1.2rem;
    font-weight: 500;
  }
  img {
    transition: all 0.3s ease-in-out;
  }
  div {
    align-items: center;
    background-color: ${(props) =>
      props.color == 'primary'
        ? ({ theme }) => theme.colors.primary
        : ({ theme }) => theme.colors.fourth};
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    height: 28px;
    transition: all 0.3s ease-in-out;
    width: 28px;
    &.line {
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      height: 24px;
      padding: 6px;
      width: 24px;
      border-color: ${(props) => {
        switch (props.color) {
          case 'alert':
            return ({ theme }) => theme.colors.alert
          case 'fourth':
            return ({ theme }) => theme.colors.fourth
          case 'success':
            return ({ theme }) => theme.colors.success
          default:
            return ({ theme }) => theme.colors.primary
        }
      }};
      &:hover {
        background-color: ${(props) => {
          switch (props.color) {
            case 'alert':
              return ({ theme }) => theme.colors.alert
            case 'fourth':
              return ({ theme }) => theme.colors.fourth
            case 'success':
              return ({ theme }) => theme.colors.success
            default:
              return ({ theme }) => theme.colors.primary
          }
        }};
        img {
          filter: brightness(0) invert(1);
        }
      }
    }
  }
  &:hover {
    div {
      &:not(.line) {
        background-color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`

interface Props {
  color?: string
  icon?: string
  text?: string
  href: string
  buttonStyle?: string
}

export const ActionItem: React.FC<Props> = ({
  buttonStyle = '',
  color = 'primary',
  href = '/',
  icon = '/images/icon-send.svg',
  text = '',
}) => {
  return (
    <Link href={href} passHref>
      <ActionItemLink color={color}>
        {text && <strong>{text}</strong>}
        <div className={buttonStyle}>
          <Image alt={text ? text : 'icon'} height={14} src={icon} width={14} />
        </div>
      </ActionItemLink>
    </Link>
  )
}
