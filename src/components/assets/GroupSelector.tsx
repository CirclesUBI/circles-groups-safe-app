import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from '@/src/components/dropdown/Dropdown'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { createdGroups } from '@/src/constants/createdGroups'

const LinkGroup = styled(LinkButton)`
  line-height: normal;
  background-color: ${({ theme }) => theme.colors.fourth};
  border-color: ${({ theme }) => theme.colors.fourth};
  padding: ${({ theme }) => theme.general.space}px ${({ theme }) => theme.general.space * 2}px;
`

const SelectGroup = styled(LinkGroup)`
  gap: ${({ theme }) => theme.general.space}px;
  border-radius: ${({ theme }) => theme.general.borderRadius};
  font-size: 1.4rem;
  line-height: 1.2;
  display: flex;
`

const SelectedGroup = styled.div`
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
`

const Icon = styled.div`
  flex-shrink: 0;
`

const ItemsList = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`

const CreateLink = styled.a`
  text-decoration: none;
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  text-align: right;
  &:hover {
    opacity: 1;
  }
`

export const GroupSelector: React.FC = () => {
  const [isDropDownOpen, setDropDownIsOpen] = useState<boolean>(false)
  return (
    <Dropdown
      dropdownButtonContent={
        <SelectGroup>
          <SelectedGroup>Bootnode</SelectedGroup>
          <Icon>
            <Image alt="down" height={5} src="/images/chevron-down.svg" width={9} />
          </Icon>
        </SelectGroup>
      }
      dropdownPosition={DropdownPosition.right}
      isOpen={isDropDownOpen}
      items={[
        <>
          <h3>My created groups</h3>
          <ItemsList>
            {createdGroups.map(({ title }, index) => (
              <DropdownItem key={index} onClick={() => setDropDownIsOpen(false)}>
                {title}
              </DropdownItem>
            ))}
          </ItemsList>
          <Link href="/admin/create-group" passHref>
            <CreateLink onClick={() => setDropDownIsOpen(false)}>Create a group</CreateLink>
          </Link>
        </>,
      ]}
      onDropDownClose={() => setDropDownIsOpen(false)}
      onDropDownToggle={() => setDropDownIsOpen((prevIsDropDownOpen) => !prevIsDropDownOpen)}
    />
  )
}
