import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Dropdown, DropdownItem, DropdownPosition } from '@/src/components/dropdown/Dropdown'
import { LinkButton } from '@/src/components/pureStyledComponents/buttons/Button'
import { GroupCurrencyToken } from '@/src/hooks/subgraph/useGroupCurrencyToken'
import { useGeneral } from '@/src/providers/generalProvider'

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
  margin: ${({ theme }) => theme.general.space * 2}px 0 ${({ theme }) => theme.general.space * 3}px;
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

type Props = {
  groups: Array<GroupCurrencyToken>
}

export const GroupSelector: React.FC<Props> = ({ groups }) => {
  const router = useRouter()
  const [isDropDownOpen, setDropDownIsOpen] = useState<boolean>(false)
  const { activeCreatedGroup, switchCreatedGroup } = useGeneral()

  const switchGroup = (groupIndex: number) => {
    switchCreatedGroup(groupIndex), setDropDownIsOpen(false), router.push('/admin/')
  }
  return (
    <Dropdown
      dropdownButtonContent={
        <SelectGroup>
          <SelectedGroup>
            {activeCreatedGroup !== -1 ? groups[activeCreatedGroup].name : 'Select group'}
          </SelectedGroup>
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
            {groups.map(({ name }, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  switchGroup(index)
                }}
              >
                <span>{name}</span>
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
