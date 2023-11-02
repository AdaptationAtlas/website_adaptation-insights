import Link from 'next/link'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`${openSans.className} text-black`}>
      <header className='absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-50'>
        <Link href='/'>
          <h1 className='text-white text-xl font-bold uppercase hover:underline transition-colors'>Adaptation Insights</h1>
        </Link>
        <div className="flex items-center gap-5 text-md text-white">
          <Link href='/projects' className="hover:underline">Projects</Link>
          <Link href='/partners' className="hover:underline">Partners</Link>
          <Link href='/about' className="hover:underline">About</Link>
        </div>
      </header>
      <main className='block'>{children}</main>
      <footer className='flex justify-between w-full p-5'>
        <p>© 2023 CGIAR</p>
        <p>Share</p>
      </footer>
    </body>
  )
}