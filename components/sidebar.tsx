'use client'

import React, { useState, useEffect } from 'react'
import SidebarNav from '@/components/sidebar-nav'
import SidebarDetail from '@/components/sidebar-detail'
import { useRouter, usePathname } from 'next/navigation'
import actorsData from '@/public/data/actors.json'
import projectsData from '@/public/data/projects.json'
import networksData from '@/public/data/networks.json'

console.log('actors', actorsData)
console.log('projects', projectsData)
console.log('networks', networksData)

type Props = {
  page: string;
  slug: string;
}

// TODO 11/8
// 2. Add detail panel component with transition
// 5. Add data to detail panels
// 6. Style detail panels

const Sidebar = ({ page, slug }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [viewByBudget, setViewByBudget] = useState(false)
  const [viewProjects, setViewProjects] = useState(false)

  // Reference: How to make Radix UI Tabs URL based in NextJS
  // https://dev.to/yinks/how-to-make-radix-ui-tabs-url-based-in-nextjs-2nfn
  // TODO - consider using query parameters here to test for performance
  // TODO - try using next/router for better performance (what's the difference?)

  const handleSwitchToggle = (checked: boolean) => {
    const view = checked ? '/projects' : '/partners';
    setViewProjects(checked)
    router.push(view)
  }

  // if the query parameter changes, update the state
  useEffect(() => {
    const view = (pathname == '/projects') ? true : false;
    setViewProjects(view)
  }, [pathname])

  return (
    <div className='relative'>
      <SidebarNav
        actorsData={actorsData}
        projectsData={projectsData}
        viewProjects={viewProjects}
        viewByBudget={viewByBudget}
        setViewByBudget={setViewByBudget}
        handleSwitchToggle={handleSwitchToggle}
      />
      <SidebarDetail />
    </div>
  )
}

export default Sidebar