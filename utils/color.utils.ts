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

// Generate color stops for colorRange function

// Helper function to calculate logarithm with base 10
const log10 = (value: number) => Math.log10(value || 1)

// Function to generate logarithmic buckets
export const generateLogarithmicBuckets = (minValue: number, maxValue: number, numBuckets: number) => {
  const logMin = log10(minValue)
  const logMax = log10(maxValue)
  const step = (logMax - logMin) / (numBuckets - 1)

  const buckets = []
  for (let i = 0; i < numBuckets; i++) {
    buckets.push(Math.pow(10, logMin + step * i))
  }
  return buckets
}
