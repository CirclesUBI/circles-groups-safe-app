import styled from 'styled-components'

import { Info } from '@/src/components/assets/Info'
import { Tooltip } from '@/src/components/assets/Tooltip'

const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`
interface Props {
  label: string
  mandatory?: boolean
  information?: string
}
export const InputLabelText: React.FC<Props> = ({ information, label, mandatory }) => {
  return (
    <LabelText>
      <strong>
        {label} {mandatory && '*'}
      </strong>
      {information && (
        <Tooltip text={information}>
          <Info />
        </Tooltip>
      )}
    </LabelText>
  )
}
