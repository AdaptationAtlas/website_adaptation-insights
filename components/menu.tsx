import React, { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { BiX, BiMenu } from 'react-icons/bi'

const Menu = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const menuClass = menuActive ? 'opacity-100 pointer-events-default' : 'opacity-0 pointer-events-none'
  const menuListClass = menuActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-15'

  const handleToggleMenu = () => {
    setMenuActive(!menuActive)
  }

  const menuLinks = [
    { link: '/map?view=partners', title: 'Partners' },
    { link: '/map?view=projects', title: 'Projects' },
    { link: '/tools', title: 'Tools' },
    { link: '/about', title: 'About this site' }
  ]

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
    <nav className='flex justify-between p-5'>
      <button
        className={
          cn(
            'fixed top-0 left-0 bg-off-white text-brand-green p-2 md:p-4 md:h-[55px] cursor-pointer',
            'hover:bg-brand-green hover:text-white transition-colors duration-300 ease-in-out'
          )
        }
        onClick={handleToggleMenu}
      >
        <BiMenu className='h-6 w-6' />
      </button>
      <div
        className={cn(
          menuClass,
          'fixed top-0 right-0 bottom-0 left-0 bg-brand-green transition duration-400',
        )}
      >
        <div className='flex items-center h-full w-full absolute top-0'>
          <ul className='flex flex-col gap-7 md:gap-14 ml-[45px] md:ml-[300px]'>
            {/* Menu Items */}
            {menuLinks.map((item, index) => (
              <li key={item.link} className={cn(
                menuListClass,
                'text-white text-2xl md:text-4xl bold uppercase tracking-wide',
                'transition duration-300 ease-in-out',
                { 'delay-[50ms]': index === 0, 'delay-[100ms]': index === 1, 'delay-[150ms]': index === 2, 'delay-[200ms]': index === 3 },
              )}>
                <Link href={item.link} legacyBehavior>
                  <a
                    onClick={handleToggleMenu}
                    className='hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href='/' legacyBehavior>
          <h1 onClick={handleToggleMenu} className={
            cn(
              'relative z-50 text-white text-lg font-medium uppercase text-center p-1.5 md:p-3 tracking-wide cursor-pointer',
              'hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'
            )
          }>
            <span className='hidden md:block'>African Agriculture Adaptation Tracking Tool</span>
            <span className='block md:hidden'>Adaptation Tracking</span>
          </h1>
        </Link>
        <button
          className='absolute z-50 top-1 left-1 md:top-2 md:left-2 hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'
          onClick={handleToggleMenu}
        >
          <BiX className='text-white h-10 w-10' />
        </button>
        <div className='fixed right-0 bottom-0 left-0 z-50'>
          {/* Footer */}
          <footer className='flex justify-between w-full p-5 text-white'>
            <p>© {year} AAA & CGIAR</p>
            {/* TODO: make this a component */}
            <div className='relative'>
              <button
                onClick={handleCopyToClipboard}
                className='font-medium hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'
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
        </div>
      </div>
    </nav>
  )
}
export default Menu
