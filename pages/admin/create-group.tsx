import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { Columns } from '@/src/components/layout/Columns'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'
import { genericSuspense } from '@/src/components/safeSuspense'
import { useCreateGroupTx } from '@/src/hooks/useCreateGroup'
import { addresses } from '@/src/utils/addresses'
import { fixedNumber } from '@/src/utils/formatNumber'

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

// @TODO Max available fee amount is 25.5. See Group Contract: uint8 _mintFeePerThousand (0..255)
const GROUP_MAX_FEE = 25.5

const CreateGroup: NextPage = () => {
  const { safe } = useSafeAppsSDK()
  const { execute } = useCreateGroupTx()

  const [groupName, setGroupName] = useState<string>('')
  const [groupSymbol, setGroupSymbol] = useState<string>('')
  const [fee, setFee] = useState<string>('')
  const [treasury, setTreasury] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSuccess = () => {
    setLoading(false)
    router.push('/')
  }
  const onError = () => {
    setLoading(false)
  }
  const createGroup = async () => {
    setLoading(true)
    // as we use the fee in percentage (%) we must multiply the fee amount by 10
    // to allow the user to set a fee of 0.1 e.g
    const feeAmount = String(parseFloat(fee || '0') * 10)
    await execute(
      [
        addresses.gnosis.HUB.address, // @TODO Should work for other networks, not just gnosis
        treasury,
        safe.safeAddress,
        feeAmount,
        groupName,
        groupSymbol,
      ],
      undefined,
      onSuccess,
      onError,
    )
  }

  const _isValidFee = (_fee: number) => _fee >= 0 && _fee <= GROUP_MAX_FEE

  const setValidFeeAmount = (feeAmount: string) => {
    if (feeAmount) {
      const newFee = parseFloat(feeAmount)
      if (_isValidFee(newFee)) {
        const fixedFee = fixedNumber(newFee, 1)
        setFee(String(fixedFee))
      }
    } else {
      setFee('')
    }
  }

  const isValidTreasury = treasury && isAddress(treasury)
  const isValidFee = _isValidFee(parseFloat(fee))
  const isDisabled = !groupName || !groupSymbol || !isValidTreasury || !isValidFee || loading

  return (
    <>
      <Title text="Create group" />
      <FormWrapper>
        <Columns columnsNumber={1}>
          <Input
            label="Name"
            mandatory
            maxLength={30}
            minLength={4}
            name="fullname"
            placeholder="Group Name..."
            setValue={setGroupName}
            type="text"
            value={groupName}
          />
        </Columns>
        <Columns columnsNumber={2}>
          <Input
            information="Group Token Symbol"
            label="Symbol"
            mandatory
            maxLength={10}
            placeholder="CRC..."
            setValue={setGroupSymbol}
            type="text"
            value={groupSymbol}
          />
          <Input
            information="Cost of minting tokens to the group currency. Max available is 25.5"
            label="Fee (%)"
            placeholder="0"
            setValue={setValidFeeAmount}
            type="number"
            value={fee}
          />
        </Columns>
        <Columns columnsNumber={1}>
          <Input
            addressField
            information="Account (Safe address) where individual circles are stored and saved."
            label="Treasury"
            mandatory
            placeholder="0x..."
            setValue={setTreasury}
            type="text"
            value={treasury}
          />
        </Columns>
        <ActionWrapper>
          <ButtonSecondary disabled={isDisabled} onClick={createGroup}>
            Create Group
          </ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default genericSuspense(CreateGroup)
