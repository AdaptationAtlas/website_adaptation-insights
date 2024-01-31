'use client'

import { useState } from 'react'
import cn from 'classnames'

const Footer = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const year = new Date().getFullYear() // TODO: move into separate component
  const handleCopyToClipboard = async () => {
    const url = window.location.origin;  // Get the root URL of the application

    try {
      await navigator.clipboard.writeText(url);
      // Temporarily display a confirmation tooltip
      setTooltipVisible(true);
      setTimeout(() => {
        setTooltipVisible(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  }

  return (
    <footer className='flex justify-between w-full p-5'>
      <p>© {year} AAA & CGIAR</p>
      {/* TODO: make this a component */}
      <div className='relative'>
        <button
          onClick={handleCopyToClipboard}
          className='font-medium hover:text-brand-green transition-colors'
        >
          Share
        </button>
        <div className={cn(
          'absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none',
          'bg-grey-700 text-white text-xs rounded px-2 py-1',
          'transition-all duration-500 ease-in-out',
          tooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        )}>
          Copied
        </div>
      </div>
    </footer>
  )
}
export default Footer