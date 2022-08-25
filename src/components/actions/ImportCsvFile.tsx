import React from 'react'

import { Button } from '../pureStyledComponents/buttons/Button'
import { useImportCsv } from '@/src/hooks/useImportCsv'

interface Props {
  groupAddress: string
}

export const ImportCsvFile: React.FC<Props> = ({ groupAddress }) => {
  const { invalidAddresses, isFileLoaded, loading, onLoad, onSubmit, validAddresses } =
    useImportCsv(groupAddress)

  const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onSubmit()
  }
  const isDisabled = !isFileLoaded || loading || !validAddresses.length

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
            <span>Amount of valid addresses {validAddresses.length}</span>
          </div>
          <div>
            <h3>Invalid Addresses</h3>
            {invalidAddresses.length > 0 ? (
              <ul>
                {invalidAddresses.map((address, id) => (
                  <li key={`invalid-address-${id}`}>{address}</li>
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
