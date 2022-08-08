export const stripGno = (
  event: { preventDefault: () => void; clipboardData: { getData: (arg0: string) => any } },
  setTreasury: (value: string) => void,
) => {
  if (event.clipboardData !== null) {
    event.preventDefault()
    const address = event.clipboardData.getData('text')
    const addressStrip = address ? address.split('gno:').join('') : ''
    return setTreasury(String(addressStrip))
  }
}
