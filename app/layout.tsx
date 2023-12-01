import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The African Agriculture Adaptation Tracking Tool',
  description: 'Lorem ipsum dolor sit amet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">{children}</html>
  )
}