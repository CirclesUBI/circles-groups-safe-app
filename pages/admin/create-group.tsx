import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

import { BigNumber } from '@ethersproject/bignumber'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
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

  const createGroup = () => {
    execute([
      addresses.gnosis.HUB.address, // @TODO Should work for other networks, not just gnosis
      safe.safeAddress,
      safe.safeAddress,
      BigNumber.from(fee),
      groupName,
      groupSymbol,
    ])
  }

  return (
    <>
      <Title text="Create group" />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <Input
            information="This is a message"
            label="Name"
            mandatory
            name="fullname"
            placeholder="Test"
            setValue={setGroupName}
            type="text"
            value={groupName}
          />
        </Columns>
        <Columns columnsNumber={2}>
          <Input
            information="This is a message"
            label="Symbol"
            mandatory
            setValue={setGroupSymbol}
            type="text"
            value={groupSymbol}
          />
          <Input
            information="This is a message"
            label="Fee"
            mandatory
            setValue={setFee}
            type="number"
            value={fee}
          />
        </Columns>
        <Columns columnsNumber={1}>
          <Input
            disabled
            information="This is a message This is a message This is a message"
            label="Treasury"
            mandatory
            type="text"
            value={safe.safeAddress}
          />
        </Columns>
        <ActionWrapper>
          <ButtonSecondary onClick={createGroup}>Create Group</ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default CreateGroup
