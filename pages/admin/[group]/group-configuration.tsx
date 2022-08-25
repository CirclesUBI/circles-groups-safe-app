import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { isAddress } from '@ethersproject/address'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { InformationPod } from '@/src/components/assets/InformationPod'
import { TitleGroup } from '@/src/components/assets/TitleGroup'
import { Input } from '@/src/components/form/Input'
import { InputLabelText } from '@/src/components/form/InputLabelText'
import { LabeledCheckbox } from '@/src/components/form/LabeledCheckbox'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonPrimary } from '@/src/components/pureStyledComponents/buttons/Button'
import { useGroupCurrencyTokenCall } from '@/src/hooks/contracts/useGroupCurrencyTokenCall'
import {
  AllowedMintingUser,
  useGroupCurrencyTokensById,
} from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useAllowedMintingUser } from '@/src/hooks/useAllowedMintingUser'
import { useChangeOwner } from '@/src/hooks/useChangeOwner'
import { validNetwork } from '@/src/utils/validNetwork'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
  font-size: 16px;
`

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: ${({ theme }) => theme.general.space * 2}px 0;
`

const RadioButtonsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  flex-direction: column;
`

const ConfigurateGroup: NextPage = () => {
  const router = useRouter()
  const groupAddr = String(router.query?.group)
  const { group } = useGroupCurrencyTokensById(groupAddr)
  const { execute } = useChangeOwner(groupAddr)
  const { safe } = useSafeAppsSDK()
  const currentUser = safe.safeAddress.toLowerCase()

  const [notification, setNotification] = useState<boolean>(false)
  const [allowedUserNotification, setAllowedUserNotification] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [owner, setOwner] = useState(group?.owner ?? '')
  const [groupOwner, refetchGroupOwner] = useGroupCurrencyTokenCall(groupAddr, 'owner', [])
  const isOwner = groupOwner && groupOwner.toLowerCase() === currentUser
  const groupFeeText = `${group?.mintFeePerThousand ?? 0}%`

  const {
    allowedMintingUser,
    isDisabledUpdateAllowedMinting,
    saveAllowedUserConfiguration,
    setAllowedMintingUser,
  } = useAllowedMintingUser(groupAddr)

  // @TODO Improve validation
  const isDisabledSaveButton =
    validNetwork(owner).toLowerCase() === group?.owner ||
    !owner ||
    !isAddress(validNetwork(owner)) ||
    !isOwner

  const onSuccess = async () => {
    await refetchGroupOwner()
  }
  const saveConfiguration = async () => {
    try {
      setLoading(true)
      await execute([validNetwork(owner)], undefined, onSuccess)
    } catch (err) {
      console.log({ err })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (groupOwner) {
      setOwner(groupOwner)
    }
  }, [groupOwner])

  const CHANGE_OWNER_NOTIFICATION_TEXT = `Are you sure you want to change Group Owner to ${owner}?`
  const CHANGE_MINT_SETTINGS_NOTIFICATION_TEXT = `Are you sure you want to change group mint settings to ${allowedMintingUser}?`

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
            text={CHANGE_OWNER_NOTIFICATION_TEXT}
          />
        </AnimatePresence>
      )}
      {allowedUserNotification && (
        <AnimatePresence>
          <AlertMessage
            confirmAction={() => {
              setAllowedUserNotification(false)
              saveAllowedUserConfiguration()
            }}
            onCloseAlert={() => setAllowedUserNotification(false)}
            text={CHANGE_MINT_SETTINGS_NOTIFICATION_TEXT}
          />
        </AnimatePresence>
      )}
      <TitleGroup hasBackButton information="Group configuration" text={group?.name ?? ''} />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <Input
            addressField
            information="Change the Group Owner"
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
            Save Owner Configuration
          </ButtonPrimary>
        </ActionWrapper>
      </FormWrapper>
      <hr />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <InputLabelText
            information="Change which users are able to Mint"
            label={'Users able to Mint'}
            mandatory
          />
          <RadioButtonsWrapper>
            <LabeledCheckbox
              active={allowedMintingUser === AllowedMintingUser.trusted}
              onClick={() => setAllowedMintingUser(AllowedMintingUser.trusted)}
            >
              {AllowedMintingUser.trusted}
            </LabeledCheckbox>
            <LabeledCheckbox
              active={allowedMintingUser === AllowedMintingUser.members}
              onClick={() => setAllowedMintingUser(AllowedMintingUser.members)}
            >
              {AllowedMintingUser.members}
            </LabeledCheckbox>
            <LabeledCheckbox
              active={allowedMintingUser === AllowedMintingUser.owners}
              onClick={() => setAllowedMintingUser(AllowedMintingUser.owners)}
            >
              {AllowedMintingUser.owners}
            </LabeledCheckbox>
          </RadioButtonsWrapper>
        </Columns>
        <ActionWrapper>
          <ButtonPrimary
            disabled={isDisabledUpdateAllowedMinting}
            onClick={() => setAllowedUserNotification(true)}
          >
            Save Mint Configuration
          </ButtonPrimary>
        </ActionWrapper>
      </FormWrapper>
      <hr />
      <FormWrapper>
        <h4>Account information</h4>
        <InformationPod bgColor="lightest" label="Token Address" text={group?.id ?? ''} />
        <InformationPod bgColor="lightest" label="Treasury" text={group?.treasury ?? ''} />
        <InformationPod bgColor="lightest" label="Hub" text={group?.hub ?? ''} />
        <InformationPod bgColor="lightest" label="Fee" text={groupFeeText ?? ''} />
      </FormWrapper>
    </>
  )
}
export default ConfigurateGroup
