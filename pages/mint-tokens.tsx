import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence } from 'framer-motion'

import { AlertMessage } from '@/src/components/assets/AlertMessage'
import { Crc } from '@/src/components/assets/Crc'
import { Input } from '@/src/components/assets/Input'
import { Title } from '@/src/components/assets/Title'
import { TransferUserInformation } from '@/src/components/assets/TransferUserInformation'
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
  const [notification, setNotification] = useState(false)
  return (
    <>
      {notification && (
        <AnimatePresence>
          <AlertMessage
            confirmAction={() => setNotification(false)}
            onCloseAlert={() => setNotification(false)}
            text={'Are you sure you want to mint 50 CRC to the Bootnode group?'}
          />
        </AnimatePresence>
      )}
      <Title hasBackButton text="Send circles to a group" />
      <FormWrapper>
        <TransferUserInformation
          amountText="Your total balance:"
          amountValue={84.34}
          label="Send from"
          name="@TomasBari"
          userPhoto="/images/user.jpg"
        />
        <TransferUserInformation
          amountText="Maximum amount:"
          amountValue={84.34}
          isGroup
          label="Send to"
          name="Bootnode Group"
        />

        <Input
          icon={
            <Icon>
              <Crc />
            </Icon>
          }
          information="This is a message This is a message This is a message"
          label="Enter amount"
          mandatory
          type="number"
        />

        <Input
          information="This is a message This is a message This is a message"
          label="Add note"
          mandatory
        />

        <ActionWrapper>
          <ButtonSecondary onClick={() => setNotification(true)}>Mint tokens</ButtonSecondary>
        </ActionWrapper>
      </FormWrapper>
    </>
  )
}
export default CreateGroup
