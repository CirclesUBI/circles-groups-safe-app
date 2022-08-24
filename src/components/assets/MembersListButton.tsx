import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence } from 'framer-motion'

import { Popup } from '@/src/components/assets/Popup'
import { UsersList } from '@/src/components/lists/UsersList'
import { MIN_SEARCH_NUMBER } from '@/src/constants/misc'
import { useGroupMembersByGroupIdSearch } from '@/src/hooks/subgraph/useGroupMembers'

const MembersButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textColor};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  margin: ${({ theme }) => theme.general.space / 2}px 0 0;
`

interface Props {
  numberMembers: number
  groupId: string
  groupName: string
}

export const MembersListButton: React.FC<Props> = ({ groupId, groupName, numberMembers }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const {
    allGroupMembers,
    members,
    query: membersQuery,
    search: searchGroupMembers,
  } = useGroupMembersByGroupIdSearch(groupId)

  const handleModal = () => {
    setIsPopupOpen(true)
  }

  let NO_RESULTS_MEMBERS_QUERY = 'There are no members on this group.'
  if (membersQuery) {
    NO_RESULTS_MEMBERS_QUERY = `The user ${membersQuery} is not a group member.`
  }

  useEffect(() => {
    //Fix me later
    if (isPopupOpen) window.document.body.style.overflow = 'hidden'
    if (!isPopupOpen) {
      window.document.body.style.overflow = 'auto'
    }
  }, [isPopupOpen])

  return (
    <>
      <AnimatePresence>
        {isPopupOpen && (
          <Popup
            onCloseAlert={() => setIsPopupOpen(false)}
            subtitle="group users"
            title={groupName}
          >
            <UsersList
              noResultText={NO_RESULTS_MEMBERS_QUERY}
              onSearch={allGroupMembers.length > MIN_SEARCH_NUMBER ? searchGroupMembers : undefined}
              query={membersQuery}
              users={members}
            />
          </Popup>
        )}
      </AnimatePresence>
      <MembersButton onClick={handleModal}>{numberMembers} members</MembersButton>
    </>
  )
}
