'use client'

import React, { useState, useEffect } from 'react'
import SidebarNav from '@/components/sidebar-nav'
import SidebarDetail from '@/components/sidebar-detail'
import { useRouter, usePathname } from 'next/navigation'
import { ActorData, ProjectData } from '@/types/sidebar.types'
import { orderBy } from 'lodash'
import actorsDataRaw from '@/public/data/actors.json'
import projectsDataRaw from '@/public/data/projects.json'
import networksData from '@/public/data/networks.json'

// const actorsData = orderBy(actorsDataRaw, ['totalBudget'], ['desc'])
const projectsData = orderBy(
  projectsDataRaw,
  [
    (project) => project.beneficiaryNum === null, // false (0) for numbers, true (1) for nulls
    'beneficiaryNum' // actual number for sorting
  ],
  ['asc', 'desc'] // first sort by the custom sorter ascending, then by beneficiaryNum descending
);

type Props = {
  page: string;
  slug: string;
  viewByBudget: boolean
  setViewByBudget: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ page, slug, viewByBudget, setViewByBudget }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [viewProjects, setViewProjects] = useState<boolean>(false)
  const [detailPanelActive, setDetailPanelActive] = useState<boolean>(false)
  const [activeActor, setActiveActor] = useState<ActorData | null>(null)
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)
  const [actorsData, setActorsData] = useState<ActorData[]>([])
  const [projectsData, setProjectsData] = useState<ProjectData[]>([])

  // Sort actors data by budget or beneficiaries
  useEffect(() => {
    const orderField = viewByBudget ? 'totalBudget' : 'totalBeneficiaries';
    const sortedActorsData = orderBy(
      actorsDataRaw,
      [orderField, 'name'], // Fallback to 'name' if you want to sort by name when values are equal
      ['desc', 'asc'] // Or any other order you prefer
    );
    setActorsData(sortedActorsData);
  }, [viewByBudget])

  // Sort projects data by budget or beneficiaries
  useEffect(() => {
    const sortedProjectsData = orderBy(
      projectsDataRaw,
      [
        // Check if budget is null only when sorting by budget
        viewByBudget ? (project) => project.budget === null : (project) => project.beneficiaryNum === null,
        viewByBudget ? 'budget' : 'beneficiaryNum', // Choose field to sort by based on state
      ],
      [viewByBudget ? 'asc' : 'asc', viewByBudget ? 'desc' : 'desc'] // Adjust the sort order
    );
    setProjectsData(sortedProjectsData);
  }, [viewByBudget]);


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