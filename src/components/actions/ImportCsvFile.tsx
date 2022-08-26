import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

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
`

const FileLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.fourth};
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
  margin: 0 0 ${({ theme }) => theme.general.space * 3}px;
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
  margin: 0 0 ${({ theme }) => theme.general.space * 2}px;
  color: ${({ theme }) => theme.colors.secondary};
`
const MessageResult = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 700;
  margin-left: ${({ theme }) => theme.general.space * 2}px;
`

const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.general.space}px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.fourth};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  margin-top: ${({ theme }) => theme.general.space * 6}px;
  padding: ${({ theme }) => theme.general.space * 4}px ${({ theme }) => theme.general.space * 2}px;
  p {
    text-align: center;
    font-size: 1.8rem;
    margin: 0;
    strong {
      display: block;
    }
  }
`
const ImageBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  groupAddress: string
  isAdd?: boolean
}

export const ImportCsvFile: React.FC<Props> = ({ groupAddress, isAdd = true }) => {
  const { invalidUsers, isFileLoaded, loading, onLoad, onSubmit, validUsers } = useImportCsv(
    groupAddress,
    isAdd,
  )

  const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onSubmit()
  }
  const isDisabled = !isFileLoaded || loading || !validUsers.length

  let title = 'Bulk add members'
  let actionText = 'will be added'
  let messageResultText = ''
  let buttonText = 'Add members'

  if (invalidUsers.length > 0) {
    if (validUsers.length === 0) {
      messageResultText = 'No users will be added'
    } else {
      messageResultText = 'Some members will not be added. Do you want to continue?'
    }
    if (!isAdd) {
      if (validUsers.length === 0) {
        messageResultText = 'No users will be removed'
      } else {
        messageResultText = 'Some members will not be removed. Do you want to continue?'
      }
    }
  }
  if (!isAdd) {
    title = 'Bulk remove members'
    actionText = 'will be removed'
    buttonText = 'Remove members'
  }

  return (
    <>
      <Wrapper>
        <h4>{title}</h4>
        <form>
          <InputWrapper>
            <input accept={'.csv'} onChange={(event) => onLoad(event.target.files)} type={'file'} />
          </InputWrapper>
          {isFileLoaded && (
            <>
              <FileResults>
                <ValidUsersText>
                  {validUsers.length} {actionText}
                </ValidUsersText>
                <InvalidUsersWrapper>
                  {invalidUsers.length > 0 ? (
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
                  ) : (
                    <span>No Invalid Addresses</span>
                  )}
                </InvalidUsersWrapper>
              </FileResults>
              <MessageResult>{messageResultText}</MessageResult>
            </>
          )}
          <FormActions>
            <Link href="#" passHref>
              <FileLink>Download CSV file with valid structure</FileLink>
            </Link>
            <ButtonPrimary disabled={isDisabled} onClick={handleOnSubmit}>
              {buttonText}
            </ButtonPrimary>
          </FormActions>
        </form>
      </Wrapper>
      <Success>
        <ImageBox>
          <Image alt="Failed" height={16} src="/images/icon-success.svg" width={23} />
        </ImageBox>
        <p>
          <strong>709 members</strong> were succesfully added.
        </p>
      </Success>
    </>
  )
}
