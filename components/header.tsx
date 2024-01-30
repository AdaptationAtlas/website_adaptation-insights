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
        'z-50 h-14 top-0 left-0 right-0 flex items-center justify-between px-5'
      )}
    >

      {/* Don't render site logo on homepage */}
      {!isHome && (
        <Link href='/'>
          <h1 className='text-brand-green text-lg font-semibold uppercase ml-10'>
            African Agriculture Adaptation Tracking Tool
          </h1>
        </Link>
      )}

      <Menu />
    </header>
  )
}
export default Header