'use client'

import React, { useState, useEffect } from 'react'
import SidebarNav from '@/components/sidebar-nav'
import SidebarDetail from '@/components/sidebar-detail'
import { useRouter, usePathname } from 'next/navigation'
import { ActorData, NetworkData, ProjectData } from '@/types/sidebar.types'
import { orderBy } from 'lodash'

type Props = {
  page: string;
  slug: string;
  viewByBudget: boolean
  setViewByBudget: React.Dispatch<React.SetStateAction<boolean>>
  actorsData: ActorData[]
  projectsData: ProjectData[]
  networksData: NetworkData[]
  viewProjects: boolean
  setViewProjects: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null>>
  activeProject: ProjectData | null
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null>>
}

const Sidebar = ({
  page,
  slug,
  viewByBudget,
  setViewByBudget,
  actorsData,
  projectsData,
  networksData,
  viewProjects,
  setViewProjects,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject,
}: Props) => {
  // const router = useRouter()
  // const pathname = usePathname()
  const [detailPanelActive, setDetailPanelActive] = useState<boolean>(false)

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
        networksData={networksData}
        viewProjects={viewProjects}
        viewByBudget={viewByBudget}
        setViewByBudget={setViewByBudget}
        handleSwitchToggle={handleSwitchToggle}
        detailPanelActive={detailPanelActive}
        setDetailPanelActive={setDetailPanelActive}
        activeActor={activeActor}
        setActiveActor={setActiveActor}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <SidebarDetail
        actorsData={actorsData}
        projectsData={projectsData}
        networksData={networksData}
        viewProjects={viewProjects}
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