'use client'

import React, { useState, useEffect } from 'react'
import { formatNumberCommas } from '@/lib/utils'
import Switch from '@/components/ui/switch'
import { useRouter, usePathname } from 'next/navigation'
// import Router from "next/router"
import { testProjects, testActors } from '@/lib/test-data'
import SelectMenu from '@/components/ui/select'

type Props = {
  page: string;
  slug: string;
};

const SidebarPanel = ({ page, slug }: Props) => {
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
    <div className='w-[415px] bg-off-white border-r border-grey-100'>
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
        {viewProjects &&
          <div className='flex justify-between px-5 py-5 relative'>
            <span className='uppercase text-sm'>During</span>
            <SelectMenu />
          </div>
        }
        {viewProjects && viewByBudget &&
          <div className='flex justify-between px-5 py-5'>
            <span className='uppercase text-sm'>Currency</span>
            <SelectMenu />
          </div>
        }
        {!viewProjects && viewByBudget &&
          <div className='flex justify-between px-5 py-5'>
            <span className='uppercase text-sm'>Currency</span>
            <SelectMenu />
          </div>
        }
      </header>
      <div>
        {viewProjects &&
          <div className='flex justify-between px-5 py-5'>
            <p className='uppercase'>All countries</p>
            <SelectMenu />
            <p className='uppercase'>200 of 200 projects</p>
          </div>
        }
        {!viewProjects &&
          <div className='flex justify-between px-5 py-5'>
            <p className='uppercase'>All partners</p>
            <SelectMenu />
            <p className='uppercase'>200 of 200 partners</p>
          </div>
        }
        <div className='flex flex-col overflow-x-auto'>
          {viewProjects && testProjects.map(project => {
            return (
              <div key={project.projectCode} className='px-5 my-5'>
                {viewByBudget &&
                  <div>
                    <h3 className='uppercase text-xs'>Project budget</h3>
                    <p className='text-5xl font-bold'>${formatNumberCommas(project.budget)}</p>
                  </div>
                }
                {!viewByBudget &&
                  <div>
                    <h3 className='uppercase text-xs'>Project beneficiaries</h3>
                    {/* TODO - account for unspecified beneficiaries */}
                    <p className='text-5xl font-bold'>{formatNumberCommas(project.beneficiaries)}</p>
                  </div>
                }
                <p className='text-sm'>{project.title}</p>
              </div>
            )
          })}
          {!viewProjects && testActors.map(actor => {
            return (
              <div key={actor.actorCode} className='px-5 my-5'>
                {viewByBudget &&
                  <div>
                    <h3 className='uppercase text-xs'>Total budget</h3>
                    <p className='text-5xl font-bold'>${formatNumberCommas(actor.totalBudget)}</p>
                  </div>
                }
                {!viewByBudget &&
                  <div>
                    <h3 className='uppercase text-xs'>Total beneficiaries</h3>
                    {/* TODO - account for unspecified beneficiaries */}
                    <p className='text-5xl font-bold'>{formatNumberCommas(actor.totalBeneficiaries)}</p>
                  </div>
                }
                <p className='text-sm'>{actor.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SidebarPanel