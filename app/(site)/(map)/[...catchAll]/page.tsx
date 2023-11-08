'use client'

import React from 'react'
import SidebarPanel from '@/components/sidebar-panel'

type Props = {
  params: { catchAll: string[] }
}

const MapPage = ({ params }: Props) => {
  const [page, slug] = params.catchAll; // get the page and slug from catchAll params

  return (
    <div className='block'>
      <SidebarPanel page={page} slug={slug} />
    </div>
  )
}

export default MapPage

