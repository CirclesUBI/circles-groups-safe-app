import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence } from 'framer-motion'

import { Popup } from '@/src/components/assets/Popup'
import { UsersList } from '@/src/components/lists/UsersList'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'

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

export const MembersListButton: React.FC<Props> = ({
  groupId = '',
  groupName = '',
  numberMembers = 0,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [groupAddr, setGroupAddr] = useState('')
  const [isTitle, setTitle] = useState('')
  const { groupMembers } = useGroupMembersByGroupId(groupAddr)

  const handleModal = (groupId: string, groupName: string) => {
    setGroupAddr(groupId)
    setTitle(groupName)
    setIsPopupOpen(true)
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
            content={<UsersList users={groupMembers} />}
            onCloseAlert={() => setIsPopupOpen(false)}
            subtitle="group users"
            title={isTitle}
          />
        )}
      </AnimatePresence>
      <MembersButton
        onClick={() => {
          handleModal(groupId, groupName)
        }}
      >
        {numberMembers} members
      </MembersButton>
    </>
  )
}
