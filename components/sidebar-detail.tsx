'use client'

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData } from '@/types/sidebar.types'
import SidebarDetailActor from './sidebar-detail-actor'
import SidebarDetailProject from './sidebar-detail-project'
import { BiX } from 'react-icons/bi'

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

const SidebarDetail = ({
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
  const detailPanelClass = (detailPanelActive) ? 'translate-x-[415px]' : 'translate-x-0'
  const closeDetailPanel = () => {
    setDetailPanelActive(false)
  }

  return (
    <div className={classNames(
      detailPanelClass,
      'absolute z-30 top-0 w-[415px] h-[calc(100vh-56px)] overflow-y-scroll bg-off-white border-r border-grey-100 transition-transform duration-200 will-change-transform'
    )}>
      <button onClick={closeDetailPanel} className='absolute top-3 right-3 cursor-pointer scale-150'><BiX /></button>
      {!viewProjects &&
        <SidebarDetailActor
          viewProjects={viewProjects}
          viewByBudget={viewByBudget}
          actorsData={actorsData}
          projectsData={projectsData}
          detailPanelActive={detailPanelActive}
          setDetailPanelActive={setDetailPanelActive}
          activeActor={activeActor}
          setActiveActor={setActiveActor}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      }
      {viewProjects &&
        <SidebarDetailProject
          viewProjects={viewProjects}
          viewByBudget={viewByBudget}
          actorsData={actorsData}
          projectsData={projectsData}
          detailPanelActive={detailPanelActive}
          setDetailPanelActive={setDetailPanelActive}
          activeActor={activeActor}
          setActiveActor={setActiveActor}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      }
    </div>
  )
}

export default SidebarDetail