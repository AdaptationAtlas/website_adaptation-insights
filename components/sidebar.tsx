'use client'

import React, { useState, useCallback } from 'react'
import SidebarNav from '@/components/sidebar-nav'
import SidebarDetail from '@/components/sidebar-detail'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ActorData, NetworkData, ProjectData } from '@/types/sidebar.types'
import { orderBy } from 'lodash'

type Props = {
  actorsData: ActorData[]
  projectsData: ProjectData[]
  actorsRawData: ActorData[]
  projectsRawData: ProjectData[]
  networksData: NetworkData[]
  viewByBudget: boolean
  setViewByBudget: React.Dispatch<React.SetStateAction<boolean>>
  viewProjects: boolean
  setViewProjects: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null | undefined
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null | undefined>>
  activeProject: ProjectData | null | undefined
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null | undefined>>
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null | undefined>>
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null | undefined>>
  setSelectedType: React.Dispatch<React.SetStateAction<string | null | undefined>>
  selectedCurrency: string
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>
  selectedType: string | null | undefined
  selectedCountry: string | null | undefined
  selectedYear: number | null | undefined
}

const Sidebar = ({
  actorsData,
  projectsData,
  actorsRawData,
  projectsRawData,
  networksData,
  viewByBudget,
  setViewByBudget,
  viewProjects,
  setViewProjects,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject,
  setSelectedYear,
  setSelectedCountry,
  setSelectedType,
  selectedCurrency,
  setSelectedCurrency,
  selectedType,
  selectedCountry,
  selectedYear,
}: Props) => {
  const [detailPanelActive, setDetailPanelActive] = useState<boolean>(false)
  const [viewProjectsDetail, setViewProjectsDetail] = useState<boolean>(false)
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

  const handleSwitchToggle = (checked: boolean) => {
    const view = checked ? 'projects' : 'partners'; // determine updated view
    router.push(pathname + '?' + createQueryString('view', view)) // push updated view to router
    setViewProjects(checked)
    setDetailPanelActive(false)
    // TODO - add a set timeout to account for panel transition
    setActiveActor(null)
    setActiveProject(null)
  }

  return (
    <div className='relative'>
      <SidebarNav
        actorsData={actorsData}
        projectsData={projectsData}
        actorsRawData={actorsRawData}
        projectsRawData={projectsRawData}
        networksData={networksData}
        viewProjects={viewProjects}
        viewProjectsDetail={viewProjectsDetail}
        setViewProjectsDetail={setViewProjectsDetail}
        viewByBudget={viewByBudget}
        setViewByBudget={setViewByBudget}
        handleSwitchToggle={handleSwitchToggle}
        detailPanelActive={detailPanelActive}
        setDetailPanelActive={setDetailPanelActive}
        activeActor={activeActor}
        setActiveActor={setActiveActor}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        setSelectedYear={setSelectedYear}
        setSelectedCountry={setSelectedCountry}
        setSelectedType={setSelectedType}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        selectedType={selectedType}
        selectedCountry={selectedCountry}
        selectedYear={selectedYear}
      />
      <SidebarDetail
        actorsData={actorsData}
        projectsData={projectsData}
        actorsRawData={actorsRawData}
        projectsRawData={projectsRawData}
        networksData={networksData}
        viewProjects={viewProjects}
        viewProjectsDetail={viewProjectsDetail}
        setViewProjectsDetail={setViewProjectsDetail}
        viewByBudget={viewByBudget}
        detailPanelActive={detailPanelActive}
        setDetailPanelActive={setDetailPanelActive}
        activeActor={activeActor}
        setActiveActor={setActiveActor}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
    </div>
  )
}

export default Sidebar