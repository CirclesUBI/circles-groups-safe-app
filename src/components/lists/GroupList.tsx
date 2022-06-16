import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ActionItem } from '@/src/components/assets/ActionItem'
import { FirstLetter } from '@/src/components/assets/FirstLetter'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { SearchInput } from '@/src/components/assets/SearchInput'
import { groups } from '@/src/constants/groups'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
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
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.general.space / 2}px;
  justify-content: end;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: auto;
  }
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
      {filteredItemsNum > 4 && <SearchInput onChange={(e) => setQuery(e)} />}
      <ListContainer>
        {filteredItems
          .filter((group) => {
            if (query === '') {
              return group
            } else if (group.title.toLowerCase().includes(query.toLowerCase())) {
              return group
            }
          })
          .slice(0, page * itemsPerPage)
          .map(({ members, title }, index) => (
            <ListItem key={`group_${index}`}>
              <GroupInfo>
                <FirstLetter character={title.charAt(0)} />
                <div>
                  <h3>{title}</h3>
                  <p>{members} members</p>
                </div>
              </GroupInfo>
              <GroupActions>
                <ActionItem
                  color="primary"
                  href="/mint-tokens"
                  icon="/images/icon-send.svg"
                  text="Mint tokens"
                />
                <ActionItem
                  color="third"
                  href="/group-information"
                  icon="/images/icon-information.svg"
                />
              </GroupActions>
            </ListItem>
          ))}
      </ListContainer>
      {page < totalPages && (
        <>
          <LoadMoreButton moreResults={() => setPage((prev) => prev + 1)} />
        </>
      )}
    </List>
  )
}
