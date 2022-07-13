import type { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'
import { InformationPod } from '@/src/components/assets/InformationPod'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'
import { UsersList } from '@/src/components/lists/UsersList'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { useGroupMembersByGroupId } from '@/src/hooks/subgraph/useGroupMembers'

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

const H2 = styled.h2`
  font-size: 2.8rem;
  padding: ${({ theme }) => theme.general.space * 2}px 0 ${({ theme }) => theme.general.space}px;
`

const ConfigurateGroup: NextPage = () => {
  // @TODO: use a default group to fetch the members instead of this hardcoded group
  const groupId = '0x8c767b35123496469b21af9df28b1927b77441a7'
  const { groupMembers } = useGroupMembersByGroupId(groupId)

  return (
    <>
      <TitleGroup hasBackButton information="Group information" text="Bootnode" />
      <Wrapper>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            information="Group token Symbol"
            label="Symbol"
            text="CRC"
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            information="Signer of the Gnosis Safe"
            label="Owner"
            owner
            text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            information="Account (safe address) where individual circles are stored and saved."
            label="Treasury"
            text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            information="Hub account"
            label="Hub"
            text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <Columns columnsNumber={2}>
          <InformationPod
            bgColor="light"
            information="Cost of minting tokens to the group currency."
            label="Fee"
            text="3%"
          />
          <InformationPod
            bgColor="light"
            icon={<Crc />}
            information="Store of tokens in reserve"
            label="Treasure"
            text="7.268"
          />
        </Columns>

        <Columns columnsNumber={1}>
          <ListWrapper>
            <H2>Group members</H2>
            <UsersList action={'show'} usersGroup={groupMembers} />
          </ListWrapper>
        </Columns>
        <ActionWrapper>
          <Link href="/mint-tokens" passHref>
            <LinkButton>Mint Tokens</LinkButton>
          </Link>
        </ActionWrapper>
      </Wrapper>
    </>
  )
}
export default ConfigurateGroup
