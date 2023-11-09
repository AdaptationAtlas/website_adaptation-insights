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

const SidebarDetailActor = ({
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
  const actor = activeActor

  return (
    <div>
      <header className='p-5'>
        <p className='uppercase text-sm'>Partner detail</p>
        <h1>{actor?.name}</h1>
      </header>
    </div>
  )
}

export default SidebarDetailActor