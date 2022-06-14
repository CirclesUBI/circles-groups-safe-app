import type { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'

import { InformationPod } from '@/src/components/assets/InformationPod'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'

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
      <TitleGroup hasBackButton information="Group information" text="Bootnode" />

      <FormWrapper>
        <Columns columnsNumber={1}>
          <InformationPod bgColor="lightest" label="Symbol" text="CRC" />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            label="Owner"
            owner
            text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            label="Treasury"
            text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <Columns columnsNumber={1}>
          <InformationPod
            bgColor="lightest"
            label="Hub"
            text="0x9D84152df06880cdABEb30e10c2981F40D98B901"
          />
        </Columns>
        <Columns columnsNumber={2}>
          <InformationPod bgColor="light" label="Fee" text="3%" />
          <InformationPod
            bgColor="light"
            icon={<Image alt="Configuration" height={12} src="/images/crc.svg" width={12} />}
            label="Treasure"
            text="7.268"
          />
        </Columns>
      </FormWrapper>
    </>
  )
}
export default ConfigurateGroup
