export function colorRange(value: number, buckets: number[], colors: string[]): string {
  if (isNaN(value)) {
    // Return a default color if the value is not a valid number
    return '#B7B7B7';
  }

  // Loop through the buckets to find the appropriate color
  for (let i = 0; i < buckets.length; i++) {
    if (value <= buckets[i]) {
      return colors[i];
    }
  }

  // If value exceeds all buckets, use the last color
  return colors[colors.length - 1];
}
