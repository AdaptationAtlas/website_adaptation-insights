'use client'

import React, { ReactNode, useState, useEffect } from 'react';
import { formatNumberCommas } from '@/lib/utils'
import Switch from '@/components/ui/switch'
import { useRouter, usePathname } from 'next/navigation';
import Router from "next/router";

type Props = {
  page: string;
  slug: string;
};

const testData = [
  {
    'id': 0,
    'title': 'Farmers’ Organizations for Africa, Caribbean and Pacific',
    'beneficiaries': 52000000,
    'budget': 5820000
  },
  {
    'id': 1,
    'title': 'Forest and Farm Facility Phase 1&2',
    'beneficiaries': 40000000,
    'budget': 96500000
  },
  {
    'id': 2,
    'title': 'Sustainable management of dryland landscapes in Burkina Faso',
    'beneficiaries': 300000,
    'budget': 6430000
  },
  {
    'id': 3,
    'title': 'Prepared for the impact of climate change',
    'beneficiaries': 6300,
    'budget': 27000
  },
  {
    'id': 4,
    'title': 'L’Observatoire de l’Agroecologie au Maroc',
    'beneficiaries': null,
    'budget': 6400
  },
  {
    'id': 5,
    'title': 'PA categories V and VI as landscape mechanisms for enhancing biodiversity in agricultural land, ecological connectivity and REDD+ implementation',
    'beneficiaries': 38000,
    'budget': 42700000
  }
]

const SidebarPanel = ({ page, slug }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [viewByBudget, setViewByBudget] = useState(false)
  const [viewProjects, setViewProjects] = useState(false)

  // Reference: How to make Radix UI Tabs URL based in NextJS
  // https://dev.to/yinks/how-to-make-radix-ui-tabs-url-based-in-nextjs-2nfn
  // TODO - consider using query parameters here to test for performance

  const handleSwitchToggle = (checked: boolean) => {
    const view = checked ? '/projects' : '/partners';
    setViewProjects(checked)
    router.push(view)
  }

  // if the query parameter changes, update the state
  React.useEffect(() => {
    const view = (pathname == '/projects') ? true : false;
    setViewProjects(view)
  }, [pathname])

  return (
    <div className='w-[415px] min-h-screen bg-off-white border-r border-grey-100'>
      <header className='p-5'>
        <p className='uppercase text-sm mb-2'>Explore {page}</p>
        <Switch
          switchToggled={viewProjects}
          setSwitchToggled={handleSwitchToggle}
          label={''}
          options={['Partners', 'Projects']}
          isLarge={true}
        />
        <p className='text-lg mt-3 mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. aliqua. Ut enim ad minim veniam.</p>
        <Switch
          switchToggled={viewByBudget}
          setSwitchToggled={setViewByBudget}
          label={'View projects by'}
          options={['Beneficiaries', 'Budget']}
          isLarge={false}
        />
        <span className='uppercase text-sm'>During</span>
      </header>
      <div>
        <div className='flex justify-between px-5 py-5'>
          <p className='uppercase'>All countries</p>
          <p className='uppercase'>200 of 200 projects</p>
        </div>
        <div className='flex flex-col overflow-x-auto'>
          {testData.map(project => {
            return (
              <div key={project.id} className='px-5 my-5'>
                <h3 className='uppercase text-xs'>Project budget</h3>
                <p className='text-5xl font-bold'>${formatNumberCommas(project.budget)}</p>
                <p className='text-sm'>{project.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SidebarPanel