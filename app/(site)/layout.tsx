// import { Open_Sans } from 'next/font/google'
import { IBM_Plex_Sans } from 'next/font/google'
import Header from '@/components/header'

// const openSans = Open_Sans({ subsets: ['latin'] })
const ibmPlexSans = IBM_Plex_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`${ibmPlexSans.className}`}>
      <Header />
      <main>{children}</main>
    </body>
  )
}