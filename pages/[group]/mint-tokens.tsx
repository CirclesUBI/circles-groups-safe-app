import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { TransferUserInformation } from '@/src/components/assets/TransferUserInformation'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useGroupMintToken } from '@/src/hooks/useGroupMintToken'
import { useUserSafe } from '@/src/hooks/useUserSafe'

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

const Icon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ theme }) => theme.general.space * 2}px;
  pointer-events: none;
`

const CreateGroup: NextPage = () => {
  const router = useRouter()
  const groupAddress = String(router.query?.group ?? '')
  const { connected, safe, sdk } = useSafeAppsSDK()
  const { circles } = useCirclesBalance(sdk)
  const { group, loading, mintMaxAmount, mintToken } = useGroupMintToken(
    safe.safeAddress,
    groupAddress,
    sdk,
  )
  const { user } = useUserSafe(safe.safeAddress)

  const [notification, setNotification] = useState(false)
  const [mintAmount, setMintAmount] = useState<string>('')
  const [note, setNote] = useState<string>('')

  return (
    <>
      {notification && (
        <AnimatePresence>
          <AlertMessage
            confirmAction={() => {
              setNotification(false)
              mintToken(mintAmount)
            }}
            onCloseAlert={() => setNotification(false)}
            text={`Are you sure you want to mint ${mintAmount} CRC to the ${group?.name} group?`}
          />
        </AnimatePresence>
      )}
      <Title hasBackButton text="Send circles to a group" />
      <FormWrapper>
        <TransferUserInformation
          amountText="Your total balance:"
          amountValue={circles}
          label="Send from"
          name={user?.username}
          photo={user?.avatarUrl}
        />
        <TransferUserInformation
          amountText="Maximum amount:"
          amountValue={mintMaxAmount}
          label="Send to"
          name={group?.name ?? groupAddress}
        />
        <Input
          icon={
            <Icon>
              <Image alt="Configuration" height={15} src="/images/crc.svg" width={11} />
            </Icon>
          }
          information="This is a message This is a message This is a message"
          label="Enter amount"
          mandatory
          setValue={setMintAmount}
          type="number"
          value={mintAmount}
        />
        <Input
          information="This is a message This is a message This is a message"
          label="Add note"
          mandatory
          setValue={setNote}
          value={note}
        />
        <ActionWrapper>
          <ButtonSecondary disabled={!connected || loading} onClick={() => setNotification(true)}>
            Mint tokens
          </ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default CreateGroup