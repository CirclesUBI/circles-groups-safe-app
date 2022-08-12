import styled, { keyframes } from 'styled-components'

import { ActionItem } from '@/src/components/assets/ActionItem'
import { FirstLetter } from '@/src/components/assets/FirstLetter'
import { ListItem } from '@/src/components/assets/ListItem'
import { MembersListButton } from '@/src/components/assets/MembersListButton'
import { Tooltip } from '@/src/components/assets/Tooltip'
import SafeSuspense from '@/src/components/safeSuspense'

const GroupInfo = styled.header`
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
  groupId: string
  numberMembers: number
  groupName: string
  groupIndex: number
  canMint: boolean
}

export const ListItemContent: React.FC<Props> = ({
  canMint,
  groupId,
  groupIndex,
  groupName,
  numberMembers,
}) => {
  return (
    <ListItem key={`group_${groupIndex}`}>
      <GroupInfo>
        <FirstLetter character={groupName.charAt(0)} />
        <div>
          <h3>{groupName}</h3>
          <SafeSuspense fallback={<Skeleton></Skeleton>}>
            <MembersListButton
              groupId={groupId}
              groupName={groupName}
              numberMembers={numberMembers}
            />
          </SafeSuspense>
        </div>
      </GroupInfo>
      <GroupActions>
        <ActionItem
          color="primary"
          disabled={!canMint}
          href={`${groupId}/mint-tokens`}
          icon="/images/icon-send.svg"
          text="Mint tokens"
        />
        <Tooltip text="Group information and members list">
          <ActionItem
            color="third"
            href={`${groupId}/group-information`}
            icon="/images/icon-information.svg"
          />
        </Tooltip>
      </GroupActions>
    </ListItem>
  )
}
