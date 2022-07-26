import { useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { ActionItem } from '@/src/components/assets/ActionItem'
import { FirstLetter } from '@/src/components/assets/FirstLetter'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { MembersListButton } from '@/src/components/assets/MembersListButton'
import { NoResultsText } from '@/src/components/assets/NoResultsText'
import { SearchInput } from '@/src/components/assets/SearchInput'
import { Tooltip } from '@/src/components/assets/Tooltip'
import SafeSuspense from '@/src/components/safeSuspense'
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

const skeletonloading = keyframes`
from {
  background-color: rgb(241 242 243 / 80%);
}
to {
  background-color: rgb(241 242 243 / 95%);
}
`

const Skeleton = styled.div`
  border-radius: 10px;
  margin: ${({ theme }) => theme.general.space / 2}px 0 0;
  height: 1.2rem;
  max-width: 60px;
  animation: ${skeletonloading} 1s linear infinite alternate;
`

interface Props {
  groups: Array<GroupCurrencyToken>
}

export const GroupList: React.FC<Props> = ({ groups }) => {
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
            filteredGroups.slice(0, page * itemsPerPage).map(({ id, members, name }, index) => (
              <ListItem key={`group_${index}`}>
                <GroupInfo>
                  <FirstLetter character={name.charAt(0)} />
                  <div>
                    <h3>{name}</h3>
                    <SafeSuspense fallback={<Skeleton></Skeleton>}>
                      <MembersListButton
                        groupId={id}
                        groupName={name}
                        numberMembers={members.length}
                      />
                    </SafeSuspense>
                  </div>
                </GroupInfo>
                <GroupActions>
                  <ActionItem
                    color="primary"
                    href={`${id}/mint-tokens`}
                    icon="/images/icon-send.svg"
                    text="Mint tokens"
                  />
                  <Tooltip text="Group information and members list">
                    <ActionItem
                      color="third"
                      href={`${id}/group-information`}
                      icon="/images/icon-information.svg"
                    />
                  </Tooltip>
                </GroupActions>
              </ListItem>
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
