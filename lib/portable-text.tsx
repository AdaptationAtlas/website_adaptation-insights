import { ImageUrlBuilder } from 'sanity'

export const portableTextComponents = {
  types: {
    callout: ({ value }: any) =>
    (
      <div id='callout-box' className='bg-off-white py-8 md:py-12 border-b border-t border-grey-400 mb-10 md:mb-16'>
        <div className='max-w-[960px] mx-5 lg:mx-auto'>
          <h3 className='text-[18px] md:text-[24px] text-grey-500 font-bold tracking-wide leading-normal mb-3'>{value.heading}</h3>
          <p className='text-[18px] md:text-[24px] text-grey-500 tracking-normal leading-[30px] md:leading-[40px]'>{value.body}</p>
        </div>
      </div>
    ),
    // callToAction: ({value, isInline}: any) =>
    //   isInline ? (
    //     <a href={value.url}>{value.text}</a>
    //   ) : (
    //     <div className='callToAction'>{value.text}</div>
    //   ),
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
