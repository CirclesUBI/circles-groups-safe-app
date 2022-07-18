export class TransactionError extends Error {
  code?: number
  data?: string
  constructor(message?: string, code?: number, data?: any) {
    super(message)
    if (code != null) {
      this.name = `Transaction Failed ${code.toString()}`
    } else {
      this.name = `Transaction Failed`
    }
    this.code = code
    this.data = JSON.stringify(data)
  }
}

export const createTransactionError = (error: any) => {
  return new TransactionError(
    error.data?.message || error.message || 'Unable to decode revert reason',
    error.data?.code || error.code,
    error.data,
  )
}
