'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import cn from 'classnames'

const Header = () => {
  // const router = useRouter()
  const pathname = usePathname()
  const isHome = (pathname === '/') ? true : false
  const headerClass = (isHome) ? 'absolute' : 'relative bg-off-white border-b border-grey-100'

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
          <h1 className='text-brand-green text-lg font-semibold uppercase transition-colors'>
            African Agriculture Adaptation Tracking Tool
          </h1>
        </Link>
      )}

      <div className="flex items-center gap-5 text-md text-black">
        <Link href='/projects' className="hover:underline">Projects</Link>
        <Link href='/partners' className="hover:underline">Partners</Link>
        <Link href='/about' className="hover:underline">About</Link>
      </div>
    </header>
  )
}
export default Header