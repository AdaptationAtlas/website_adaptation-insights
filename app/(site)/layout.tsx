import Link from 'next/link'
import { JetBrains_Mono } from 'next/font/google'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={jetBrainsMono.className}>
      <header className='flex items-center justify-between px-8 py-6'>
        <Link href='/'>
          <h1 className='text-white text-xl font-bold uppercase hover:underline transition-colors'>Adaptation Insights</h1>
        </Link>
        <div className="flex items-center gap-5 text-md text-white">
          <Link href='/projects' className="hover:underline">Projects</Link>
          <Link href='/partners' className="hover:underline">Partners</Link>
          <Link href='/about' className="hover:underline">About</Link>
        </div>
      </header>
      <main className='max-w-3xl mx-auto px-8 py-10'>{children}</main>
    </body>
  )
}