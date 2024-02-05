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
      <div className='pb-[100px] lg:pb-[175px]'>
        <div className='w-full h-[250px] lg:h-screen overflow-hidden relative flex items-center'>
          {homeContent.heroImage && (
            <Image
              src={homeContent.heroImage}
              alt={homeContent.title}
              layout='fill'
              objectFit='cover'
            />
          )}
          {homeContent.networkGraphicImage && (
            <Image
              src={homeContent.networkGraphicImage}
              alt={homeContent.title}
              width={340}
              height={300}
              className='hidden lg:block absolute z-10 top-[80px] right-[80px]'
            />
          )}
          <div className='relative z-20 p-5 lg:ml-[100px]'>
            <h1 className='hidden lg:block text-white text-6xl leading-tight font-bold uppercase mb-12 max-w-[900px]'>
              AFRICAN AGRICULTURE ADAPTATION TRACKING TOOL
            </h1>
            <div className='flex items-center'>
              {/* <p className='text-white text-3xl leading-normal max-w-[640px]'>{homeContent.heroText}</p> */}
              <p className='text-white text-xl lg:text-3xl leading-normal max-w-[640px]'>Explore the work being done to adapt to climate change in Africa.</p>
            </div>
          </div>
        </div>

        <div className='px-5 lg:px-[100px]'>
          {/* <p className='text-4xl font-bold leading-normal max-w-[960px] mb-20 mt-20'>{homeContent.introText}</p> */}
          <p className='text-[22px] lg:text-4xl font-bold leading-normal max-w-[960px] my-10 lg:my-20'>The African Agriculture Adaptation Tracking Tool is the go-to-hub for information on agricultural adaptation actions from across Africa. Discover key organizations, partnerships, their projects and a suite of tools to aid future adaptation tracking efforts.</p>
          <p className='text-base lg:text-lg uppercase mb-5'>Choose an area to explore</p>
        </div>

        <div className='sm:grid sm:grid-cols-3 mb-[40px] lg:mb-[80px]'>
          <Link href='/map?view=partners'>
            <div className='relative w-full overflow-hidden'>
              <div className='pb-[100%] relative'> {/* Square Aspect Ratio */}
                <div className='absolute inset-0 flex items-end px-5 lg:px-8 py-8'>
                  {homeContent.partnersLinkImage && (
                    <Image
                      src={homeContent.partnersLinkImage}
                      alt="Partners"
                      layout='fill'
                      objectFit='cover'
                      objectPosition='top'
                      className='transition-transform duration-500 ease-in-out lg:hover:scale-105'
                    />
                  )}
                  <div className='relative z-10 pointer-events-none'>
                    <h3 className='text-base lg:text-2xl text-white uppercase mb-2 font-semibold tracking-normal'>Partners</h3>
                    <p className='text-sm lg:text-lg text-white font-medium leading-tight'>Explore the organizations implementing projects and their networks.</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href='/map?view=projects'>
            <div className='relative w-full overflow-hidden'>
              <div className='pb-[100%] relative'> {/* Square Aspect Ratio */}
                <div className='absolute inset-0 flex items-end px-5 lg:px-8 py-8'>
                  {homeContent.projectsLinkImage && (
                    <Image
                      src={homeContent.projectsLinkImage}
                      alt="Projects"
                      layout='fill'
                      objectFit='cover'
                      objectPosition='top'
                      className='transition-transform duration-500 ease-in-out lg:hover:scale-105'
                    />
                  )}
                  <div className='relative z-10 pointer-events-none'>
                    <h3 className='text-base lg:text-2xl text-white uppercase mb-2 font-semibold tracking-normal'>Projects</h3>
                    <p className='text-sm lg:text-lg text-white font-medium leading-tight'>Learn about targeted adaptation projects, their scope and locations.</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href='/tools'>
            <div className='relative w-full overflow-hidden'>
              <div className='pb-[100%] relative'> {/* Square Aspect Ratio */}
                <div className='absolute inset-0 flex items-end px-5 lg:px-8 py-8'>
                  {homeContent.wikiLinkImage && (
                    <Image
                      src={homeContent.wikiLinkImage}
                      alt="Tools"
                      layout='fill'
                      objectFit='cover'
                      objectPosition='top'
                      className='transition-transform duration-500 ease-in-out lg:hover:scale-105'
                    />
                  )}
                  <div className='relative z-10 pointer-events-none'>
                    <h3 className='text-base lg:text-2xl text-white uppercase mb-2 font-semibold tracking-normal'>Tools</h3>
                    <p className='text-sm lg:text-lg text-white font-medium leading-tight'>Explore practical approaches to adaptation tracking.</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className='px-5 lg:px-[100px]'>
          <a href='mailto:t.rosenstock@cgiar.org' className='hover:text-brand-green flex items-center text-base lg:text-lg uppercase transition-colors duration-300 ease-in-out'>Or say hello and provide feedback <BiArrowBack className='ml-2 rotate-180' /></a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
