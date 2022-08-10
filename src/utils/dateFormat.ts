import { isToday } from '@/src/utils/isToday'

export const dateFormat = (isDate: Date) => {
  const language = 'en-US'

  const day = isDate.getDay()
  const month = isDate.toLocaleString(language, { month: 'long' })
  const year = isDate.getFullYear()
  const hours = isDate.getHours()
  const minutes = (isDate.getMinutes() < 10 ? '0' : '') + isDate.getMinutes()

  let dateFormated

  if (isToday(isDate)) {
    dateFormated = hours + ':' + minutes
  } else {
    dateFormated = day + ' ' + month + ', ' + year
  }
  return dateFormated
}
