import Image from 'next/image'
import { client } from './sanity-client'
import imageUrlBuilder from "@sanity/image-url";

 const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source)
}

// Barebones lazy-loaded image component
const LogoImageComponent = ({ value }: any) => {
  const imageUrl = urlFor(value)
  console.log(imageUrl.width(200).url());

  return (
    // <Image
    //   src={urlBuilder()
    //     .image(value)
    //     .width(300)
    //     .fit('max')
    //     .auto('format')
    //     .url()}
    //   alt={value.alt}
    //   width={300}
    //   height={300}
    // />
    <img
      src={imageUrl.width(200).url()}
      alt={value.alt}
    />
  )
}

export const portableTextComponents = {
  types: {
    image: LogoImageComponent,
    callout: ({ value }: any) =>
    (
      <div id='callout-box' className='bg-off-white py-8 md:py-12 border-b border-t border-grey-400 mb-10 md:mb-16'>
        <div className='max-w-[960px] mx-5 lg:mx-auto'>
          <h3 className='text-[18px] md:text-[24px] text-grey-500 font-bold tracking-wide leading-normal mb-3'>{value.heading}</h3>
          <p className='text-[18px] md:text-[24px] text-grey-500 tracking-normal leading-[30px] md:leading-[40px]'>{value.body}</p>
        </div>
      </div>
    ),
  },

  block: {
    h2: ({ children }: any) => <h2 className='max-w-[960px] mx-5 lg:mx-auto text-2xl md:text-[42px] text-grey-700 font-bold tracking-wide leading-tight mb-8'>{children}</h2>,
    h3: ({ children }: any) => <h3 className='max-w-[960px] mx-5 lg:mx-auto text-[18px] md:text-[24px] text-grey-700 font-bold tracking-wide leading-normal mb-3'>{children}</h3>,
    normal: ({ children }: any) => {
      if (children[0]) {
        return <p className='max-w-[960px] mx-5 lg:mx-auto text-[18px] md:text-[24px] text-grey-700 tracking-normal leading-[30px] md:leading-[40px] mb-5'>{children}</p>
      } else {
        return <br />
      }
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a href={value.href} rel={rel} target={target} className='underline hover:text-brand-green transition-colors'>
          {children}
        </a>
      )
    },
  },
}
