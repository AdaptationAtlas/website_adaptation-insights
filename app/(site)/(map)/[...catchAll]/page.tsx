'use client'

import React from 'react'

type Props = {
  params: { catchAll: string[] }
}

const MapPage = ({ params }: Props) => {
  const [page, slug] = params.catchAll; // get the page and slug from catchAll params
  console.log(page)
  console.log(slug)

  return (
    <div>
      <h1 className='map-page'>Page: {page}</h1>
      <h2>Slug: {slug}</h2>
    </div>
  )
}

export default MapPage

