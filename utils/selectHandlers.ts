// Function to handle year selection
export const handleSelectedYear = (setSelectedYear: any) => (value: string) => {
  const selected = (value === 'all') ? null : parseInt(value)
  setSelectedYear(selected)
}

// Function to handle country selection
export const handleSelectedCountry = (setSelectedCountry: any) => (value: string) => {
  const selected = (value === 'all') ? null : value
  setSelectedCountry(selected)
}

// Function to handle actor type selection
export const handleSelectedType = (setSelectedType: any) => (value: string) => {
  const selected = (value === 'all') ? null : value
  setSelectedType(selected)
}
