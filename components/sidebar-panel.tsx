'use client'

import React, { useState, useEffect } from 'react'
import { formatNumberCommas } from '@/lib/utils'
import Switch from '@/components/ui/switch'
import { useRouter, usePathname } from 'next/navigation'
// import Router from "next/router"
import { testProjects, testActors } from '@/lib/test-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    <div className='relative z-40 top-0 left-0 w-[415px] h-[calc(100vh-56px)] overflow-y-scroll bg-off-white border-r border-grey-100'>
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
          label={'View by'}
          options={['Beneficiaries', 'Budget']}
          isLarge={false}
        />
        {viewProjects &&
          <div className='flex items-center'>
            <span className='uppercase text-sm mr-4'>During</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="2023" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2017">2017</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        {viewProjects && viewByBudget &&
          <div className='flex items-center'>
            <span className='uppercase text-sm mr-4'>Currency</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="euro">Euro</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        {!viewProjects && viewByBudget &&
          <div className='flex items-center'>
            <span className='uppercase text-sm mr-4'>Currency</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="euro">Euro</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      </header>
      <div>
        {viewProjects &&
          <div className='flex justify-between items-center px-5 py-5'>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All countries</SelectItem>
                <SelectItem value="Cameroon">Cameroon</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Morocco">Morocco</SelectItem>
              </SelectContent>
            </Select>
            <p className='uppercase text-sm'>200 of 200 projects</p>
          </div>
        }
        {!viewProjects &&
          <div className='flex justify-between items-center px-5 py-5'>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All partners" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All partners</SelectItem>
                <SelectItem value="Lorem ipsum">Lorem ipsum</SelectItem>
                <SelectItem value="Tempor incididunt">Tempor incididunt</SelectItem>
                <SelectItem value="Dolore magna aliqua">Dolore magna aliqua</SelectItem>
              </SelectContent>
            </Select>
            <p className='uppercase text-sm'>200 of 200 partners</p>
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