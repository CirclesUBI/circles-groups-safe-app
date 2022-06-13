import type { NextPage } from 'next'
import styled from 'styled-components'

import { FromToInformation } from '@/src/components/assets/FromToInformation'
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
      <Title hasBackButton text="Send circles to a group" />
      <FormWrapper>
        <FromToInformation
          amountText="Your total balance:"
          amountValue={84.34}
          label="Send from"
          name="@TomasBari"
          userPhoto="/images/user.jpg"
        />
        <FromToInformation
          amountText="Maximum amount:"
          amountValue={84.34}
          group
          label="Send to"
          name="Bootnode Group"
        />

        <Input
          information="This is a message This is a message This is a message"
          label="Enter amount"
          mandatory
          tokens
          type="number"
        />

        <Input
          information="This is a message This is a message This is a message"
          label="Add note"
          mandatory
        />

        <ActionWrapper>
          <ButtonSecondary>Mint tokens</ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default CreateGroup
