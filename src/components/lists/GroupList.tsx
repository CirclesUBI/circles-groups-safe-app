import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItemContent } from '@/src/components/assets/ListItemContent'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { NoResultsText } from '@/src/components/assets/NoResultsText'
import { SearchInput } from '@/src/components/assets/SearchInput'
import { GroupCurrencyToken } from '@/src/hooks/subgraph/useGroupCurrencyToken'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
`

interface Props {
  groups: Array<GroupCurrencyToken>
  canMint: boolean
}

export const GroupList: React.FC<Props> = ({ canMint, groups }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const totalItemsNum = groups.length

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      if (query === '') {
        return group
      } else if (group.name.toLowerCase().includes(query.toLowerCase())) {
        return group
      }
    })
  }, [groups, query])

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage)

  return (
    <>
      <List>
        {totalItemsNum > itemsPerPage && <SearchInput onChange={(e) => setQuery(e)} />}
        <ListContainer>
          {filteredGroups.length > 0 ? (
            filteredGroups
              .slice(0, page * itemsPerPage)
              .map(({ id, members, name }, index) => (
                <ListItemContent
                  canMint={canMint}
                  groupId={id}
                  groupIndex={index}
                  groupName={name}
                  key={index}
                  numberMembers={members.length}
                />
              ))
          ) : (
            <NoResultsText query={query} text={"You don't belong to any group yet."} />
          )}
        </ListContainer>
        {page < totalPages && filteredGroups.length > itemsPerPage && (
          <>
            <LoadMoreButton moreResults={() => setPage((prev) => prev + 1)} />
          </>
        )}
      </List>
    </>
  )
}
