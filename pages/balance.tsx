import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'

import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItemBalance } from '@/src/components/assets/ListItemBalance'
import { NoResultsText } from '@/src/components/assets/NoResultsText'
import { Title } from '@/src/components/assets/Title'
import { TotalBalance } from '@/src/components/assets/TotalBalance'
import { User } from '@/src/components/assets/User'
import { getTCfromBalances, useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useUserSafe } from '@/src/hooks/useUserSafe'

const Section = styled.section`
  margin-top: ${({ theme }) => theme.general.space * 3}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    margin-top: ${({ theme }) => theme.general.space * 2}px;
    gap: ${({ theme }) => theme.general.space * 2}px;
  }
  h4 {
    font-size: 1.4rem;
    margin: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px
      ${({ theme }) => theme.general.space * 2}px;
    &.noBottomMargin {
      margin-bottom: 0;
    }
  }
  br {
    content: '';
    border-bottom: 4px solid #e0e0e0;
    height: 2px;
    display: block;
    margin: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 2}px
      0;
  }
`

const Balance: NextPage = () => {
  const { safe, sdk } = useSafeAppsSDK()
  const { circles, tokens } = useCirclesBalance(safe.safeAddress, sdk)
  const { user } = useUserSafe(safe.safeAddress)

  const regularBalance = useMemo(() => {
    const regularTokens = tokens.filter((token) => !token.isGroupCurrencyToken)
    return getTCfromBalances(regularTokens)
  }, [tokens])
  const groupTokens = useMemo(() => tokens.filter((token) => token.isGroupCurrencyToken), [tokens])

  return (
    <>
      <Title hasBackButton text="My Balance" />
      <Section>
        <h4 className="noBottomMargin">My Regular Tokens</h4>
        <User
          headerStyle="clean"
          userImage={
            user.avatarUrl ? (
              <Image
                alt={user?.username}
                height={40}
                objectFit="cover"
                src={user.avatarUrl}
                width={40}
              />
            ) : (
              <></>
            )
          }
          userTokens={regularBalance}
          username={user?.username}
        />

        <h4>My Group Tokens</h4>
        {groupTokens.length !== 0 ? (
          <ListContainer>
            {groupTokens.map((token, index) => (
              <ListItemBalance
                groupId={token.address}
                groupIndex={index}
                groupName={token.name}
                groupTokenSymbol={token.symbol}
                groupUserTokens={token.balance}
                key={token.address}
              />
            ))}
          </ListContainer>
        ) : (
          <NoResultsText className="notification" text="You don't have any tokens group yet." />
        )}

        <br />
        <TotalBalance userTokens={circles} />
      </Section>
    </>
  )
}
export default Balance
