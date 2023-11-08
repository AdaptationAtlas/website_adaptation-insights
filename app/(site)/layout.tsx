import { Open_Sans } from 'next/font/google'
import Header from '@/components/header'

const openSans = Open_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`${openSans.className} text-black`}>
      <Header />
      <main>{children}</main>
    </body>
  )
}