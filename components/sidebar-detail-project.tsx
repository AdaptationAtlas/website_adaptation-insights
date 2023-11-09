'use client'

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData } from '@/types/sidebar.types'

type Props = {
  viewProjects: boolean
  viewByBudget: boolean
  actorsData: ActorData[]
  projectsData: ProjectData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null>>
  activeProject: ProjectData | null
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null>>
}

const SidebarDetailProject = ({
  viewProjects,
  viewByBudget,
  actorsData,
  projectsData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject
}: Props) => {
  const project = activeProject

  return (
    <div className='p-5'>
      <header className='mb-5'>
        <p className='uppercase text-sm text-brand-dark-gold mb-1'>Project detail</p>
        <h1 className='text-xl font-semibold'>{project?.projectName}</h1>
      </header>
      <ul className='mb-3'>
        <li className='flex items-center'>
          <h4 className='w-28 text-sm font-semibold'>Scale</h4>
          <p>National project | 10 locations</p>
        </li>
      </ul>
    </div>
  )
}

export default SidebarDetailProject