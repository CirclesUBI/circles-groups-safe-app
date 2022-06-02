import styled from 'styled-components'

import { ButtonPrimaryLine } from '@/src/components/pureStyledComponents/buttons/Button'

const LoadMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.general.space * 2}px;
`
interface Props {
  text?: string
  moreResults: () => void
}

export const LoadMoreButton: React.FC<Props> = ({ moreResults, text = 'Load More' }) => {
  return (
    <LoadMore>
      <ButtonPrimaryLine onClick={() => moreResults()}>{text}</ButtonPrimaryLine>
    </LoadMore>
  )
}
