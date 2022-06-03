import type { NextPage } from 'next'
import styled from 'styled-components'

import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'

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
          <ButtonSecondary>Create Group</ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default CreateGroup
