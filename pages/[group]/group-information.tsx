import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { Crc } from '@/src/components/assets/Crc'
import { InformationPod } from '@/src/components/assets/InformationPod'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'
import { UsersList } from '@/src/components/lists/UsersList'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { genericSuspense } from '@/src/components/safeSuspense'
import { MIN_SEARCH_NUMBER } from '@/src/constants/misc'
import { useGroupCurrencyTokensById } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupMembersByGroupIdSearch } from '@/src/hooks/subgraph/useGroupMembers'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
`

const ActionWrapper = styled.div`
  margin-top: ${({ theme }) => theme.general.space * 6}px;
  padding-top: ${({ theme }) => theme.general.space * 4}px;
  border-top: 1px solid #e0e0e0; ;
`

const ListWrapper = styled.div`
  margin-top: ${({ theme }) => theme.general.space * 2}px;
`
const UserListWrapper = styled.div`
  margin: 0 ${({ theme }) => theme.general.space * -2}px;
`

const H2 = styled.h2`
  font-size: 2.8rem;
  padding: ${({ theme }) => theme.general.space * 2}px 0 ${({ theme }) => theme.general.space}px;
`

const ConfigurateGroup: NextPage = () => {
  const router = useRouter()
  const groupAddress = String(router.query?.group)
  const { group } = useGroupCurrencyTokensById(groupAddress)
  const {
    allGroupMembers,
    members,
    query: membersQuery,
    search: searchGroupMembers,
  } = useGroupMembersByGroupIdSearch(groupAddress)

  const { connected, safe, sdk } = useSafeAppsSDK()
  const { tokens } = useCirclesBalance(safe.safeAddress, sdk)

  const [currentUser] = useState(safe.safeAddress.toLowerCase())
  const isOwner = group?.owner === currentUser
  const groupFeeText = `${group?.mintFeePerThousand ?? 0}%`
  const groupToken = tokens.find(
    (token) => token.address.toLowerCase() === groupAddress.toLowerCase(),
  )

  let NO_RESULTS_MEMBERS_QUERY = 'There are no members on this group.'
  if (membersQuery) {
    NO_RESULTS_MEMBERS_QUERY = `The user ${membersQuery} is not a group member.`
  }
  return (
    <>
      <TitleGroup hasBackButton information="Group information" text={group?.name ?? ''} />
      <Wrapper>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Token Address" text={group?.id ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Symbol" text={group?.symbol ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            groupId={groupAddress}
            label="Owner"
            owner={isOwner}
            text={group?.owner ?? ''}
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Treasury" text={group?.treasury ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Hub" text={group?.hub ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            groupId={groupAddress}
            label="What users can mint?"
            owner={isOwner}
            text={group?.allowedMintingUser ?? ''}
          />
        </Columns>
        <Columns columnsNumber={3}>
          <InformationPod bgColor="light" label="Fee" text={groupFeeText ?? ''} />
          <InformationPod
            bgColor="light"
            icon={<Crc />}
            label="My group tokens"
            text={groupToken?.balance ?? '0'}
          />
          <InformationPod
            bgColor="light"
            icon={<Crc />}
            label="Treasure"
            text={group?.minted ?? '0'}
          />
        </Columns>

        <Columns columnsNumber={1}>
          <ListWrapper>
            <H2>Group members</H2>
            <UserListWrapper>
              <UsersList
                noResultText={NO_RESULTS_MEMBERS_QUERY}
                onSearch={
                  allGroupMembers.length > MIN_SEARCH_NUMBER ? searchGroupMembers : undefined
                }
                query={membersQuery}
                users={members}
              />
            </UserListWrapper>
          </ListWrapper>
        </Columns>
        <ActionWrapper className={!connected ? 'not-allowed' : ''}>
          <Link href={`/${groupAddress}/mint-tokens`} passHref>
            <LinkButton className={!connected ? 'disabled' : ''}>Mint Tokens</LinkButton>
          </Link>
        </ActionWrapper>
      </Wrapper>
    </>
  )
}
export default genericSuspense(ConfigurateGroup)
