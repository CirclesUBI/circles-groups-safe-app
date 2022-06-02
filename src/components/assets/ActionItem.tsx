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
  }
  &:hover {
    div {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`

interface Props {
  color?: string
  icon?: string
  text?: string
  href: string
}

export const ActionItem: React.FC<Props> = ({
  color = 'primary',
  href = '/',
  icon = '/images/icon-send.svg',
  text = '',
}) => {
  return (
    <Link href={href} passHref>
      <ActionItemLink color={color}>
        {text && <strong>{text}</strong>}
        <div>
          <Image alt={text ? text : 'icon'} height={14} src={icon} width={14} />
        </div>
      </ActionItemLink>
    </Link>
  )
}
