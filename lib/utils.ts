export function formatNumberCommas(x: number) {
  if (x && x !== undefined && x !== null && x !== -1) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return x
  }
}