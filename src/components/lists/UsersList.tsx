import Image from 'next/image'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { FirstLetter } from '../assets/FirstLetter'
import { AddRemoveUsers } from '@/src/components/actions/AddRemoveUsers'
import { AddDeleteButton } from '@/src/components/assets/AddDeleteButton'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { NoResultsText } from '@/src/components/assets/NoResultsText'
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

interface groupMember {
  id: number
  username: string
  safeAddress: string
  avatarUrl?: string
}

interface Props {
  action: string
  usersGroup: groupMember[]
  onCloseAlert?: (openedValue: boolean, actionValue: string, userValue: number) => void
}

export const UsersList: React.FC<Props> = ({ action, usersGroup }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const totalItemsNum = usersGroup.length

  const filteredUsers = useMemo(() => {
    return usersGroup.filter((user: { username: string }) => {
      if (query === '') {
        return user
      } else if (user.username.toLowerCase().includes(query.toLowerCase())) {
        return user
      }
    })
  }, [usersGroup, query])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const [notification, setNotification] = useState({
    opened: false,
    action: '',
    user: 0,
  })

  return (
    <>
      <AddRemoveUsers
        cancelAction={() => setNotification({ opened: false, action: '', user: 0 })}
        groupMembers={usersGroup}
        notification={notification}
      />
      <List>
        {totalItemsNum > itemsPerPage && <SearchInput onChange={(e) => setQuery(e)} />}
        <ListContainer>
          {filteredUsers.length > 0 ? (
            filteredUsers
              .slice(0, page * itemsPerPage)
              .map(({ avatarUrl, id, username }, index) => (
                <ListItem custom={index} key={`user_${id}`}>
                  <GroupInfo>
                    <ImageWrapper>
                      {!avatarUrl ? (
                        <FirstLetter character={username.charAt(0)} />
                      ) : (
                        <Image alt={username} layout="fill" objectFit="cover" src={avatarUrl} />
                      )}
                    </ImageWrapper>
                    <h3>{username}</h3>
                  </GroupInfo>
                  {action !== 'show' && (
                    <GroupActions>
                      <AddDeleteButton
                        action={action}
                        addRemoveUser={() =>
                          setNotification?.({ opened: true, action: action, user: id })
                        }
                      />
                    </GroupActions>
                  )}
                </ListItem>
              ))
          ) : (
            <>
              <NoResultsText query={query} text={'There are no members on this group.'} />
            </>
          )}
        </ListContainer>
        {page < totalPages && filteredUsers.length > itemsPerPage && (
          <>
            <LoadMoreButton moreResults={() => setPage((prev) => prev + 1)} />
          </>
        )}
      </List>
    </>
  )
}
