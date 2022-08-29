import React, { useState } from 'react'

import { Button } from '../pureStyledComponents/buttons/Button'
import { useImportCsv } from '@/src/hooks/useImportCsv'

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

  return (
    <div>
      <form>
        <input accept={'.csv'} onChange={(event) => onLoad(event.target.files)} type={'file'} />
        <Button disabled={isDisabled} onClick={handleOnSubmit}>
          Import CSV file
        </Button>
      </form>
      {isFileLoaded && !openModal && (
        <>
          <div>
            <h3>Valid Addresses</h3>
            <span>Amount of valid addresses {validUsers.length}</span>
          </div>
          <div>
            <h3>Invalid Addresses</h3>
            {invalidUsers.length > 0 ? (
              <ul>
                {invalidUsers.map((user, id) => (
                  <li key={`invalid-user-${id}`}>
                    <span>
                      {user.username} - {user.address}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <span>No Invalid Addresses</span>
            )}
          </div>
        </>
      )}
      {openModal && (
        <div>
          <h3>Successful Operation</h3>
          <span>
            Amount of {isAdd ? 'added' : 'removed'} addresses {validUsers.length}
          </span>
        </div>
      )}
    </div>
  )
}
