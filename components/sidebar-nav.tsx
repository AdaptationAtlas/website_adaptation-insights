'use client'

import React, { useState, useEffect } from 'react'
import Switch from '@/components/ui/switch'
import SidebarList from '@/components/sidebar-list'
import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import { uniq } from 'lodash'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { handleSelectedYear, handleSelectedCountry, handleSelectedType, handleSelectedCurrency } from '@/utils/select-handlers'

type Props = {
  actorsData: ActorData[]
  projectsData: ProjectData[]
  actorsRawData: ActorData[]
  projectsRawData: ProjectData[]
  networksData: NetworkData[]
  viewProjects: boolean
  viewProjectsDetail: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  viewByBudget: boolean
  setViewByBudget: React.Dispatch<React.SetStateAction<boolean>>
  handleSwitchToggle: (checked: boolean) => void
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
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

const SidebarNav = ({
  actorsData,
  projectsData,
  actorsRawData,
  projectsRawData,
  networksData,
  viewProjects,
  viewProjectsDetail,
  setViewProjectsDetail,
  viewByBudget,
  setViewByBudget,
  handleSwitchToggle,
  detailPanelActive,
  setDetailPanelActive,
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

  // Store actor and project totals
  const actorsTotal = actorsData?.length
  const projectsTotal = projectsData?.length
  const actorsRawTotal = actorsRawData?.length
  const projectsRawTotal = projectsRawData?.length

  // Get unique values for years, countries and actor types
  // TODO - combine the filter logic to allow for filter combinations like "projects in Ghana in 2012"
  const uniqueProjectYears = uniq(
    projectsRawData.flatMap(project => [project.minStartDate, project.maxEndDate])
  ).sort()
  const uniqueProjectCountries = uniq(projectsRawData.flatMap(project => project.countries)).sort()
  const uniqueActorTypes = uniq(actorsRawData.flatMap(actor => actor.type)).sort()

  // Now using the imported utility functions
  const onSelectedYearChange = handleSelectedYear(setSelectedYear);
  const onSelectedCountryChange = handleSelectedCountry(setSelectedCountry);
  const onSelectedTypeChange = handleSelectedType(setSelectedType);
  const onSelectedCurrencyChange = handleSelectedCurrency(setSelectedCurrency);

  return (
    <div className='relative z-40 top-0 left-0 w-[415px] h-[calc(100vh-56px)] overflow-y-scroll bg-off-white border-r border-grey-100'>

      <header className='p-5 pt-7'>
        <p className='uppercase text-sm'>Explore</p>
        <Switch
          switchToggled={viewProjects}
          setSwitchToggled={handleSwitchToggle}
          label={''}
          options={['Partners', 'Projects']}
          colors={true}
          isLarge={true}
        />
        {viewProjects && <p className='text-base mt-3 mb-5'>Adaptation projects vary in scope, targeting many types of beneficiaries and employing different interventions, tailored to where they take place.</p> }
        {!viewProjects && <p className='text-base mt-3 mb-5'>Partners collaborate with one another on adaptation projects. This network is crucial to helping countries and communities prepare for climate change.</p> }
        <Switch
          switchToggled={viewByBudget}
          setSwitchToggled={setViewByBudget}
          label={'View by'}
          options={['Beneficiaries', 'Budget']}
          colors={false}
          isLarge={false}
        />

        {viewProjects &&
          <div className='flex items-center'>
            <span className='uppercase text-sm mr-4'>During</span>
            <Select onValueChange={onSelectedYearChange}>
              <SelectTrigger className="w-[180px]">
                <span className='truncate'>
                  <SelectValue placeholder="All years" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                {uniqueProjectYears && uniqueProjectYears.map((year, id) => {
                  // Check if year is not -1 or null
                  if (year !== -1 && year !== null) {
                    return <SelectItem key={id} value={String(year)}>{year}</SelectItem>;
                  }
                })}
              </SelectContent>
            </Select>
          </div>
        }

        {viewProjects && viewByBudget &&
          <div className='flex items-center'>
            <span className='uppercase text-sm mr-4'>Currency</span>
            <Select onValueChange={onSelectedCurrencyChange}>
              <SelectTrigger className="w-[180px]">
                <span className='truncate'>
                  <SelectValue placeholder="USD" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">Euro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      </header>

      <div>

        {viewProjects &&
          <div className='flex justify-between items-center px-5 pb-2 border-b border-b-grey-200'>
            <Select onValueChange={onSelectedCountryChange}>
              <SelectTrigger className="w-[180px]">
                <span className='truncate'>
                  <SelectValue placeholder="All countries" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All countries</SelectItem>
                {uniqueProjectCountries.map((country, id) => {
                  if (country) {
                    return <SelectItem key={id} value={String(country)}>{country}</SelectItem>;
                  }
                })}
              </SelectContent>
            </Select>
            <p className='uppercase text-sm'>{projectsTotal} of {projectsRawTotal} projects</p>
          </div>
        }

        {!viewProjects &&
          <div className='flex justify-between items-center px-5 pb-2 border-b border-b-grey-200'>
            <Select onValueChange={onSelectedTypeChange}>
              <SelectTrigger className="w-[180px] truncate text-left">
                <span className='truncate'>
                  <SelectValue placeholder="All partners" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All partners</SelectItem>
                {uniqueActorTypes.map((type, id) => {
                  if (type) {
                    return <SelectItem key={id} value={String(type)}>{type}</SelectItem>;
                  }
                })}
              </SelectContent>
            </Select>
            <p className='uppercase text-sm'>{actorsTotal} of {actorsRawTotal} partners</p>
          </div>
        }

        {/* TODO - move sidebar list to parent component sidebar */}
        <SidebarList
          viewProjects={viewProjects}
          viewProjectsDetail={viewProjectsDetail}
          setViewProjectsDetail={setViewProjectsDetail}
          viewByBudget={viewByBudget}
          actorsData={actorsData}
          projectsData={projectsData}
          networksData={networksData}
          detailPanelActive={detailPanelActive}
          setDetailPanelActive={setDetailPanelActive}
          activeActor={activeActor}
          setActiveActor={setActiveActor}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          selectedCurrency={selectedCurrency}
          selectedType={selectedType}
          selectedCountry={selectedCountry}
          selectedYear={selectedYear}
        />
      </div>
    </div>
  )
}

export default SidebarNav