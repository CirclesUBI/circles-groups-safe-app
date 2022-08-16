export const validNetwork = (address: string) => {
  if (address.startsWith('gno:')) {
    const addressStrip = address ? address.split('gno:').join('') : ''
    return String(addressStrip)
  }
  return address
}
