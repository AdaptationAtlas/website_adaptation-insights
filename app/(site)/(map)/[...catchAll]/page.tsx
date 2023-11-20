'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import Map from '@/components/map'
import { orderBy } from 'lodash'
import { ActorData, NetworkData, ProjectData } from '@/types/sidebar.types'

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
  const [actorsData, setActorsData] = useState<ActorData[]>([])
  const [projectsData, setProjectsData] = useState<ProjectData[]>([])
  const [networksData, setNetworksData] = useState<NetworkData[]>([])
  const [viewProjects, setViewProjects] = useState<boolean>(false)
  const [activeActor, setActiveActor] = useState<ActorData | null>(null)
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)

  // const [page, slug] = params.catchAll; // get the page and slug from catchAll params

  useEffect(() => {
    // Fetch actors data
    // TODO - fix item sorting for actors
    // TODO - consolidate filtering and sorting
    // TODO - move fetch calls into a separarate file
    fetch('/data/actors.json')
      .then(response => response.json())
      .then(data => {
        const orderField = viewByBudget ? 'totalBudget' : 'totalBeneficiaries';
        const sortedActorsData = orderBy(
          data,
          [orderField, 'name'], // Fallback to 'name' if you want to sort by name when values are equal
          ['desc', 'asc'] // Or any other order you prefer
        );
        setActorsData(sortedActorsData);
      });

    // Fetch projects data
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => {
        const sortedData = orderBy(
          data,
          [
            (project) => project.beneficiaryNum === null,
            'beneficiaryNum'
          ],
          ['asc', 'desc']
        );
        setProjectsData(sortedData);
      });

    // Fetch networks data
    fetch('/data/networks.json')
      .then(response => response.json())
      .then(data => setNetworksData(data));
  }, []);

  // Sort actors data by budget or beneficiaries
  useEffect(() => {
    const orderField = viewByBudget ? 'totalBudget' : 'totalBeneficiaries';
    const sortedActorsData = orderBy(
      actorsData,
      [orderField, 'name'], // Fallback to 'name' if you want to sort by name when values are equal
      ['desc', 'asc'] // Or any other order you prefer
    );
    setActorsData(sortedActorsData);
  }, [viewByBudget])

  // Sort projects data by budget or beneficiaries
  useEffect(() => {
    const sortedProjectsData = orderBy(
      projectsData,
      [
        // Check if budget is null only when sorting by budget
        viewByBudget ? (project) => project.budget === null : (project) => project.beneficiaryNum === null,
        viewByBudget ? 'budget' : 'beneficiaryNum', // Choose field to sort by based on state
      ],
      [viewByBudget ? 'asc' : 'asc', viewByBudget ? 'desc' : 'desc'] // Adjust the sort order
    );
    setProjectsData(sortedProjectsData);
  }, [viewByBudget]);

  return (
    <div className='flex'>
      <Sidebar
        viewByBudget={viewByBudget}
        setViewByBudget={setViewByBudget}
        actorsData={actorsData}
        projectsData={projectsData}
        networksData={networksData}
        viewProjects={viewProjects}
        setViewProjects={setViewProjects}
        activeActor={activeActor}
        setActiveActor={setActiveActor}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <div className='relative w-full h-[calc(100vh-56px)]'>
        <Map viewByBudget={viewByBudget} />
      </div>
    </div>
  )
}

export default MapPage

