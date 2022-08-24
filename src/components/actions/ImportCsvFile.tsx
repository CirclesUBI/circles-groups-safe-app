import React, { useState } from 'react'

import { Button } from '../pureStyledComponents/buttons/Button'
import { useImportCsv } from '@/src/hooks/useImportCsv'

interface Props {
  groupAddress: string
}

export const ImportCsvFile: React.FC<Props> = ({ groupAddress }) => {
  const [file, setFile] = useState<File | null>()
  const { addUsersToGroup } = useImportCsv(groupAddress)

  const handleOnChange = (fileList: FileList | null) => {
    // TODO: validate if file not present or invalid to disable/enable submit button
    if (fileList) {
      const uploadedFile = fileList.item(0)
      if (uploadedFile) {
        setFile(uploadedFile)
      }
    }
  }

  const csvFileToArray = (fileContent: string | ArrayBuffer) => {
    const csvRows = String(fileContent).split('\n')
    const filteredAddresses = csvRows.filter(Boolean)
    return filteredAddresses
  }

  const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const onloadResult = event.target?.result
        if (onloadResult) {
          const usersBatch = csvFileToArray(onloadResult)
          if (usersBatch.length !== 0) {
            addUsersToGroup(usersBatch)
          }
        }
      }
      // TODO: check synchronism between fileReader calls
      fileReader.readAsText(file)
    }
  }

  return (
    <div>
      <form>
        <input
          accept={'.csv'}
          onChange={(event) => handleOnChange(event.target.files)}
          type={'file'}
        />
        <Button onClick={handleOnSubmit}>IMPORT CSV</Button>
      </form>
    </div>
  )
}
