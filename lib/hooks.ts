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

export const useWindowWidth = () => {
  // Initialize state with undefined to account for server-side rendering,
  // where window object is not available.
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : undefined)

  useEffect(() => {
    const handleResize = () => {
      // Update the window width state with the current window width
      setWindowWidth(window.innerWidth)
    }

    // Set up event listener for window resize
    window.addEventListener('resize', handleResize)

    // Call handleResize immediately to set the initial width
    handleResize()

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures this effect runs only on mount and unmount

  return windowWidth
}


