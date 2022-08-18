import Link from 'next/link'
import styled from 'styled-components'

import { FirstLetter } from '@/src/components/assets/FirstLetter'
import { ListItem } from '@/src/components/assets/ListItem'
import { shortenAddress } from '@/src/utils/tools'

const GroupHeader = styled.header`
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
    margin: 0;
  }
`
const GroupInformation = styled.div`
  line-height: 1;
  text-align: right;
  margin: ${({ theme }) => theme.general.space * 2}px 0 0;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: auto;
    margin: 0;
  }
`
const GroupLink = styled.a`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textColor};
  margin: ${({ theme }) => theme.general.space / 2}px 0 0;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`
const GroupTokens = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  span {
    font-size: 1.2rem;
  }
`

interface Props {
  groupId: string
  groupName: string
  groupIndex: number
  groupUserTokens: string
  groupTokenSymbol: string
}

export const ListItemBalance: React.FC<Props> = ({
  groupId,
  groupIndex,
  groupName,
  groupTokenSymbol,
  groupUserTokens,
}) => {
  return (
    <ListItem key={`group_${groupIndex}`} unsetColors>
      <GroupHeader>
        <FirstLetter character={groupName.charAt(0)} />
        <div>
          <h3>{groupName}</h3>
          <p>{shortenAddress(groupId)}</p>
        </div>
      </GroupHeader>
      <GroupInformation>
        <GroupTokens>
          <span>{groupTokenSymbol}</span> {groupUserTokens}
        </GroupTokens>
        <Link href={`${groupId}/group-information`} passHref>
          <GroupLink>Group information</GroupLink>
        </Link>
      </GroupInformation>
    </ListItem>
  )
}
