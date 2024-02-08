export function formatNumberCommas(x: number | null | undefined) {
  if (typeof x !== 'number' || isNaN(x) || x == null) {
    return "N/A"; // or some other default representation
  }

  // Ensuring the number is within the safe range
  if (x > Number.MAX_SAFE_INTEGER || x < Number.MIN_SAFE_INTEGER) {
    return "Number out of range";
  }

  // Formatting the number
  return x.toLocaleString(); // This will automatically use commas or other locale-specific separators
}
