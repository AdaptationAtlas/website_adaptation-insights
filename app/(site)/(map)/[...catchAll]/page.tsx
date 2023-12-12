'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import Map from '@/components/map'
import { orderBy } from 'lodash'
import { ActorData, NetworkData, ProjectData } from '@/types/sidebar.types'
import { fetchData, sortActors, sortProjects, filterByYear, filterByCountry, filterByType } from '@/lib/api'
import MapLegend from '@/components/map-legend'
import { getActor, getProject } from '@/utils/data-helpers'
import project from '@/sanity/schemas/project'

// type Props = {
//   params: { catchAll: string[] }
// }

// export async function generateStaticParams() {
//   return [
//     { data: ['map', 'partners'] }, // -> /map/partners/
//     { data: ['map', 'projects'] }, // -> /map/projects/
//   ];
// }

const MapPage = () => {
  const [viewByBudget, setViewByBudget] = useState<boolean>(false)
  const [actorsRawData, setActorsRawData] = useState<ActorData[]>([])
  const [projectsRawData, setProjectsRawData] = useState<ProjectData[]>([])
  const [actorsData, setActorsData] = useState<ActorData[]>([])
  const [projectsData, setProjectsData] = useState<ProjectData[]>([])
  const [networksData, setNetworksData] = useState<NetworkData[]>([])
  const [viewProjects, setViewProjects] = useState<boolean>(false)
  const [activeActor, setActiveActor] = useState<ActorData | null | undefined>(null)
  const [activeProject, setActiveProject] = useState<ProjectData | null | undefined>(null)
  const [selectedYear, setSelectedYear] = useState<number | null | undefined>(0)
  const [selectedCountry, setSelectedCountry] = useState<string | null | undefined>(null)
  const [selectedType, setSelectedType] = useState<string | null | undefined>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')
  const [detailPanelActive, setDetailPanelActive] = useState<boolean>(false)
  const [viewProjectsDetail, setViewProjectsDetail] = useState<boolean>(false)

  // Get the search params from the URL
  const searchParams = useSearchParams()

  // Update app state based on the search params
  useEffect(() => {
    const viewProj = (searchParams.get('view') == 'projects') ? true : false;
    const actorCode = searchParams.get('partner')
    const projectCode = searchParams.get('project')
    if (actorCode) {
      const actor = getActor(actorCode, actorsRawData)
      setActiveActor(actor)
      setDetailPanelActive(true)
      setViewProjectsDetail(viewProj)
    }
    if (projectCode) {
      const project = getProject(projectCode, projectsRawData)
      setActiveProject(project)
      setDetailPanelActive(true)
      setViewProjectsDetail(viewProj)
    }
    setViewProjects(viewProj)
  }, [searchParams, actorsRawData, projectsRawData])

  // // Selected year handler
  // const handleSelectedYear = (value: string) => {
  //   const selected = (value === 'all') ? null : parseInt(value)
  //   setSelectedYear(selected)
  // }

  // // Selected country handler
  // const handleSelectedCountry = (value: string) => {
  //   const selected = (value === 'all') ? null : value
  //   setSelectedCountry(selected)
  // }

  // const [page, slug] = params.catchAll; // get the page and slug from catchAll params

  // Fetch actors data
  // TODO - consolidate filtering and sorting
  // TODO - move fetch calls into a separarate file
  useEffect(() => {
    // Fetch data once
    const loadData = async () => {
      try {
        const actors = await fetchData('/data/actors.json');
        const projects = await fetchData('/data/projects.json');
        const networks = await fetchData('/data/networks.json');
        setActorsRawData(actors);
        setProjectsRawData(projects);
        setNetworksData(networks);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Reset filters when viewProjects changes
  useEffect(() => {
    // Reset filters
    setSelectedType(null)
    setSelectedCountry(null)
    setSelectedYear(0)
  }, [viewProjects])

  useEffect(() => {
    // Sort data when viewByBudget changes
    setActorsData(sortActors(actorsRawData, viewByBudget))
    setProjectsData(sortProjects(projectsRawData, viewByBudget))
  }, [viewByBudget, actorsRawData, projectsRawData])

  // TODO - add a filteredActors and filteredProjects state rather than actorsRawData and projectsRawData

  // Filter projects by year
  useEffect(() => {
    const filteredProjects = (selectedYear) ? filterByYear(projectsRawData, selectedYear) : projectsRawData
    setProjectsData(sortProjects(filteredProjects, viewByBudget))
  }, [selectedYear, viewByBudget, projectsRawData])

  // Filter projects by country
  useEffect(() => {
    const filteredProjects = (selectedCountry) ? filterByCountry(projectsRawData, selectedCountry) : projectsRawData
    setProjectsData(sortProjects(filteredProjects, viewByBudget))
  }, [selectedCountry, viewByBudget, projectsRawData])

  // Filter actors by type
  useEffect(() => {
    const filteredActors = (selectedType) ? filterByType(actorsRawData, selectedType) : actorsRawData
    setActorsData(sortActors(filteredActors, viewByBudget))
  }, [selectedType, viewByBudget, actorsRawData])

  return (
    <div className='flex'>
      <Sidebar
        actorsData={actorsData}
        projectsData={projectsData}
        actorsRawData={actorsRawData}
        projectsRawData={projectsRawData}
        viewByBudget={viewByBudget}
        setViewByBudget={setViewByBudget}
        networksData={networksData}
        viewProjects={viewProjects}
        setViewProjects={setViewProjects}
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
        detailPanelActive={detailPanelActive}
        setDetailPanelActive={setDetailPanelActive}
        viewProjectsDetail={viewProjectsDetail}
        setViewProjectsDetail={setViewProjectsDetail}
      />
      <div className='relative w-full h-[calc(100vh-56px)]'>
        <Map
          viewByBudget={viewByBudget}
          selectedCountry={selectedCountry}
          selectedYear={selectedYear}
        />
        <MapLegend
          viewByBudget={viewByBudget}
          selectedCurrency={selectedCurrency}
        />
      </div>
    </div>
  )
}

export default MapPage

