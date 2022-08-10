export function isToday(someDate: Date) {
  return new Date().toDateString() === someDate.toDateString()
}
