import type { NextPage } from 'next'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
import { useCreateGroupTx } from '@/src/hooks/useCreateGroup'

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

  const executeCreateGroup = () => {
    execute([
      '0x29b9a7fBb8995b2423a71cC17cf9810798F6C543',
      safe.safeAddress,
      safe.safeAddress,
      10,
      'deployedGCTFactory',
      'CRC',
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
            type="text"
          />
        </Columns>
        <Columns columnsNumber={2}>
          <Input information="This is a message" label="Symbol" mandatory type="text" />
          <Input information="This is a message" label="Fee" mandatory type="number" />
        </Columns>
        <Columns columnsNumber={1}>
          <Input
            information="This is a message This is a message This is a message"
            label="Treasury "
            mandatory
            type="number"
          />
        </Columns>
        <ActionWrapper>
          <ButtonSecondary onClick={executeCreateGroup}>Create Group</ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default CreateGroup
