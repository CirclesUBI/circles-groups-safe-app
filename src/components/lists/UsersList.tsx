import Image from 'next/image'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { User } from '../assets/User'
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
  width: 100%;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: auto;
  }
`
interface Props {
  action: string
  usersGroup: Array<any>
  handleUsers: (id: number) => void
}

export const UsersList: React.FC<Props> = ({ action, handleUsers, usersGroup }) => {
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
        return User
      }
    })
  }, [usersGroup, query])

  return (
    <List>
      {totalItemsNum > 4 && <SearchInput onChange={(e) => setQuery(e)} />}
      <ListContainer>
        {filteredUsers
          .slice(0, page * itemsPerPage)
          .map(
            (
              { id, name, photo }: { id: number; name: string; photo: string },
              index: number | undefined,
            ) => (
              <ListItem custom={index} key={`user_${index}`}>
                <GroupInfo>
                  <ImageWrapper>
                    <Image alt={name} layout="fill" objectFit="cover" src={photo} />
                  </ImageWrapper>
                  <h3>{name}</h3>
                </GroupInfo>
                <GroupActions>
                  <AddDeleteButton action={action} addRemoveUser={() => handleUsers(id)} />
                </GroupActions>
              </ListItem>
            ),
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
