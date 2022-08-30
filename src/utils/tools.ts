const WAIT_TIME = 500
const MAX_ATTEMPT = 10

export const truncateStringInTheMiddle = (
  str: string,
  strPositionStart: number,
  strPositionEnd: number,
) => {
  const minTruncatedLength = strPositionStart + strPositionEnd
  if (minTruncatedLength < str.length) {
    return `${str.substr(0, strPositionStart)}...${str.substr(
      str.length - strPositionEnd,
      str.length,
    )}`
  }
  return str
}

export const shortenAddress = (address: string, first = 6, last = 4): string => {
  return address ? `${address.slice(0, first)}...${address.slice(-last)}` : address
}

// @todo is it necessary to return a promise?
export const wait = <T>(fn: () => Promise<T>, time?: number): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fn()
        resolve(response)
      } catch (e) {
        reject(e)
      }
    }, time ?? WAIT_TIME)
  })
}

// @todo is it necessary to use too many promises?
export const retry = async <P, R>(
  args: P,
  fun: (args: P) => Promise<R>,
  until: (result: R) => boolean,
  attempt = 1,
  time?: number,
  maxAttempt?: number,
): Promise<R | null> => {
  if (attempt >= (maxAttempt ?? MAX_ATTEMPT)) return null
  // @todo we duplicate the waiting time per iteration, we might want to increase exponentially instead
  const waitingTime = (time ?? WAIT_TIME) * (attempt * 2)
  const response = await wait(async () => await fun(args), waitingTime)
  let finished = false
  if (until) {
    finished = until(response)
  }
  if (finished) return response
  return retry(args, fun, until, attempt + 1)
}
