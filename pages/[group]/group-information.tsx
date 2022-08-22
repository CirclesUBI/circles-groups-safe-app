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
import { useGroupCurrencyTokensById } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'

const NO_RESULTS_TEXT = 'There are no members on this group.'

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
  const groupAddr = String(router.query?.group)
  const { groupMembers } = useGroupMembersByGroupId(groupAddr)
  const { group } = useGroupCurrencyTokensById(groupAddr)

  const { connected, safe } = useSafeAppsSDK()
  const [currentUser] = useState(safe.safeAddress.toLowerCase())
  const isOwner = group?.owner === currentUser
  const groupFeeText = `${group?.mintFeePerThousand ?? 0}%`
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
            groupId={groupAddr}
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
        <Columns columnsNumber={3}>
          <InformationPod bgColor="light" label="Fee" text={groupFeeText ?? ''} />
          {/* @todo show Only if you have group tokens, group tokens instead of minted, 
          Replace text with user group tokens amount */}
          <InformationPod
            bgColor="light"
            icon={<Crc />}
            label="My group tokens"
            text={group?.minted ?? '0'}
          />
          <InformationPod
            bgColor="light"
            icon={<Crc />}
            label="Treasure"
            text={group?.minted ?? '0'}
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            groupId={groupAddr}
            label="What users can mint?"
            owner={isOwner}
            text={group?.allowedMintingUser ?? ''}
          />
        </Columns>

        <Columns columnsNumber={1}>
          <ListWrapper>
            <H2>Group members</H2>
            <UserListWrapper>
              <UsersList noResultText={NO_RESULTS_TEXT} users={groupMembers} />
            </UserListWrapper>
          </ListWrapper>
        </Columns>
        <ActionWrapper className={!connected ? 'not-allowed' : ''}>
          <Link href={`/${groupAddr}/mint-tokens`} passHref>
            <LinkButton className={!connected ? 'disabled' : ''}>Mint Tokens</LinkButton>
          </Link>
        </ActionWrapper>
      </Wrapper>
    </>
  )
}
export default genericSuspense(ConfigurateGroup)
