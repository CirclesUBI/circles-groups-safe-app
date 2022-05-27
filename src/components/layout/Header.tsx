import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'

import { Alert } from '@/src/components/assets/Alert'
import { MenuIcon } from '@/src/components/assets/MenuIcon'
import { ButtonPrimary } from '@/src/components/pureStyledComponents/buttons/Button'
import { chainsConfig } from '@/src/constants/chains'
import { ZERO_BN } from '@/src/constants/misc'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { truncateStringInTheMiddle } from '@/src/utils/tools'

const vbAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'

const Wrapper = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  flex-grow: 0;
  gap: ${({ theme }) => theme.general.space * 2}px;
  justify-content: space-between;
  padding: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    padding: ${({ theme }) => theme.general.space * 3}px ${({ theme }) => theme.general.space * 5}px;
  }
`
const HomeLink = styled.span`
  transition: opacity 0.05s linear;
  width: 100px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: 130px;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    width: 184px;
  }
  &:active {
    opacity: 0.7;
  }
`

const WrapperBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ theme }) => theme.general.containerWidth};
`

const ButtonIcon = styled.button`
  background-color: transparent;
  display: block;
  padding: 0;
  border: none;
  width: 24px;
  cursor: pointer;
`

const StartWrapper = styled.div`
  align-items: center;
  display: flex;
`

const EndWrapper = styled.div`
  align-items: center;
  display: flex;
`
const UserInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  font-weight: 500;
  font-size: 1.4rem;
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    font-size: 1.6rem;
  }
`

export const Header: React.FC = (props) => {
  const {
    address = '',
    appChainId,
    connectWallet,
    disconnectWallet,
    isAppConnected,
    isWalletConnected,
    pushNetwork,
    readOnlyAppProvider,
    setAppChainId,
    wallet,
    web3Provider,
  } = useWeb3Connection()

  const chainOptions = Object.values(chainsConfig)

  const [balance, setBalance] = useState<{ name: string; balance: string } | undefined>()

  useEffect(() => {
    async function getBalance() {
      if (isAppConnected) {
        const res = (await web3Provider?.getBalance(address!)) || ZERO_BN
        if (isAppConnected) {
          setBalance({
            name: 'your balance',
            balance: formatUnits(res || ZERO_BN),
          })
        }
      } else {
        const res = await readOnlyAppProvider?.getBalance(vbAddress)
        if (!isAppConnected) {
          setBalance({ name: 'Vitalik balance', balance: formatUnits(res || ZERO_BN) })
        }
      }
    }

    if (!isWalletConnected && !readOnlyAppProvider) {
      setBalance(undefined)
    } else {
      getBalance()
    }
  }, [isAppConnected, isWalletConnected, readOnlyAppProvider, web3Provider, address])

  const [currentChain, setCurrentChain] = useState(chainOptions[0].name)

  return (
    <Wrapper as="header" {...props}>
      <ButtonIcon>
        <MenuIcon />
      </ButtonIcon>
      <WrapperBox>
        <StartWrapper>
          <Link href="/" passHref>
            <HomeLink>
              <Image
                alt="Circles Groups"
                height={83}
                layout="responsive"
                src="/images/circlesLogo.svg"
                width={184}
              />
            </HomeLink>
          </Link>
        </StartWrapper>
        <EndWrapper>
          {isWalletConnected ? (
            <UserInfo>@TomasBari</UserInfo>
          ) : (
            <ButtonPrimary onClick={connectWallet}>Connect</ButtonPrimary>
          )}
        </EndWrapper>
      </WrapperBox>
      <ButtonIcon>
        <Alert alerts={4} />
      </ButtonIcon>
    </Wrapper>
  )
}
