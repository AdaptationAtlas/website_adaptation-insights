import Image from 'next/image'
import Link from 'next/link'
import { getHomeContent, getProjects } from '@/sanity/sanity-utils'
import { BiArrowBack } from 'react-icons/bi'
import Footer from '@/components/footer'

// Reference:
// YouTube: Personal Website with Next.js 13, Sanity.io, TailwindCSS, and TypeScript: https://www.youtube.com/watch?v=OcTPaUfay5I
// freeCodeCamp tutorial: https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-sanity-and-nextjs/
// Official Sanity toolkit: https://www.sanity.io/plugins/next-sanity
// Next/Sanity tutorial: https://www.sanity.io/blog/build-your-own-blog-with-sanity-and-next-js

export default async function Home() {
  // In next 13, components are server-side-rendered by default
  // Getting the projects here happens on the server side for SEO
  const projects = await getProjects()
  const homeContent = await getHomeContent('home')

  return (
    <div>
      <div className='pb-20'>
        <div className='w-full h-screen overflow-hidden relative flex items-center'>
          {homeContent.heroImage && (
            <Image
              src={homeContent.heroImage}
              alt={homeContent.title}
              layout='fill'
              objectFit='cover'
            />
          )}
          <div className='relative z-10 ml-40'>
            <h1 className='flex flex-col text-white text-6xl leading-tight font-bold uppercase mb-12'>
              <span>Adaptation</span>
              <span className='ml-[370px]'>Insights</span>
            </h1>
            <div className='flex items-center'>
              <div className='h-[3px] w-[180px] bg-white mr-4 -mt-11'></div>
              <p className='text-white text-3xl leading-normal max-w-[640px]'>{homeContent.heroText}</p>
            </div>
          </div>
        </div>

        <div className='max-w-3xl mx-auto px-8 py-10'>
          <p className='text-4xl leading-normal w-3/4 mb-20'>{homeContent.introText}</p>
          <p className='text-lg uppercase'>Choose an area to explore</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 mb-12'>
          <div className='relative flex items-end h-[350px] p-8'>
            {homeContent.partnersLinkImage && (
              <Image
                src={homeContent.partnersLinkImage}
                alt={homeContent.title}
                layout='fill'
                objectFit='cover'
              />
            )}
            <div className='relative z-10'>
              <h3 className='text-xl text-white'>Partners</h3>
              <p className='text-base text-white'>Explore the people doing projects and their networks.</p>
            </div>
          </div>
          <div className='relative flex items-end h-[350px] p-8'>
            {homeContent.projectsLinkImage && (
              <Image
                src={homeContent.projectsLinkImage}
                alt={homeContent.title}
                layout='fill'
                objectFit='cover'
              />
            )}
            <div className='relative z-10'>
              <h3 className='text-xl text-white'>Projects</h3>
              <p className='text-base text-white'>Learn about targeted adaptation work and where it is being done.</p>
            </div>
          </div>
          <div className='relative flex items-end h-[350px] p-8'>
            {homeContent.wikiLinkImage && (
              <Image
                src={homeContent.wikiLinkImage}
                alt={homeContent.title}
                layout='fill'
                objectFit='cover'
              />
            )}
            <div className='relative z-10'>
              <h3 className='text-xl text-white'>Wiki</h3>
              <p className='text-base text-white'>Explore adaptation partners, projects, and processes in detail.</p>
            </div>
          </div>
        </div>

        <div className='max-w-3xl mx-auto px-8 py-10'>
          <p className='flex items-center text-lg uppercase'>Or say hello and provide feedback <BiArrowBack className='ml-2 rotate-180' /></p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
