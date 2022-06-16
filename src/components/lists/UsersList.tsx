import Image from 'next/image'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { AddDeleteButton } from '@/src/components/assets/AddDeleteButton'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { SearchInput } from '@/src/components/assets/SearchInput'

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
    word-break: break-word;
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
const ImageWrapper = styled.div`
  border-radius: 50%;
  height: 40px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  width: 40px;
`

const GroupActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.general.space}px;
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.general.space / 2}px;
  justify-content: end;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: auto;
  }
`
const NoMembersText = styled.p`
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
  border-top: 1px solid #e0e0e0; ;
`

interface Props {
  action: string
  usersGroup: Array<any>
  onCloseAlert: (openedValue: boolean, actionValue: string, userValue: number) => void
}

export const UsersList: React.FC<Props> = ({ action, onCloseAlert, usersGroup }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const totalItemsNum = usersGroup.length
  const totalPages = Math.ceil(totalItemsNum / itemsPerPage)

  const filteredUsers = useMemo(() => {
    return usersGroup.filter((user: { name: string }) => {
      if (query === '') {
        return user
      } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
        return user
      }
    })
  }, [usersGroup, query])

  return (
    <List>
      {totalItemsNum > 4 && <SearchInput onChange={(e) => setQuery(e)} />}
      <ListContainer>
        {filteredUsers.length > 0 ? (
          filteredUsers
            .slice(0, page * itemsPerPage)
            .map(
              (
                { id, name, photo }: { id: number; name: string; photo: string },
                index: number | undefined,
              ) => (
                <ListItem custom={index} key={`user_${id}`}>
                  <GroupInfo>
                    <ImageWrapper>
                      <Image alt={name} layout="fill" objectFit="cover" src={photo} />
                    </ImageWrapper>
                    <h3>{name}</h3>
                  </GroupInfo>
                  <GroupActions>
                    <AddDeleteButton
                      action={action}
                      addRemoveUser={() => onCloseAlert(true, action, id)}
                    />
                  </GroupActions>
                </ListItem>
              ),
            )
        ) : (
          <>
            <NoMembersText>
              {query
                ? `We couldn't find a match for ${query}.`
                : 'There are no members on this group.'}
            </NoMembersText>
          </>
        )}
      </ListContainer>
      {page < totalPages && filteredUsers.length > itemsPerPage && (
        <>
          <LoadMoreButton moreResults={() => setPage((prev) => prev + 1)} />
        </>
      )}
    </List>
  )
}
