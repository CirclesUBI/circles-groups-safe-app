import type { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'

import { Crc } from '@/src/components/assets/Crc'
import { InformationPod } from '@/src/components/assets/InformationPod'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
`
const ConfigurateGroup: NextPage = () => {
  return (
    <>
      <TitleGroup hasBackButton information="Group information" text="Bootnode" />
      <Wrapper>
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
          <InformationPod bgColor="light" icon={<Crc />} label="Treasure" text="7.268" />
        </Columns>
      </Wrapper>
    </>
  )
}
export default ConfigurateGroup
