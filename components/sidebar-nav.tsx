'use client'

import React, { useState, useEffect } from 'react'
import Switch from '@/components/ui/switch'
import SidebarList from '@/components/sidebar-list'
import { useRouter, usePathname } from 'next/navigation'
import { ActorData, ProjectData } from '@/types/sidebar.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// TODO 11/8
// 2. Add detail panel component with transition
// 5. Add data to detail panels
// 6. Style detail panels

type Props = {
  actorsData: ActorData[]
  projectsData: ProjectData[]
  viewProjects: boolean
  viewByBudget: boolean
  setViewByBudget: React.Dispatch<React.SetStateAction<boolean>>
  handleSwitchToggle: (checked: boolean) => void
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null>>
  activeProject: ProjectData | null
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null>>
}

const SidebarNav = ({
  actorsData,
  projectsData,
  viewProjects,
  viewByBudget,
  setViewByBudget,
  handleSwitchToggle,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject
}: Props) => {

  return (
    <div className='relative z-40 top-0 left-0 w-[415px] h-[calc(100vh-56px)] overflow-y-scroll bg-off-white border-r border-grey-100'>
      <header className='p-5'>
        <p className='uppercase text-sm'>Explore</p>
        <Switch
          switchToggled={viewProjects}
          setSwitchToggled={handleSwitchToggle}
          label={''}
          options={['Partners', 'Projects']}
          isLarge={true}
        />
        <p className='text-base mt-3 mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. aliqua. Ut enim ad minim veniam.</p>
        <Switch
          switchToggled={viewByBudget}
          setSwitchToggled={setViewByBudget}
          label={'View by'}
          options={['Beneficiaries', 'Budget']}
          isLarge={false}
        />
        {/* TODO - use "page" param instead of viewProjects for conditional rendering */}
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
          <div className='flex justify-between items-center px-5 pb-2 border-b border-b-grey-200'>
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
          <div className='flex justify-between items-center px-5 pb-2 border-b border-b-grey-200'>
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
        <SidebarList
          viewProjects={viewProjects}
          viewByBudget={viewByBudget}
          actorsData={actorsData}
          projectsData={projectsData}
          detailPanelActive={detailPanelActive}
          setDetailPanelActive={setDetailPanelActive}
          activeActor={activeActor}
          setActiveActor={setActiveActor}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      </div>
    </div>
  )
}

export default SidebarNav