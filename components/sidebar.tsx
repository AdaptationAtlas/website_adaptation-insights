'use client'

import React, { useState } from 'react'
import SidebarNav from '@/components/sidebar-nav'
import SidebarDetail from '@/components/sidebar-detail'
// import { useRouter, usePathname } from 'next/navigation'
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
}: Props) => {
  // const router = useRouter()
  // const pathname = usePathname()
  const [detailPanelActive, setDetailPanelActive] = useState<boolean>(false)
  const [viewProjectsDetail, setViewProjectsDetail] = useState<boolean>(false)

  // Reference: How to make Radix UI Tabs URL based in NextJS
  // https://dev.to/yinks/how-to-make-radix-ui-tabs-url-based-in-nextjs-2nfn
  // TODO - consider using query parameters here to test for performance
  // TODO - try using next/router for better performance (what's the difference?)
  // TODO - implement project/partner routing with entity deep links

  // const handleSwitchToggle = (checked: boolean) => {
  //   const view = checked ? '/projects' : '/partners';
  //   setViewProjects(checked)
  //   router.push(view)
  // }

  // // if the query parameter changes, update the state
  // useEffect(() => {
  //   const view = (pathname == '/projects') ? true : false;
  //   setViewProjects(view)
  // }, [pathname])

  const handleSwitchToggle = (checked: boolean) => {
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