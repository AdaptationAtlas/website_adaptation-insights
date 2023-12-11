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
  viewProjectsDetail: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
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
  viewProjectsDetail,
  setViewProjectsDetail,
  detailPanelActive,
  setDetailPanelActive,
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

  const handleSwitchToggle = (checked: boolean) => {
    const view = checked ? 'projects' : 'partners' // determine updated view

    // Create a new URLSearchParams object based on the current search params
    const params = new URLSearchParams(searchParams)

    // Set the 'view' parameter
    params.set('view', view)

    // Remove 'project' and 'actor' parameters
    if (checked) {
      params.delete('partner')
    } else {
      params.delete('project')
    }

    // Construct the new URL string
    const newUrl = `${pathname}?${params.toString()}`
    // Push the updated URL to the router
    router.push(newUrl)
    // Nullify active actor and project
    setActiveActor(null)
    setActiveProject(null)

    // Close the detail panel
    setViewProjects(checked)
    setDetailPanelActive(false)
    setViewProjectsDetail(checked)
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