import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

import { Title } from '@/src/components/assets/Title'
import { User } from '@/src/components/assets/User'
import { ButtonSecondary } from '@/src/components/pureStyledComponents/buttons/Button'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 2}px;
  margin-top: ${({ theme }) => theme.general.space * 4}px;
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px 0;
  border-top: 1px solid #e0e0e0;
`

const CopyButton = styled(ButtonSecondary)`
  position: relative;
  gap: ${({ theme }) => theme.general.space}px;
`

const IsCopyied = styled.div`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
`

const QrWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.general.space * 4}px;
`

const WalletConnect: NextPage = () => {
  const [isCopied, toggleCopied] = useState(false)

  function CopyWalletAddress(address: string) {
    // Copy to clipboard
    navigator.clipboard.writeText(address)
    toggleCopied(true)
    setTimeout(function () {
      toggleCopied(false)
    }, 2000)
  }

  return (
    <>
      <Title text="Wallet connect" />
      <Wrapper>
        <User
          userImage={
            <Image
              alt="@TomasBari"
              height={40}
              objectFit="cover"
              src="/images/user.jpg"
              width={40}
            />
          }
          userTokens={1119.25}
          username="@TomasBari"
        />
        <QrWrapper>
          <Image alt="Configuration" height={244} src="/images/qr.png" width={244} />
        </QrWrapper>
        <CopyButton onClick={() => CopyWalletAddress('0xBA48fC180C496741cbbe8f2e5d0b38c9f66426bD')}>
          <AnimatePresence>
            {isCopied && (
              <IsCopyied
                animate={{ opacity: 1 }}
                as={motion.div}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.1, type: 'spring', stiffness: 1000, damping: 100 }}
              >
                Copied
              </IsCopyied>
            )}
          </AnimatePresence>
          <Image alt="Alerts" height={24} src="/images/icon-copy-w.svg" width={24} />
          Copy address
        </CopyButton>
      </Wrapper>
    </>
  )
}
export default WalletConnect
