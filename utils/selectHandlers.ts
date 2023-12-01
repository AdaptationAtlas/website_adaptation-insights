// Function to handle year selection
export const handleSelectedYear = (setSelectedYear: any) => (value: string) => {
  const selected = (value === 'all') ? 0 : parseInt(value)
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

// Function to handle currency selection
export const handleSelectedCurrency = (setSelectedCurrency: any) => (value: string) => {
  const selected = (value === 'USD') ? 'USD' : value
  setSelectedCurrency(selected)
}
