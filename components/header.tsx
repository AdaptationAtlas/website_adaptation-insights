'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import cn from 'classnames'
import Menu from './menu'

const Header = () => {
  // const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isMap = pathname === '/map'
  const headerClass =
    (isHome) ? 'fixed' :
      (isMap) ? 'relative bg-off-white border-b border-grey-100' :
        'fixed bg-off-white border-b border-grey-100'

  return (
    <header
      className={cn(
        headerClass,
        'z-50 md:h-14 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-5'
      )}
    >
      {/* Only render site logo on homepage at mobile width */}
      {isHome && (
        <Link href='/' className='hover:opacity-100 opacity-90 transition-opacity duration-300 ease-in-out'>
          <h1 className='block md:hidden text-white text-lg font-medium uppercase text-center md:p-3 tracking-wide ml-10'>
            <span className='hidden md:block'>African Agriculture Adaptation Tracking Tool</span>
            <span className='block md:hidden'>Adaptation Tracking</span>
          </h1>
        </Link>
      )}

      {/* Render site logo on all other pages */}
      {!isHome && (
        <Link href='/'>
          <h1 className='text-brand-green text-lg font-medium uppercase text-center md:p-3 tracking-wide ml-10'>
            <span className='hidden md:block'>African Agriculture Adaptation Tracking Tool</span>
            <span className='block md:hidden'>Adaptation Tracking</span>
          </h1>
        </Link>
      )}

      <Menu />
    </header>
  )
}
export default Header