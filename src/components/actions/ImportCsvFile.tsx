import React from 'react'

import { Button } from '../pureStyledComponents/buttons/Button'
import { useImportCsv } from '@/src/hooks/useImportCsv'

interface Props {
  groupAddress: string
}

export const ImportCsvFile: React.FC<Props> = ({ groupAddress }) => {
  const { invalidUsers, isFileLoaded, loading, onLoad, onSubmit, validUsers } =
    useImportCsv(groupAddress)

  const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onSubmit()
  }
  const isDisabled = !isFileLoaded || loading || !validUsers.length

  return (
    <div>
      <form>
        <input accept={'.csv'} onChange={(event) => onLoad(event.target.files)} type={'file'} />
        <Button disabled={isDisabled} onClick={handleOnSubmit}>
          IMPORT CSV
        </Button>
      </form>
      {isFileLoaded && (
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
    </div>
  )
}
