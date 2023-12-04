import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'African Agriculture Adaptation Tracking Tool',
  description: 'Explore the work being done to adapt to climate change in Africa',
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