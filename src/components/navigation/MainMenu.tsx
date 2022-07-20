import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

import { CloseButton } from '@/src/components/assets/CloseButton'
import { User } from '@/src/components/assets/User'
import { MainMenuWrapper } from '@/src/components/layout/MainMenuWrapper'
import { ListItemMainMenu } from '@/src/components/navigation/ListItemMainMenu'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { createdGroups } from '@/src/constants/createdGroups'
import { menuLinks } from '@/src/constants/menuLinks'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useUserSafe } from '@/src/hooks/useUserSafe'
import { useTab } from '@/src/providers/tabProvider'

const MenuHeader = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const HomeLink = styled.a`
  width: 130px;
  display: block;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    width: 150px;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    width: 184px;
  }
`

const LinksListWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
  flex-direction: column;
  display: flex;
  gap: ${({ theme }) => theme.general.space * 4}px;
`

const MyGroups = styled.div`
  align-items: center;
  background: rgba(233, 232, 221, 0.5);
  border-radius: ${({ theme }) => theme.general.space}px;
  padding: ${({ theme }) => theme.general.space * 6}px 0 ${({ theme }) => theme.general.space * 6}px;
  width: 100%;
  h4 {
    font-weight: 400;
  }
`
const NoGroupMessage = styled.h3`
  max-width: 24rem;
`

type Props = {
  onClose: () => void
}

export const MainMenu: React.FC<Props> = ({ onClose }) => {
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }
  const { switchTab } = useTab()

  const { safe, sdk } = useSafeAppsSDK()
  const { circles } = useCirclesBalance(sdk)

  const { user } = useUserSafe(safe.safeAddress)

  // @TODO: Reeplace with list of user created groups
  const { groupsByMember } = useGroupsByMember(safe.safeAddress)
  return (
    <>
      <MainMenuWrapper closeMenu={() => onClose()}>
        <MenuHeader>
          <Link href="/" passHref>
            <HomeLink onClick={() => onClose()}>
              <Image
                alt="Circles Groups"
                height={74}
                layout="responsive"
                src="/images/circlesLogoPositive.svg"
                width={164}
              />
            </HomeLink>
          </Link>
          <CloseButton closeMenu={() => onClose()} />
        </MenuHeader>
        <User
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
          userTokens={circles}
          username={user?.username}
        />
        <ListItemMainMenu
          LinksList={menuLinks}
          onClose={onClose}
          switchTab={switchTab}
          variants={variants}
        />

        <MyGroups>
          {createdGroups.length > 0 ? (
            <LinksListWrapper>
              <h4>{createdGroups.length == 1 ? 'My created group' : 'My created groups'}</h4>
              <ListItemMainMenu
                LinksList={createdGroups}
                onClose={onClose}
                switchTab={switchTab}
                variants={variants}
              />
              <Link href="/admin/create-group" passHref>
                <LinkButton onClick={() => onClose()}>Create new group</LinkButton>
              </Link>
            </LinksListWrapper>
          ) : (
            <LinksListWrapper>
              <NoGroupMessage>You don't have any group created yet.</NoGroupMessage>
              <Link href="/admin/create-group" passHref>
                <LinkButton onClick={() => onClose()}>Create new group</LinkButton>
              </Link>
            </LinksListWrapper>
          )}
        </MyGroups>
      </MainMenuWrapper>
    </>
  )
}
