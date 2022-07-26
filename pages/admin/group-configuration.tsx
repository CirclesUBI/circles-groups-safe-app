import type { NextPage } from 'next'
import styled from 'styled-components'

import { InformationPod } from '@/src/components/assets/InformationPod'
import { Input } from '@/src/components/assets/Input'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonPrimary } from '@/src/components/pureStyledComponents/buttons/Button'
import { genericSuspense } from '@/src/components/safeSuspense'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
`

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: ${({ theme }) => theme.general.space * 2}px 0;
`

const ConfigurateGroup: NextPage = () => {
  return (
    <>
      <TitleGroup hasBackButton information="Group configuration" text="Bootnode" />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <Input
            information="This is a message"
            label="Owner"
            mandatory
            name="fullname"
            placeholder=""
            type="text"
            value="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <ActionWrapper>
          <ButtonPrimary>Save configuration</ButtonPrimary>
        </ActionWrapper>
      </FormWrapper>
      <hr />
      <FormWrapper>
        <h4>Account information</h4>
        <InformationPod
          bgColor="lightest"
          label="Treasury"
          text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
        />
        <InformationPod
          bgColor="lightest"
          label="Hub"
          text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
        />
        <InformationPod bgColor="lightest" label="Fee" text="3%" />
      </FormWrapper>
    </>
  )
}
export default genericSuspense(ConfigurateGroup)
