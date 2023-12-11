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
      <div className='pb-[175px]'>
        <div className='w-full h-screen overflow-hidden relative flex items-center'>
          {homeContent.heroImage && (
            <Image
              src={homeContent.heroImage}
              alt={homeContent.title}
              layout='fill'
              objectFit='cover'
            />
          )}
          <div className='relative z-10 ml-[100px]'>
            <h1 className='flex flex-col text-white text-6xl leading-tight font-bold uppercase mb-12 max-w-[900px]'>
              AFRICAN AGRICULTURE ADAPTATION TRACKING TOOL
            </h1>
            <div className='flex items-center'>
              {/* <div className='h-[3px] w-[180px] bg-white mr-4 -mt-11'></div> */}
              <p className='text-white text-3xl leading-normal max-w-[640px]'>{homeContent.heroText}</p>
            </div>
          </div>
        </div>

        <div className='px-[100px]'>
          <p className='text-4xl font-bold leading-normal max-w-[960px] mb-20 mt-20'>{homeContent.introText}</p>
          <p className='text-lg uppercase mb-5'>Choose an area to explore</p>
        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-3 mb-[80px] md:h-[350px] lg:h-[450px]'> */}
        <div className='grid grid-cols-3 mb-[80px] h-[450px]'>
          <Link href='/map?view=partners'>
            <div className='relative flex items-end p-8 h-full overflow-hidden'>
              {homeContent.partnersLinkImage && (
                <Image
                  src={homeContent.partnersLinkImage}
                  alt={homeContent.title}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='top'
                  className={'transition-transform duration-500 ease-in-out hover:scale-105'}
                />
              )}
              <div className='relative z-10 pointer-events-none'>
                <h3 className='text-2xl text-white uppercase mb-2 font-semibold tracking-normal'>Partners</h3>
                <p className='text-lg text-white font-medium leading-tight'>Explore the people doing projects and their networks.</p>
              </div>
            </div>
          </Link>

          <Link href='/map?view=projects'>
            <div className='relative flex items-end p-8 h-full overflow-hidden'>
              {homeContent.projectsLinkImage && (
                <Image
                  src={homeContent.projectsLinkImage}
                  alt={homeContent.title}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='top'
                  className={'transition-transform duration-500 ease-in-out hover:scale-105'}
                />
              )}
              <div className='relative z-10 pointer-events-none'>
                <h3 className='text-2xl text-white uppercase mb-2 font-semibold tracking-normal'>Projects</h3>
                <p className='text-lg text-white font-medium leading-tight'>Learn about targeted adaptation work and where it is being done.</p>
              </div>
            </div>
          </Link>

          <Link href='/tools'>
            <div className='relative flex items-end p-8 h-full overflow-hidden'>
              {homeContent.wikiLinkImage && (
                <Image
                  src={homeContent.wikiLinkImage}
                  alt={homeContent.title}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='top'
                  className={'transition-transform duration-500 ease-in-out hover:scale-105'}
                />
              )}
              <div className='relative z-10 pointer-events-none'>
                <h3 className='text-2xl text-white uppercase mb-2 font-semibold tracking-normal'>Tools</h3>
                <p className='text-lg text-white font-medium leading-tight'>Explore adaptation partners, projects, and processes in detail.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className='px-[100px]'>
          <p className='flex items-center text-lg uppercase'>Or say hello and provide feedback <BiArrowBack className='ml-2 rotate-180' /></p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
