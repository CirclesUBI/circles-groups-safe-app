import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import React from 'react'
import styled from 'styled-components'

import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { AnimatePresence, motion } from 'framer-motion'

import { Alert } from '@/src/components/assets/Alert'
import { GroupSelector } from '@/src/components/assets/GroupSelector'
import { MenuIcon } from '@/src/components/assets/MenuIcon'
import { User } from '@/src/components/assets/User'
import { MainMenu } from '@/src/components/navigation/MainMenu'
import { ButtonPrimary, LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { chainsConfig } from '@/src/constants/chains'
import { ZERO_BN } from '@/src/constants/misc'
import { useGroupCurrencyTokensByOwner } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useNotificationsByUser } from '@/src/hooks/subgraph/useNotifications'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useUserSafe } from '@/src/hooks/useUserSafe'
import { useGeneral } from '@/src/providers/generalProvider'
import { useWeb3Connection } from '@/src/providers/web3ConnectionProvider'
import { getLastSeen, getUnseenNotifications } from '@/src/utils/notifications'
import { truncateStringInTheMiddle } from '@/src/utils/tools'

const vbAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'

const Wrapper = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  flex-grow: 0;
  gap: ${({ theme }) => theme.general.space * 2}px;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.general.space * 2}px;
  padding: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    padding: ${({ theme }) => theme.general.space * 3}px ${({ theme }) => theme.general.space * 5}px;
  }
`
const HomeLink = styled.span`
  cursor: pointer;
  transition: opacity 0.05s linear;
  width: 100px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: 130px;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    width: 184px;
  }
  &:active {
    opacity: 0.8;
  }
`

const WrapperBox = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ theme }) => theme.general.containerWidth};
  gap: ${({ theme }) => theme.general.space * 2}px;
  justify-content: center;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const ButtonIcon = styled.button`
  background-color: transparent;
  display: block;
  padding: 0;
  border: none;
  width: 24px;
  cursor: pointer;
  position: relative;
`

const ButtonLink = styled.a`
  display: block;
  width: 24px;
  position: relative;
  flex-shrink: 0;
`

const StartWrapper = styled.div`
  align-items: center;
  display: flex;
`

const EndWrapper = styled.div`
  align-items: center;
  display: flex;
`
const LinkGroup = styled(LinkButton)`
  line-height: normal;
  background-color: ${({ theme }) => theme.colors.fourth};
  border-color: ${({ theme }) => theme.colors.fourth};
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  display: block;
  font-size: 1.2rem;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    font-size: 1.6rem;
    max-width: 170px;
  }
`

const UserWrapper = styled.a`
  display: none;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    display: block;
  }
  div {
    transition: all 0.15s ease-out;
  }
  &:hover {
    > div {
      background-color: ${({ theme }) => theme.buttonPrimary.backgroundColorHover};
    }
  }
`
const UserGroups = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.general.space}px;
  flex-direction: row;
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

  const [isOpen, toggleOpen] = useState(false)

  const { safe, sdk } = useSafeAppsSDK()
  const { circles } = useCirclesBalance(safe.safeAddress, sdk)

  const { user } = useUserSafe(safe.safeAddress)

  const { groups: myCreatedGroups } = useGroupCurrencyTokensByOwner(safe.safeAddress)

  const { activeCreatedGroup } = useGeneral()

  const { notifications } = useNotificationsByUser(safe.safeAddress)
  const unseenNotifications = getUnseenNotifications(notifications)

  useEffect(() => {
    //Fix me later
    if (isOpen) window.document.body.style.overflow = 'hidden'
    if (!isOpen) {
      window.document.body.style.overflow = 'auto'
    }
  }, [isOpen])

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
    <>
      <Wrapper as="header" {...props}>
        <ButtonIcon
          onClick={() => {
            toggleOpen(true)
          }}
        >
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
              <UserGroups>
                <Link href="/balance" passHref>
                  <UserWrapper>
                    <User headerStyle="header" userTokens={circles} username={user?.username} />
                  </UserWrapper>
                </Link>
                {myCreatedGroups.length > 1 && <GroupSelector groups={myCreatedGroups} />}
                {myCreatedGroups.length === 1 && (
                  <Link href="/admin" passHref>
                    <LinkGroup>{myCreatedGroups[activeCreatedGroup].name}</LinkGroup>
                  </Link>
                )}
                {myCreatedGroups.length === 0 && (
                  <Link href="/admin/create-group" passHref>
                    <LinkGroup>Create group</LinkGroup>
                  </Link>
                )}
              </UserGroups>
            ) : (
              <ButtonPrimary onClick={connectWallet}>Connect</ButtonPrimary>
            )}
          </EndWrapper>
        </WrapperBox>
        <Link href="/activity-log" passHref>
          <ButtonLink>
            <Alert alerts={unseenNotifications.length} />
          </ButtonLink>
        </Link>
      </Wrapper>
      <motion.nav animate={isOpen ? 'open' : 'closed'} initial={false}>
        <AnimatePresence>
          {isOpen && <MainMenu onClose={() => toggleOpen(false)} />}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
