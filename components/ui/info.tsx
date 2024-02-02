'use client'

import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import imgInfo from '@/public/images/icons/info.svg'

type Props = {
  positionRight?: boolean
  tooltipContent: string
  width?: number
}

const Info = ({ positionRight, tooltipContent, width }: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  return (
    <div id='info' className='relative z-50'>
      <div
        className='cursor-pointer ml-1.5'
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <Image
          src={imgInfo}
          alt='Info'
          height={12}
          width={12}
        />
      </div>
      <div className={cn(
        'absolute z-50 top-5 left-1/2 ml-[4px] transform -translate-x-1/2 pointer-events-none',
        'text-sm rounded px-[15px] py-[12px] bg-white border border-grey-100 w-[220px]',
        'transition-all duration-200 ease-in-out',
        tooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      )}>
        {tooltipContent}
      </div>
    </div>
  )
}
export default Info