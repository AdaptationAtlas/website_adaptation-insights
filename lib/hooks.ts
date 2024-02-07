import { useState, useEffect } from 'react'

// Custom hook to check for window width in React/NextJS
// Used to conditionally render components at specific breakpoints
export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  useEffect(() => {
    const checkMediaQuery = () => {
      // Check if the screen width is greater than 768 pixels
      const matches = window.matchMedia(`(min-width: ${width}px)`).matches
      setTargetReached(matches)
    }

    // Listen for changes to the viewport size
    window.addEventListener('resize', checkMediaQuery)

    // Check immediately on load
    checkMediaQuery()

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', checkMediaQuery)
  }, [width])

  return targetReached
}

