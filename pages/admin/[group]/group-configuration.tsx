import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

import { isAddress } from '@ethersproject/address'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { InformationPod } from '@/src/components/assets/InformationPod'
import { Input } from '@/src/components/assets/Input'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonPrimary } from '@/src/components/pureStyledComponents/buttons/Button'
import { useGroupCurrencyTokensById } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useChangeOwner } from '@/src/hooks/useChangeOwner'

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
  const router = useRouter()
  const groupAddr = String(router.query?.group)
  const { group } = useGroupCurrencyTokensById(groupAddr)
  const { execute } = useChangeOwner(groupAddr)
  const { safe } = useSafeAppsSDK()
  const currentUser = safe.safeAddress.toLowerCase()
  const isOwner = group?.owner === currentUser

  const [owner, setOwner] = useState(group?.owner ?? '')
  const [notification, setNotification] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const isDisabledSaveButton =
    owner.toLowerCase() === group?.owner || !owner || !isAddress(owner) || !isOwner
  const saveConfiguration = async () => {
    try {
      setLoading(true)
      await execute([owner])
    } catch (err) {
      console.log({ err })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {notification && (
        <AnimatePresence>
          <AlertMessage
            confirmAction={() => {
              setNotification(false)
              saveConfiguration()
            }}
            onCloseAlert={() => setNotification(false)}
            text={`Are you sure you want to change Group Owner to ${owner}?`}
          />
        </AnimatePresence>
      )}
      <TitleGroup hasBackButton information="Group configuration" text={group?.name ?? ''} />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <Input
            addressField
            information="This is a message"
            label="Owner"
            mandatory
            name="fullname"
            placeholder=""
            setValue={setOwner}
            type="text"
            value={owner}
          />
        </Columns>
        <ActionWrapper>
          <ButtonPrimary
            disabled={isDisabledSaveButton || loading}
            onClick={() => setNotification(true)}
          >
            Save configuration
          </ButtonPrimary>
        </ActionWrapper>
      </FormWrapper>
      <hr />
      <FormWrapper>
        <h4>Account information</h4>
        <InformationPod bgColor="lightest" label="Treasury" text={group?.treasury ?? ''} />
        <InformationPod bgColor="lightest" label="Hub" text={group?.hub ?? ''} />
        <InformationPod bgColor="lightest" label="Fee" text={group?.mintFeePerThousand ?? ''} />
      </FormWrapper>
    </>
  )
}
export default ConfigurateGroup
