import Link from 'next/link'

const Header = () => {
  return (
    <header className='top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-50 border-b border-grey-100'>
      <Link href='/'>
        <h1 className='bg-off-white text-cgiar-green text-xl font-bold uppercase hover:underline transition-colors'>Adaptation Insights</h1>
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