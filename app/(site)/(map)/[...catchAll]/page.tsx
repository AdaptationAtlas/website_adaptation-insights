'use client'

import React from 'react'
import Sidebar from '@/components/sidebar'
import Map from '@/components/map'

type Props = {
  params: { catchAll: string[] }
}

const MapPage = ({ params }: Props) => {
  const [page, slug] = params.catchAll; // get the page and slug from catchAll params

  return (
    <div className='flex'>
      <Sidebar page={page} slug={slug} />
      <div className='relative w-full h-[calc(100vh-56px)]'>
        <Map />
      </div>
    </div>
  )
}

export default MapPage

