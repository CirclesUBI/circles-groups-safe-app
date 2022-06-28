import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { TokenBalance } from '@gnosis.pm/safe-apps-sdk'
import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { TransferUserInformation } from '@/src/components/assets/TransferUserInformation'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
import { useGroupCurrencyTokensByIds } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGroupMintToken } from '@/src/hooks/useGroupMintToken'
import { useSafeBalances } from '@/src/hooks/useSafeBalances'
import useSafeTransaction from '@/src/hooks/useSafeTransaction'
import { useUserSafe } from '@/src/hooks/useUserSafe'
import { useWeb3Connected } from '@/src/providers/web3ConnectionProvider'
import { addresses } from '@/src/utils/addresses'
import encodeTransaction from '@/src/utils/encodeTransaction'
import { transformPathToTransferThroughParams } from '@/src/utils/pathfinderAPI'

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

const CRC = 'CRC'

const getCirclesFromBalances = (tokenBalances: TokenBalance[]) => {
  const crcTokens = tokenBalances.filter((tokenBalance) => tokenBalance.tokenInfo.symbol === CRC)
  const circlesAmounts = crcTokens.map((crcToken) => crcToken.balance)
  const circles = circlesAmounts.reduce((prev, curr) => prev + parseInt(curr) ?? 0, 0)
  return String(circles)
}

const CreateGroup: NextPage = () => {
  const [notification, setNotification] = useState(false)
  const router = useRouter()
  const groupAddress = String(router.query?.group ?? '')
  // @TODO we dont need this provider most of the time, we can get rid of it
  const { web3Provider } = useWeb3Connected()
  const { connected, safe, sdk } = useSafeAppsSDK()
  // @TODO we shouldn't use this hook here
  const [tokenBalances] = useSafeBalances(sdk)
  const circles = getCirclesFromBalances(tokenBalances)
  const { mintMaxAmount, path } = useGroupMintToken(safe.safeAddress, groupAddress)
  const { groups } = useGroupCurrencyTokensByIds([groupAddress])
  const group = groups[0]
  const { user } = useUserSafe(safe.safeAddress)
  const { execute } = useSafeTransaction()

  const [mintAmount, setMintAmount] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const mintGroupToken = async () => {
    setLoading(true)
    // @TODO delete comments
    console.log({ path })
    console.log({ mintAmount })
    console.log({ mintMaxAmount })
    try {
      const { dests, srcs, tokenOwners, wads } = transformPathToTransferThroughParams(path ?? [])
      // @TODO fetch abi should be easier to do, also it is not inferring their types Hub neither GCT
      const { abi: hubAbi, address: hubAddress } = addresses['gnosis']['HUB']
      const transferThroughTx = await encodeTransaction(
        hubAddress,
        hubAbi,
        web3Provider.getSigner(),
        'transferThrough',
        [tokenOwners, srcs, dests, wads],
      )
      const { abi: GCTAbi } = addresses['gnosis']['GROUP_CURRENCY_TOKEN']
      const mintTx = await encodeTransaction(
        groupAddress,
        GCTAbi,
        web3Provider.getSigner(),
        'mint',
        [[safe.safeAddress], [mintAmount]],
      )
      const txs = [transferThroughTx, mintTx]
      await execute(sdk, txs)
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
              mintGroupToken()
            }}
            onCloseAlert={() => setNotification(false)}
            text={`Are you sure you want to mint ${mintAmount} CRC to the ${group.name} group?`}
          />
        </AnimatePresence>
      )}
      <Title hasBackButton text="Send circles to a group" />
      <FormWrapper>
        <TransferUserInformation
          amountText="Your total balance:"
          amountValue={circles}
          label="Send from"
          name={`${user?.username}`}
          photo={user?.avatarUrl}
        />
        <TransferUserInformation
          amountText="Maximum amount:"
          amountValue={mintMaxAmount}
          label="Send to"
          name={group.name}
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
