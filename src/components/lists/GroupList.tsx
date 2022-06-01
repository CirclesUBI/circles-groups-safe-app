import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ButtonPrimaryLine } from '@/src/components/pureStyledComponents/buttons/Button'
import { groups } from '@/src/constants/groups'

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
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 3}px;
  margin: 0;
  padding: 0;
`
const FirsLetter = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fourth};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.fontFamilyHeading};
  font-size: 32px;
  font-weight: 900;
  height: 40px;
  justify-content: center;
  text-align: center;
  width: 40px;
`
const Li = styled.li`
  list-style: none;
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.general.space * 3}px;
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: ${({ theme }) => theme.general.space * 3}px;
  }
  &:nth-child(3n + 2) ${FirsLetter} {
    background-color: ${({ theme }) => theme.colors.fifth};
  }
  &:nth-child(3n + 3) ${FirsLetter} {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`

const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.general.space * 2}px;
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
  }
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textColor};
    margin: ${({ theme }) => theme.general.space / 2}px 0 0;
  }
`

const GroupActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.general.space}px;
  margin-top: ${({ theme }) => theme.general.space / 2}px;
`

const ActionItem = styled.a<{ color: string }>`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
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

const LoadMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.general.space * 2}px;
`

interface Props {
  filter: string
}

export const GroupList: React.FC<Props> = ({ filter }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const filteredItems = useMemo(
    () =>
      groups.filter((group) => {
        if (filter === '') {
          return group
        } else if (group.status.toLowerCase().includes(filter.toLowerCase())) {
          return group
        }
      }),
    [filter],
  )

  const filteredItemsNum = filteredItems.length
  const totalPages = Math.ceil(filteredItemsNum / itemsPerPage)

  return (
    <List>
      {filteredItemsNum > 4 && (
        <Search>
          <input
            name="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar"
            type="text"
          />
          <div className="icon">
            <Image alt="search" height={15} src="/images/icon-search.svg" width={15} />
          </div>
        </Search>
      )}
      <Ul>
        {groups
          .filter((group) => {
            if (query === '') {
              return group
            } else if (group.title.toLowerCase().includes(query.toLowerCase())) {
              return group
            }
          })
          .filter((group) => {
            if (filter === '') {
              return group
            } else if (group.status.toLowerCase().includes(filter.toLowerCase())) {
              return group
            }
          })
          .slice(0, page * itemsPerPage)
          .map(({ members, title }, index) => (
            <Li key={`group_${index}`}>
              <GroupInfo>
                <FirsLetter>{title.charAt(0)}</FirsLetter>
                <div>
                  <h3>{title}</h3>
                  <p>{members} members</p>
                </div>
              </GroupInfo>
              <GroupActions>
                <Link href="/" passHref>
                  <ActionItem color="primary">
                    <strong>Mint tokens</strong>
                    <div>
                      <Image alt="search" height={14} src="/images/icon-send.svg" width={14} />
                    </div>
                  </ActionItem>
                </Link>
                <Link href="/" passHref>
                  <ActionItem color="third">
                    <div>
                      <Image
                        alt="search"
                        height={14}
                        src="/images/icon-information.svg"
                        width={14}
                      />
                    </div>
                  </ActionItem>
                </Link>
              </GroupActions>
            </Li>
          ))}
      </Ul>
      {page < totalPages && (
        <LoadMore>
          <ButtonPrimaryLine onClick={() => setPage((prev) => prev + 1)}>
            Load more
          </ButtonPrimaryLine>
        </LoadMore>
      )}
    </List>
  )
}
