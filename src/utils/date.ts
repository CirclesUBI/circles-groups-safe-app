export const dateFormat = (date: Date) => {
  const language = 'en-US'

  const day = date.getDate()
  const month = date.toLocaleString(language, { month: 'long' })
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const isToday = (someDate: Date) => new Date().toDateString() === someDate.toDateString()

  let dateFormated

  if (isToday(date)) {
    dateFormated = hours + ':' + minutes
  } else {
    dateFormated = day + ' ' + month + ', ' + year
  }
  return dateFormated
}
