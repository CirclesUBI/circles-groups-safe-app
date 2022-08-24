import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

import { FirstLetter } from '../assets/FirstLetter'
import { AddRemoveUserNotification, AddRemoveUsers } from '@/src/components/actions/AddRemoveUsers'
import { ActionAddDelete, AddDeleteButton } from '@/src/components/assets/AddDeleteButton'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { NoResultsText } from '@/src/components/assets/NoResultsText'
import { SearchInput } from '@/src/components/assets/SearchInput'
import { CirclesGardenUser } from '@/src/utils/circlesGardenAPI'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
  overflow: hidden;
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

interface Props {
  action?: ActionAddDelete
  users: CirclesGardenUser[]
  groupAddress?: string
  shouldShowAlert?: boolean
  onRemoveUser?: (userAddress: string) => void
  onAddUser?: (userAddress: string) => void
  onSearch?: (query: string) => void
  noResultText?: string
  query?: string
}

export const UsersList: React.FC<Props> = ({
  action,
  groupAddress,
  noResultText,
  onAddUser,
  onRemoveUser,
  onSearch,
  query,
  shouldShowAlert = false,
  users,
}) => {
  const noResultsText = noResultText ?? 'No results'
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(users.length / itemsPerPage)

  const [notification, setNotification] = useState<AddRemoveUserNotification>({
    opened: false,
    action: action ?? 'add',
    username: '',
  })

  const resetNotification = () => {
    setNotification({ opened: false, action: action ?? 'add', username: '' })
  }

  const removeUser = () => {
    if (onRemoveUser && notification.userAddress) {
      onRemoveUser(notification.userAddress)
    }
    resetNotification()
  }

  const addUser = () => {
    if (onAddUser && notification.userAddress) {
      onAddUser(notification.userAddress)
    }
    resetNotification()
  }

  const searchUserHandler = (value: string) => {
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <>
      {shouldShowAlert && action && (
        <AddRemoveUsers
          cancelAction={resetNotification}
          notification={notification}
          onAddUserAction={addUser}
          onRemoveUserAction={removeUser}
        />
      )}
      <List>
        {onSearch && <SearchInput onChange={(e) => searchUserHandler(e)} value={query} />}
        <ListContainer>
          {users.length > 0 ? (
            users
              .slice(0, page * itemsPerPage)
              .map(({ avatarUrl, id, safeAddress, username }, index) => (
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
                  {shouldShowAlert && action && (
                    <GroupActions>
                      <AddDeleteButton
                        action={action}
                        onClick={() =>
                          setNotification({
                            opened: true,
                            action,
                            username,
                            userAddress: safeAddress,
                          })
                        }
                      />
                    </GroupActions>
                  )}
                </ListItem>
              ))
          ) : (
            <>
              <NoResultsText text={noResultsText} />
            </>
          )}
        </ListContainer>
        {page < totalPages && users.length > itemsPerPage && (
          <>
            <LoadMoreButton moreResults={() => setPage((prev) => prev + 1)} />
          </>
        )}
      </List>
    </>
  )
}
