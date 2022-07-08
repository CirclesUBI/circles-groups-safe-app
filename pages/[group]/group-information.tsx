import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'
import { InformationPod } from '@/src/components/assets/InformationPod'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'
import { UsersList } from '@/src/components/lists/UsersList'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { useGroupMembers } from '@/src/hooks/subgraph/useGroupMembers'
import { useGroupCurrencyTokensById } from '@/src/hooks/subgraph/useGroupCurrencyToken'

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
  const router = useRouter()
  const groupAddr = String(router.query?.group)
  const { groupMembers } = useGroupMembers(groupAddr)
  const { group } = useGroupCurrencyTokensById(groupAddr)
  // const { owner } = useGroupOwner(group?.owner) // TODO: render username from CirclesAPI User
  // const { groupBalance } = useGroupBalance(groupAddr) // TODO: hookup Group Balance with CRC convertion
  return (
    <>
      <TitleGroup hasBackButton information="Group information" text={group?.name ?? ''} />
      <Wrapper>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Symbol" text={group?.symbol ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Owner" text={group?.owner ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Treasury" text={group?.treasury ?? ''} />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Hub" text={group?.hub ?? ''} />
        </Columns>
        <Columns columnsNumber={2}>
          <InformationPod bgColor="light" label="Fee" text={group?.mintFeePerThousand ?? ''} />
          <InformationPod bgColor="light" icon={<Crc />} label="Treasure" text="7.268" />
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