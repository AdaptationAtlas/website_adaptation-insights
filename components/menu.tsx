import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { BiX, BiMenu } from 'react-icons/bi'

const Menu = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const menuClass = (menuActive) ? 'opacity-100 pointer-events-default' : 'opacity-0 pointer-events-none'
  const menuListClass = (menuActive) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'

  const handleToggleMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <nav className='flex justify-between p-5'>
      <button
        className='absolute top-0 left-0 bg-off-white p-4 h-[54px]'
        onClick={handleToggleMenu}
      >
        <BiMenu className='text-brand-green h-6 w-6' />
      </button>
      <div
        className={cn(
          menuClass,
          'fixed top-0 right-0 bottom-0 left-0 bg-brand-green transition duration-400',
        )}
      >
        <div className='flex items-center justify-center transition-opacity duration-300 ease-in-out h-full w-full absolute top-0'>
          <ul className='flex flex-col gap-14'>
            <li className={cn(
              menuListClass,
              'text-white text-4xl bold uppercase tracking-wide',
              'transition duration-300 delay-[50ms] ease-in-out',
            )}><Link onClick={handleToggleMenu} href='/partners'>Partners</Link></li>
            <li className={cn(
              menuListClass,
              'text-white text-4xl bold uppercase tracking-wide',
              'transition duration-300 delay-[100ms] ease-in-out',
            )}><Link onClick={handleToggleMenu} href='/projects'>Projects</Link></li>
            {/* <li className={cn(
              menuListClass,
              'text-white text-4xl bold uppercase tracking-wide',
              'transition duration-300 delay-[150ms] ease-in-out',
            )}><Link onClick={handleToggleMenu} href='/tools'>Our tools</Link></li> */}
            <li className={cn(
              menuListClass,
              'text-white text-4xl bold uppercase tracking-wide',
              'transition duration-300 delay-[150ms] ease-in-out',
            )}>Our tools</li>
            <li className={cn(
              menuListClass,
              'text-white text-4xl bold uppercase tracking-wide',
              'transition duration-300 delay-[200ms] ease-in-out',
            )}><Link onClick={handleToggleMenu} href='/about'>About this site</Link></li>
          </ul>
        </div>
        <Link onClick={handleToggleMenu} href='/'>
          <h1 className='relative z-50 text-white text-lg font-medium uppercase text-center mt-4 tracking-wide'>
            African Agriculture Adaptation Tracking Tool
          </h1>
        </Link>
        <button
          className='absolute top-2 left-2'
          onClick={handleToggleMenu}
        >
          <BiX className='text-white h-10 w-10' />
        </button>
        <div className='fixed right-0 bottom-0 left-0 z-50'>
          {/* TODO - replace with footer component - pass prop for dark or light */}
          <footer className='flex justify-between w-full p-5 text-white'>
            <p>© 2023 CGIAR</p>
            <p>Share</p>
          </footer>
        </div>
      </div>

    </nav>
  )
}
export default Menu