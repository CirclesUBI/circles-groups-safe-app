import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

import { ActivityType } from '@/src/components/assets/ActivityType'
import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItem } from '@/src/components/assets/ListItem'
import { LoadMoreButton } from '@/src/components/assets/LoadMoreButton'
import { UserNotification } from '@/src/hooks/subgraph/useNotifications'
import { ActivityMessage } from '@/src/utils/notifications'
import { NotificationType } from '@/types/subgraph/__generated__/globalTypes'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: ${({ theme }) => theme.general.space * 6}px 0 0;
`

const ActivityInfo = styled.div`
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
const NoActivityText = styled.h4`
  margin: 0 ${({ theme }) => theme.general.space * 2}px;
  padding: ${({ theme }) => theme.general.space * 4}px 0 0;
  color: ${({ theme }) => theme.colors.alert};
  border-top: 1px solid #e0e0e0; ;
`

interface Props {
  activities: ActivityMessage[]
}

export const ActivityList: React.FC<Props> = ({ activities }) => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const filteredItemsNum = activities.length
  const totalPages = Math.ceil(filteredItemsNum / itemsPerPage)

  return (
    <List>
      <ListContainer>
        {activities.length > 0 ? (
          activities.slice(0, page * itemsPerPage).map(({ date, message, notification }, index) => (
            <ListItem key={`activity_${index}`} unsetColors>
              <ActivityInfo>
                <ActivityType
                  icon={
                    notification.type !== NotificationType.GROUP_MINT ? (
                      <Image
                        alt="Configuration"
                        height={20}
                        src="/images/icon-information.svg"
                        width={20}
                      />
                    ) : (
                      <Image alt="Mint" height={20} src="/images/icon-send.svg" width={20} />
                    )
                  }
                  type={
                    notification.type !== NotificationType.GROUP_MINT ? 'information' : undefined
                  }
                />
                <div>
                  <h3>{message}</h3>
                  <p>{date}</p>
                </div>
              </ActivityInfo>
            </ListItem>
          ))
        ) : (
          <NoActivityText>You don't have any registered activity yet. </NoActivityText>
        )}
      </ListContainer>
      {page < totalPages && (
        <>
          <LoadMoreButton moreResults={() => setPage((prev) => prev + 1)} />
        </>
      )}
    </List>
  )
}
