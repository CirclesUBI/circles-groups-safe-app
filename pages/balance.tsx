import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { ListContainer } from '@/src/components/assets/ListContainer'
import { ListItemBalance } from '@/src/components/assets/ListItemBalance'
import { Title } from '@/src/components/assets/Title'
import { TotalBalance } from '@/src/components/assets/TotalBalance'
import { User } from '@/src/components/assets/User'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useUserSafe } from '@/src/hooks/useUserSafe'
import formatNumber from '@/src/utils/formatNumber'

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
    margin: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px
      ${({ theme }) => theme.general.space * 3}px;
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
  const { circles } = useCirclesBalance(safe.safeAddress, sdk)
  const { user } = useUserSafe(safe.safeAddress)

  // @todo REMOVE and replace with real content
  const groupName = 'Bootnode'
  const groupId = '0xff7D68f4BE5381Ae7d4Df449E134D51E8246C7b8'
  const groupUserTokens = 1000
  const groupTokenSymbol = 'BN'

  return (
    <>
      <Title hasBackButton text="My Balance" />
      <Section>
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
          /* @todo replace with circles tokens without groups tokens */
          userTokens={circles}
          username={user?.username}
        />

        <h4>My group tokens</h4>
        <ListContainer>
          {/* @todo replace with real content*/}
          <ListItemBalance
            groupId={groupId}
            groupIndex={1}
            groupName={groupName}
            groupTokenSymbol={groupTokenSymbol}
            groupUserTokens={formatNumber(groupUserTokens)}
            key={groupId}
          />
        </ListContainer>
        <br />
        <TotalBalance userTokens={circles} />
      </Section>
    </>
  )
}
export default Balance
