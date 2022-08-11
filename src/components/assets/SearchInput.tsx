import Image from 'next/image'
import styled from 'styled-components'

const Search = styled.div`
  background: rgba(217, 217, 217, 0.5);
  border-radius: 60px;
  overflow: hidden;
  position: relative;
  margin-bottom: ${({ theme }) => theme.general.space * 2}px;
  input {
    background-color: transparent;
    border: none;
    border-radius: 60px;
    color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.general.space * 2}px;
    width: 100%;
    transition: all 0.2s linear;
    &:focus,
    &:focus-visible {
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primary};
      outline: ${({ theme }) => theme.colors.primary} auto 1px;
    }
  }
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ theme }) => theme.general.space * 3}px;
  }
`

interface Props {
  onChange: (e: string) => void
}

export const SearchInput: React.FC<Props> = ({ onChange }) => {
  return (
    <Search>
      <input
        name="search"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar"
        type="text"
      />
      <div className="icon">
        <Image alt="search" height={15} src="/images/icon-search.svg" width={15} />
      </div>
    </Search>
  )
}
