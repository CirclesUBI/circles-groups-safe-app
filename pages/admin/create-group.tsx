import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

import { BigNumber } from '@ethersproject/bignumber'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
import { genericSuspense } from '@/src/components/safeSuspense'
import { useCreateGroupTx } from '@/src/hooks/useCreateGroup'
import { addresses } from '@/src/utils/addresses'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
`
const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
`

const CreateGroup: NextPage = () => {
  const { safe } = useSafeAppsSDK()
  const { execute } = useCreateGroupTx()

  const [groupName, setGroupName] = useState<string>('')
  const [groupSymbol, setGroupSymbol] = useState<string>('')
  const [fee, setFee] = useState<string>('0')
  const [treasury, setTreasury] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSuccess = () => {
    router.push('/')
  }
  const createGroup = async () => {
    setLoading(true)
    await execute(
      [
        addresses.gnosis.HUB.address, // @TODO Should work for other networks, not just gnosis
        treasury,
        safe.safeAddress,
        BigNumber.from(fee || '0'),
        groupName,
        groupSymbol,
      ],
      undefined,
      onSuccess,
    )
    setLoading(false)
  }

  return (
    <>
      <Title text="Create group" />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <Input
            label="Name"
            mandatory
            maxLength={30}
            minLength={4}
            name="fullname"
            placeholder="Test"
            setValue={setGroupName}
            type="text"
            value={groupName}
          />
        </Columns>
        <Columns columnsNumber={2}>
          <Input
            information="Group token Symbol"
            label="Symbol"
            mandatory
            setValue={setGroupSymbol}
            type="text"
            value={groupSymbol}
          />
          <Input
            information="Cost of minting tokens to the group currency."
            label="Fee"
            mandatory
            setValue={setFee}
            type="number"
            value={fee}
          />
        </Columns>
        <Columns columnsNumber={1}>
          <Input
            information="Account (Safe address) where individual circles are stored and saved."
            label="Treasury"
            mandatory
            setValue={setTreasury}
            type="text"
            value={treasury}
          />
        </Columns>
        <ActionWrapper>
          <ButtonSecondary disabled={loading} onClick={createGroup}>
            Create Group
          </ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default genericSuspense(CreateGroup)
