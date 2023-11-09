'use client'

import React, { useState, useEffect } from 'react'

type Props = {
}

const SidebarDetail = () => {

  return (
    <div className='absolute z-40 top-0 left-[415px] w-[415px] h-[calc(100vh-56px)] overflow-y-scroll bg-off-white border-r border-grey-100'>
      <header className='p-5'>
        <p className='uppercase text-sm'>Detail</p>
      </header>
    </div>
  )
}

export default SidebarDetail