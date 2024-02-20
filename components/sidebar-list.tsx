import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import SidebarListActor from './sidebar-list-actor'
import SidebarListProject from './sidebar-list-project';

type Props = {
  viewProjects: boolean
  viewProjectsDetail: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  viewByBudget: boolean
  actorsData: ActorData[]
  projectsData: ProjectData[]
  networksData: NetworkData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null | undefined
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null | undefined>>
  activeProject: ProjectData | null | undefined
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null | undefined>>
  selectedCurrency: string
  selectedType: string | null | undefined
  selectedCountry: string | null | undefined
  selectedYear: number | null | undefined
}

const SidebarList = ({
  viewProjects,
  viewProjectsDetail,
  setViewProjectsDetail,
  viewByBudget,
  actorsData,
  projectsData,
  networksData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject,
  selectedCurrency,
  selectedType,
  selectedCountry,
  selectedYear,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  // Set active actor to selected list item
  const handleActorSelect = (actor: ActorData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    if (viewProjectsDetail) { setViewProjectsDetail(false) }
    router.push(pathname + '?' + createQueryString('partner', actor.actorCode)) // push updated view to router
    setActiveActor(actor)
  }

  // Set active project to selected list item
  const handleProjectSelect = (project: ProjectData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    if (!viewProjectsDetail) { setViewProjectsDetail(true) }
    router.push(pathname + '?' + createQueryString('project', project.projectCode)) // push updated view to router
    setActiveProject(project)
  }

  return (
    <div className='flex flex-col'>

      {/* Projects list */}
      {viewProjects && projectsData.map((project, index) => {
        return <SidebarListProject
          key={project.projectCode}
          project={project}
          projectsData={projectsData}
          handleProjectSelect={handleProjectSelect}
          viewByBudget={viewByBudget}
          activeProject={activeProject}
          selectedCurrency={selectedCurrency}
          selectedType={selectedType}
          selectedCountry={selectedCountry}
          selectedYear={selectedYear}
        />
      })}

      {/* Actors list */}
      {!viewProjects && actorsData.map((actor, index) => {
        return <SidebarListActor
          key={actor.actorCode}
          index={index}
          actor={actor}
          handleActorSelect={handleActorSelect}
          viewProjects={viewProjects}
          viewByBudget={viewByBudget}
          activeActor={activeActor}
          selectedType={selectedType}
          selectedCurrency={selectedCurrency}
          networksData={networksData}
        />
      })}
    </div>
  )
}
export default SidebarList