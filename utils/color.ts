export function interpolateColor(value: number, minValue: number, maxValue: number, color1: string, color2: string, logScale: boolean): string {
  // If using log scale convert values to a logarithmic scale
  const logValue = Math.log(value || 1); // Avoid log(0) which is -Infinity
  const logMin = Math.log(minValue || 1);
  const logMax = Math.log(maxValue || 1);

  // If log scale, calculate the ratio of the log-scaled number within the range
  // Otherwise, calculate the ratio of the number within the range
  const ratio = (logScale) ? (logValue - logMin) / (logMax - logMin) : (value - minValue) / (maxValue - minValue)

  // Parse the color strings to RGB
  const hexToRgb = (hex: string): number[] =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
      , (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)!
      .map(x => parseInt(x, 16));

  const color1Rgb = hexToRgb(color1);
  const color2Rgb = hexToRgb(color2);

  // Linearly interpolate the color components
  const interpolate = (start: number, end: number, ratio: number): number => Math.round(start + (end - start) * ratio);

  const resultRgb: [number, number, number] = color1Rgb.map((component, index) => {
    return interpolate(component, color2Rgb[index], ratio);
  }) as [number, number, number]; // Asserting the type of resultRgb to be a tuple

  // Convert the RGB array back to a color string
  const rgbToHex = (r: number, g: number, b: number): string => "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  return rgbToHex(...resultRgb); // Now TypeScript knows resultRgb is a tuple
}
