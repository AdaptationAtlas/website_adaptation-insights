import Link from 'next/link'

const Header = () => {
  return (
    <header className='relative z-50 h-14 top-0 left-0 right-0 flex items-center justify-between px-5 bg-off-white border-b border-grey-100'>
      <Link href='/'>
        <h1 className='text-cgiar-green text-xl font-bold uppercase hover:underline transition-colors'>Adaptation Insights</h1>
      </Link>
      <div className="flex items-center gap-5 text-md text-white">
        <Link href='/projects' className="hover:underline">Projects</Link>
        <Link href='/partners' className="hover:underline">Partners</Link>
        <Link href='/about' className="hover:underline">About</Link>
      </div>
    </header>
  )
}
export default Header