import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.section`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: ${({ theme }) => theme.general.space * 4}px
    ${({ theme }) => (theme.general.space / 2) * -1}px 0;
  padding-bottom: ${({ theme }) => theme.general.space * 6}px;
  overflow: hidden;
`

const Circle = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  height: auto;
  padding-top: 80%;
  position: relative;
  width: 80%;
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
    padding-top: 60%;
    width: 60%;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
    padding-top: 60%;
    width: 60%;
  }
  @media (min-width: ${({ theme }) => theme.themeBreakPoints.desktopWideStart}) {
    padding-top: 50%;
    width: 50%;
  }
`
const TextWrapper = styled.div`
  margin: 0 ${({ theme }) => theme.general.space * 4}px;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.6;
    margin-top: ${({ theme }) => theme.general.space * 2}px;
  }
  p {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1.6;
    max-width: 240px;
    margin: 0 auto;
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletPortraitStart}) {
      font-size: 1.8rem;
    }
    @media (min-width: ${({ theme }) => theme.themeBreakPoints.tabletLandscapeStart}) {
      font-size: 2.1rem;
    }
  }
`

const CreateButton = styled.a`
  align-items: center;
  display: flex;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  bottom: 0;
  border-radius: 50%;
  box-shadow: 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815),
    0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);
  justify-content: center;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-bottom: -30px;
  height: 60px;
  width: 60px;
`

const ImageWrapperLeft = styled.div`
  position: absolute;
  bottom: -40px;
  left: -50px;
  max-width: 50%;
`

const ImageWrapperRight = styled.div`
  position: absolute;
  bottom: -50px;
  right: -80px;
  max-width: 50%;
`

interface Props {
  text: string
  href: string
  actionText?: string
}

export const NoGroupCreated: React.FC<Props> = ({ actionText = '', href = '', text }) => {
  const router = useRouter()

  return (
    <Wrapper>
      <Circle>
        <TextWrapper>
          <p>{text}</p>
          {actionText && <h3>{actionText}</h3>}
        </TextWrapper>
        <ImageWrapperLeft>
          <Image alt="Person" height={208} src="/images/person01.svg" width={145} />
        </ImageWrapperLeft>
        <ImageWrapperRight>
          <Image alt="Person" height={263} src="/images/person02.svg" width={151} />
        </ImageWrapperRight>
        <Link href={href} passHref>
          <CreateButton>
            <Image alt="Create new Group" height={22} src="/images/icon-create.svg" width={22} />
          </CreateButton>
        </Link>
      </Circle>
    </Wrapper>
  )
}
