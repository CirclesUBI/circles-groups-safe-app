import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { AnimatePresence, motion } from 'framer-motion'

import { CloseButton } from '@/src/components/assets/CloseButton'
import { User } from '@/src/components/assets/User'
import { MainMenuWrapper } from '@/src/components/layout/MainMenuWrapper'
import { MenuItem } from '@/src/components/navigation/MenuItem'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { menuLinks } from '@/src/constants/menuLinks'
import { useGroupsByMember } from '@/src/hooks/subgraph/useGroupsByMember'
import { useCirclesBalance } from '@/src/hooks/useCirclesBalance'
import { useUserSafe } from '@/src/hooks/useUserSafe'

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

const LinksList = styled.div`
  color: ${({ theme: { colors } }) => colors.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.general.space * 4}px;
  padding: 0 ${({ theme }) => theme.general.space * 2}px;
  width: 100%;
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

  const { safe, sdk } = useSafeAppsSDK()
  const { circles } = useCirclesBalance(sdk)

  const { user } = useUserSafe(safe.safeAddress)
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
            <Image
              alt="@TomasBari"
              height={40}
              objectFit="cover"
              src="/images/user.jpg"
              width={40}
            />
          }
          userTokens={circles}
          username={user?.username}
        />
        <LinksList as={motion.div} variants={variants}>
          <AnimatePresence>
            {menuLinks.map(({ href, title }, index) => (
              <div key={`links_${index}`}>
                <MenuItem closeMenu={() => onClose()} href={href} title={title} />
              </div>
            ))}
          </AnimatePresence>
        </LinksList>

        <MyGroups>
          {groupsByMember.length > 0 ? (
            <LinksList as={motion.div} variants={variants}>
              <AnimatePresence>
                <h4>{groupsByMember.length == 1 ? 'My created group' : 'My created groups'}</h4>
                {groupsByMember.map(({ name }, index) => (
                  <MenuItem
                    closeMenu={() => onClose()}
                    href="/admin"
                    key={`links_${index}`}
                    title={name}
                  />
                ))}
              </AnimatePresence>
              <Link href="/admin/create-group" passHref>
                <LinkButton onClick={() => onClose()}>Create new group</LinkButton>
              </Link>
            </LinksList>
          ) : (
            <LinksList>
              <NoGroupMessage>You don't have any group created yet.</NoGroupMessage>
              <Link href="/admin/create-group" passHref>
                <LinkButton onClick={() => onClose()}>Create new group</LinkButton>
              </Link>
            </LinksList>
          )}
        </MyGroups>
      </MainMenuWrapper>
    </>
  )
}
