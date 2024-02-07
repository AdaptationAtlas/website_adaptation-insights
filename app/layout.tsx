import './globals.css'
import type { Metadata } from 'next'

// TODO: consider using metadataBase to resolve build errors for opengraph image URLs
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase

// TODO: check out generateStaticParams for SSG version of the site
// Q: how does SEO factor into SSG in NextJS 13?
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// Here's another tutorial for exporting a static nextjs/sanity site for Netlify:
// https://www.sanity.io/blog/tutorial-host-your-sanity-based-next-js-project-on-netlify

export const metadata: Metadata = {
  title: 'African Adaptation Tracking Tool',
  description: 'Explore the work being done to adapt to climate change in Africa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {children}
    </html>
  )
}