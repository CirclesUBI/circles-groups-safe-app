import { useState } from 'react'
import styled from 'styled-components'

import { ActionItem } from '@/src/components/assets/ActionItem'
import { FirstLetter } from '@/src/components/assets/FirstLetter'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { SearchInput } from '@/src/components/assets/SearchInput'
import { GroupCurrencyToken } from '@/src/hooks/subgraph/useGroupCurrencyToken'

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
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: auto;
  }
`

interface Props {
  groups: Array<GroupCurrencyToken>
}

export const GroupList: React.FC<Props> = ({ groups }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const filteredItems = groups

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
            } else if (group.name.toLowerCase().includes(query.toLowerCase())) {
              return group
            }
          })
          .slice(0, page * itemsPerPage)
          .map(({ members, name }, index) => (
            <ListItem key={`group_${index}`}>
              <GroupInfo>
                <FirstLetter character={name.charAt(0)} />
                <div>
                  <h3>{name}</h3>
                  <p>{members.length} members</p>
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
