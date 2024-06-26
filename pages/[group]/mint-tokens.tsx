import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { Crc } from '@/src/components/assets/Crc'
import { InformationText } from '@/src/components/assets/InformationText'
import { MintInformation } from '@/src/components/assets/MintInformation'
import { Title } from '@/src/components/assets/Title'
import { TransferUserInformation } from '@/src/components/assets/TransferUserInformation'
import { Input } from '@/src/components/form/Input'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
import { genericSuspense } from '@/src/components/safeSuspense'
import { isUserAllowedToMint } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useGroupMintToken } from '@/src/hooks/useGroupMintToken'
import { useUserSafe } from '@/src/hooks/useUserSafe'
import { stringToValidFloat } from '@/src/utils/formatNumber'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin: ${({ theme }) => theme.general.space * 4}px 0 0;
  padding: 0 ${({ theme }) => theme.general.space * 2}px 0;
`
const InfoWrapper = styled.div`
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px 0;
`
const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
  button {
    width: 100%;
  }
`

const Icon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: ${({ theme }) => theme.general.space * 2}px;
  pointer-events: none;
`

const CreateGroup: NextPage = () => {
  const router = useRouter()
  const groupAddress = String(router.query?.group ?? '')
  const { connected, safe, sdk } = useSafeAppsSDK()
  const { circles, tokens } = useCirclesBalance(safe.safeAddress, sdk)
  const { group, loading, mintMaxAmount, mintToken } = useGroupMintToken(
    safe.safeAddress,
    groupAddress,
    sdk,
  )
  const { user } = useUserSafe(safe.safeAddress)

  const [notification, setNotification] = useState(false)
  const [mintAmount, setMintAmount] = useState<string>('')

  const mintAmountNumber = stringToValidFloat(mintAmount)

  const isMintAmountGreaterThanMaxAmount =
    stringToValidFloat(mintAmount) > stringToValidFloat(mintMaxAmount)
  const isZero = stringToValidFloat(mintAmount) === 0
  const isMintAmountInvalid = isMintAmountGreaterThanMaxAmount || isZero
  const isTrustedPath = stringToValidFloat(mintMaxAmount) !== 0

  const feeNumber = group?.mintFeePerThousand ?? 0

  const isAllowedUser = group ? isUserAllowedToMint(safe.safeAddress, group) : false

  const isDisabledButton =
    !connected || loading || isMintAmountInvalid || mintAmountNumber === 0 || !isAllowedUser

  const groupToken = tokens.find(
    (token) => token.address.toLowerCase() === groupAddress.toLowerCase(),
  )

  let notAllowedText = ''
  if (!connected) {
    notAllowedText = 'Only connected users can mint'
  } else {
    if (!isAllowedUser) {
      notAllowedText = `Only ${group?.allowedMintingUser} are allowed to mint.`
    } else if (!isTrustedPath) {
      notAllowedText = 'Only users with a trust path to the group are allowed to mint'
    } else if (isMintAmountGreaterThanMaxAmount) {
      notAllowedText = "You don't have enough balance"
    }
  }

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
          amountText="My total balance:"
          amountValue={circles}
          label="Send from"
          name={user?.username}
          photo={user?.avatarUrl}
        />
        <TransferUserInformation
          address={groupAddress}
          amountText="Maximum amount:"
          amountValue={mintMaxAmount}
          groupUserTokens={groupToken?.balance ?? ''}
          label="Send to"
          name={group?.name ?? groupAddress}
        />
        <Input
          icon={
            <Icon>
              <Crc />
            </Icon>
          }
          information="Amount of individual tokens to be sent to this group Treasury"
          label="Enter amount"
          mandatory
          setValue={setMintAmount}
          type="number"
          value={mintAmount}
        />
      </FormWrapper>
      <InfoWrapper>
        <AnimatePresence>
          {mintAmountNumber > 0 && (
            <MintInformation fee={feeNumber} mintAmount={mintAmountNumber} />
          )}
        </AnimatePresence>
      </InfoWrapper>
      <ActionWrapper>
        <ButtonSecondary disabled={isDisabledButton} onClick={() => setNotification(true)}>
          Mint tokens
        </ButtonSecondary>
      </ActionWrapper>
      <AnimatePresence exitBeforeEnter>
        {notAllowedText && <InformationText>* {notAllowedText}</InformationText>}
      </AnimatePresence>
    </>
  )
}
export default genericSuspense(CreateGroup)
