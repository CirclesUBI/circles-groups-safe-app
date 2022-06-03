import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence, motion } from 'framer-motion'

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
`
const Info = styled.span`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  height: 16px;
  margin-right: 10px;
  padding: 3px;
  transition: all 0.3s ease-in-out;
  width: 16px;
`
const TooltipWrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.general.space / 2}px;
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  font-size: 1.2rem;
  padding: ${({ theme }) => theme.general.space / 4}px ${({ theme }) => theme.general.space}px;
  position: absolute;
  right: 100%;
  top: -100%;
  margin-top: 50%;
  margin-right: 5px;
  max-width: 180px;
  width: max-content;
  white-space: pre-line;
`

interface Props {
  text: string
}

export const Tooltip: React.FC<Props> = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <Wrapper
      onMouseEnter={() => {
        {
          setIsHovering(true)
        }
      }}
      onMouseLeave={() => {
        {
          setIsHovering(false)
        }
      }}
    >
      <AnimatePresence initial={true}>
        {isHovering && (
          <TooltipWrapper
            animate={{ opacity: 1, y: '0' }}
            exit={{ opacity: 0, y: '-10px' }}
            initial={{ opacity: 0, y: '-10px' }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 1360, damping: 150 }}
          >
            {text}
          </TooltipWrapper>
        )}
      </AnimatePresence>
      <Info>
        <Image alt="information" height={14} src="/images/icon-information.svg" width={14} />
      </Info>
    </Wrapper>
  )
}
