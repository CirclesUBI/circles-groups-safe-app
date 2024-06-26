import Image from 'next/image'
import styled from 'styled-components'

const ActionButton = styled.button<{ action: string }>`
  align-items: center;
  background-color: transparent;
  border: 1px solid;
  border-color: ${(props) => {
    switch (props.action) {
      case 'delete':
        return ({ theme }) => theme.colors.alert
      default:
        return ({ theme }) => theme.colors.tertiary
    }
  }};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 24px;
  padding: 6px;
  width: 24px;
  img {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    background-color: ${(props) => {
      switch (props.action) {
        case 'delete':
          return ({ theme }) => theme.colors.alert
        default:
          return ({ theme }) => theme.colors.tertiary
      }
    }};
    img {
      filter: brightness(0) invert(1);
    }
  }
`

// @TODO should be in a different place
export type ActionAddDelete = 'add' | 'delete'

interface Props {
  action: ActionAddDelete
  onClick: () => void
}

export const AddDeleteButton: React.FC<Props> = ({ action, onClick }) => {
  return (
    <ActionButton action={action} onClick={onClick}>
      <Image
        alt={action == 'delete' ? 'Remove member' : 'Add member'}
        height={14}
        src={action == 'delete' ? '/images/icon-delete.svg' : '/images/icon-add.svg'}
        width={14}
      />
    </ActionButton>
  )
}
