import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer'
import { getAboutContent } from '@/lib/sanity-utils'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/lib/portable-text'

export default async function About() {
  const content = await getAboutContent('about')

  return (
    <div className='relative pt-[80px] md:pt-[125px]'>
      <div className='max-w-[960px] mx-5 lg:mx-auto mb-12 md:mb-[100px]'>
        <h1 className='text-2xl md:text-[60px] text-brand-green uppercase font-semibold tracking-wide leading-tight mb-5 md:mb-10'>{content.heading}</h1>
        <h4 className='text-2xl md:text-[42px] text-grey-700 font-bold tracking-wide leading-tight'>{content.description}</h4>
      </div>

      <div className='relative w-full mb-12 md:mb-[100px]'>
        {content.heroImage && (
          <Image
            src={content.heroImage}
            alt={content.title}
            width={500}
            height={500}
            layout='responsive'
            objectFit='contain'
            className='hidden md:block'
          />
        )}
        {content.heroImageMobile && (
          <Image
            src={content.heroImageMobile}
            alt={content.title}
            width={500}
            height={500}
            layout='responsive'
            objectFit='contain'
            className='block md:hidden'
          />
        )}
      </div>

      <div id='about-content' className='mb-[100px]'>
        <PortableText value={content.content} components={portableTextComponents} />
      </div>

      <Footer />
    </div>
  )
}
