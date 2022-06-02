import Image from 'next/image'
import styled from 'styled-components'

const CloseMenu = styled.button`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 28px;
  width: 28px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`
interface Props {
  closeMenu: () => void
}

export const CloseButton: React.FC<Props> = ({ closeMenu }) => {
  return (
    <CloseMenu onClick={() => closeMenu()}>
      <Image alt="Close" height={10} src="/images/icon-close.svg" width={10} />
    </CloseMenu>
  )
}
