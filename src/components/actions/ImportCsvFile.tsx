import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'

import { AnimatePresence } from 'framer-motion'

import { SuccessAddRemoveUsers } from '@/src/components/assets/SuccessAddRemoveUsers'
import { ButtonPrimary } from '@/src/components/pureStyledComponents/buttons/Button'
import { useImportCsv } from '@/src/hooks/useImportCsv'
import { shortenAddress } from '@/src/utils/tools'

const Wrapper = styled.section`
  background-color: rgba(236, 236, 236, 0.7);
  border-radius: ${({ theme }) => theme.general.borderRadius};
  margin-top: ${({ theme }) => theme.general.space * 6}px;
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px
    ${({ theme }) => theme.general.space * 2}px;
  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.general.space * 2}px;
  }
  h4 {
    margin-left: ${({ theme }) => theme.general.space * 2}px;
  }
`

const InputWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 60px;
  padding: ${({ theme }) => theme.general.space * 2}px;
  [type='file'] {
    background-color: rgba(233, 232, 221, 0.7);
    border-radius: 60px;
    overflow: hidden;
    width: 100%;
  }
  [type='file']::-webkit-file-upload-button {
    background: ${({ theme }) => theme.colors.fourth};
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.6rem;
    outline: none;
    padding: ${({ theme }) => theme.general.space * 2}px ${({ theme }) => theme.general.space * 3}px;
    margin-right: ${({ theme }) => theme.general.space * 2}px;
    transition: all 1s ease;
    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`
const FormActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-left: ${({ theme }) => theme.general.space * 2}px;
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.fourth};
    }
  }
`

const FileResults = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px
    ${({ theme }) => theme.general.space * 3}px;
`

const ValidUsersText = styled.h5`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 0 ${({ theme }) => theme.general.space}px;
  color: ${({ theme }) => theme.colors.primary};
`
const InvalidUsersWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.general.space}px;
    margin: ${({ theme }) => theme.general.space * 3}px 0
      ${({ theme }) => theme.general.space * 2}px;
    padding: 0;
    li {
      list-style: none;
      display: flex;
      justify-content: space-between;
      &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: ${({ theme }) => theme.general.space}px;
      }
      strong {
        align-items: center;
        display: flex;
        gap: ${({ theme }) => theme.general.space}px;
      }
    }
  }
`
const InvalidUsersText = styled.h5`
  font-size: 1.6rem;
  font-weight: 700;
  margin: ${({ theme }) => theme.general.space * 2}px 0;
  color: ${({ theme }) => theme.colors.secondary};
`
const MessageResult = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 700;
  margin-left: ${({ theme }) => theme.general.space * 2}px;
`

interface Props {
  groupAddress: string
  isAdd?: boolean
}

export const ImportCsvFile: React.FC<Props> = ({ groupAddress, isAdd = true }) => {
  const { invalidUsers, isFileLoaded, loading, onLoad, onSubmit, resetFileLoaded, validUsers } =
    useImportCsv(groupAddress, isAdd)
  const [openModal, setOpenModal] = useState(false)

  const onError = () => {
    // @todo shall we do something?
  }

  const onSuccess = () => {
    const OPEN_MODAL_TIME = 10000 // 10seconds
    setOpenModal(true)
    setTimeout(() => {
      setOpenModal(false)
      resetFileLoaded()
    }, OPEN_MODAL_TIME)
  }

  const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onSubmit(onSuccess, onError)
  }
  const isDisabled = !isFileLoaded || loading || !validUsers.length

  let messageResultText = ''

  if (invalidUsers.length > 0) {
    if (validUsers.length === 0) {
      messageResultText = `No members will be ${isAdd ? 'added' : 'removed'}`
    } else {
      messageResultText = `Some members will not be ${
        isAdd ? 'added' : 'removed'
      }. Do you want to continue?`
    }
  }

  return (
    <>
      <Wrapper>
        <h4>Bulk {isAdd ? 'add' : 'remove'} members</h4>
        <form>
          <InputWrapper>
            <input accept={'.csv'} onChange={(event) => onLoad(event.target.files)} type={'file'} />
          </InputWrapper>
          {isFileLoaded && !openModal && (
            <>
              <FileResults>
                <ValidUsersText>
                  {validUsers.length} members will be {isAdd ? 'added' : 'removed'}
                </ValidUsersText>
                <InvalidUsersWrapper>
                  {invalidUsers.length > 0 && (
                    <>
                      <InvalidUsersText>{invalidUsers.length} failed</InvalidUsersText>
                      <ul>
                        {invalidUsers.map((user, id) => (
                          <li key={`invalid-user-${id}`}>
                            <strong>
                              {' '}
                              <Image
                                alt="Failed"
                                height={8}
                                src="/images/icon-failed.svg"
                                width={8}
                              />{' '}
                              {user.username}
                            </strong>{' '}
                            <span>{shortenAddress(user.address)}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </InvalidUsersWrapper>
              </FileResults>
              <MessageResult>{messageResultText}</MessageResult>
            </>
          )}
          <FormActions>
            <a download href="/filse/import-file.csv">
              Download CSV file with valid structure
            </a>
            <ButtonPrimary disabled={isDisabled} onClick={handleOnSubmit}>
              {isAdd ? 'Add' : 'Remove'} members
            </ButtonPrimary>
          </FormActions>
        </form>
      </Wrapper>
      {openModal && (
        <AnimatePresence>
          <SuccessAddRemoveUsers isAdd={isAdd} numberMembers={validUsers.length} />
        </AnimatePresence>
      )}
    </>
  )
}
