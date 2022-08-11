const NAMESPACE = `circles-groups-safe-app-${process.env.NODE_ENV}`

const getPath = (key: string) => {
  return `${NAMESPACE}-${key}`
}

export const getItem = (key: string) => {
  return window.localStorage.getItem(getPath(key))
}

export const hasItem = (key: string) => {
  const value = getItem(key)
  return value !== null && value !== 'null' && value !== 'undefined'
}

export const setItem = (key: string, value: string) => {
  return window.localStorage.setItem(getPath(key), value)
}

export const removeItem = (key: string) => {
  return window.localStorage.removeItem(getPath(key))
}

export const isAvailable = () => {
  try {
    setItem('test', '42')
    removeItem('test')
    return true
  } catch {
    return false
  }
}
