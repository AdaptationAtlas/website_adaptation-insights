'use client'

import React, { useRef } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import SidebarDetailActor from './sidebar-detail-actor'
import SidebarDetailProject from './sidebar-detail-project'
import { BiX } from 'react-icons/bi'

type Props = {
  viewProjects: boolean
  viewProjectsDetail: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  viewByBudget: boolean
  actorsData: ActorData[]
  projectsData: ProjectData[]
  actorsRawData: ActorData[]
  projectsRawData: ProjectData[]
  networksData: NetworkData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null | undefined
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null | undefined>>
  activeProject: ProjectData | null | undefined
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null | undefined>>
}

const SidebarDetail = ({
  viewProjects,
  viewProjectsDetail,
  setViewProjectsDetail,
  viewByBudget,
  actorsData,
  projectsData,
  actorsRawData,
  projectsRawData,
  networksData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject
}: Props) => {
  const detailPanelRef = useRef<HTMLDivElement>(null)
  const detailPanelClass = (detailPanelActive) ? 'translate-x-[415px]' : 'translate-x-0'

  // Method to scroll detail panel to top when partner or project is clicked
  const scrollToTop = () => {
    if (detailPanelRef.current) {
      // detailPanelRef.current.scrollTo(0, 0);
      detailPanelRef.current.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // TODO - consider moving this to utils
  const closeDetailPanel = () => {
    setDetailPanelActive(false)
    // TODO - add a set timeout to account for panel transition
    setActiveActor(null)
    setActiveProject(null)
  }

  const actorCode = activeActor ? activeActor.actorCode : null;

  return (
    <div
      ref={detailPanelRef}
      className={classNames(
        detailPanelClass,
        'absolute z-30 top-0 w-[415px] h-[calc(100vh-56px)] overflow-y-scroll bg-off-white border-r border-grey-100 transition-transform duration-200 will-change-transform'
      )}
    >
      <button onClick={closeDetailPanel} className='absolute top-3 right-3 cursor-pointer scale-150'><BiX /></button>
      {!viewProjectsDetail && actorCode &&
        <SidebarDetailActor
          viewProjects={viewProjects}
          setViewProjectsDetail={setViewProjectsDetail}
          viewByBudget={viewByBudget}
          actorCode={actorCode}
          actorsData={actorsData}
          projectsData={projectsData}
          actorsRawData={actorsRawData}
          projectsRawData={projectsRawData}
          networksData={networksData}
          detailPanelActive={detailPanelActive}
          setDetailPanelActive={setDetailPanelActive}
          activeActor={activeActor}
          setActiveActor={setActiveActor}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          scrollToTop={scrollToTop}
        />
      }
      {viewProjectsDetail &&
        <SidebarDetailProject
          viewProjects={viewProjects}
          setViewProjectsDetail={setViewProjectsDetail}
          viewByBudget={viewByBudget}
          actorsData={actorsData}
          projectsData={projectsData}
          actorsRawData={actorsRawData}
          projectsRawData={projectsRawData}
          detailPanelActive={detailPanelActive}
          setDetailPanelActive={setDetailPanelActive}
          activeActor={activeActor}
          setActiveActor={setActiveActor}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          scrollToTop={scrollToTop}
        />
      }
    </div>
  )
}

export default SidebarDetail