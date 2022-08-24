import React, { useState } from 'react'
// import FileInput from 'react-file-input'

import { Button } from '../pureStyledComponents/buttons/Button'
import { useImportCsv } from '@/src/hooks/useImportCsv'

interface Props {
  groupAddress: string
}

export const ImportCsvFile: React.FC<Props> = ({ groupAddress }) => {
  const [file, setFile] = useState()
  const [usersBatch, setUsersBatch] = useState<string[]>([])
  const { addUsersToGroup } = useImportCsv(groupAddress)

  const fileReader = new FileReader()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: any) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const csvFileToArray = (file: string) => {
    // TODO: finish refactoring csv values iteration just to take all rows without deliminters
    const csvRows = file.split('\n')
    const userAddressesList = csvRows.filter((rowValue) => {
      if (rowValue) {
        return rowValue
      }
    })
    setUsersBatch(userAddressesList)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    if (file) {
      fileReader.onload = function (event) {
        if (event.target?.result) {
          csvFileToArray(event.target.result)
        }
      }
      fileReader.readAsText(file)
      if (usersBatch.length !== 0) {
        addUsersToGroup(usersBatch)
      }
    }
  }

  return (
    <div>
      <form>
        <input accept={'.csv'} onChange={handleOnChange} type={'file'} />
        <Button
          onClick={(e) => {
            handleOnSubmit(e)
          }}
        >
          IMPORT CSV
        </Button>
      </form>
    </div>
  )
}
