'use client'

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData } from '@/types/sidebar.types'

type Props = {
  viewProjects: boolean
  viewByBudget: boolean
  actorsData: ActorData[]
  projectsData: ProjectData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null>>
  activeProject: ProjectData | null
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null>>
}

const SidebarDetailActor = ({
  viewProjects,
  viewByBudget,
  actorsData,
  projectsData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject
}: Props) => {
  const actor = activeActor

  return (
    <div className='p-5'>
      <header className='mb-5'>
        <p className='uppercase text-sm text-brand-teal mb-1'>Partner detail</p>
        <h1 className='text-xl font-semibold'>{actor?.name}</h1>
      </header>

      <div className='mb-10'>
        <ul>
          <li className='flex items-center'>
            <h4 className='w-32 mr-3 text-sm font-semibold'>Type</h4>
            <p>Government agency</p>
          </li>
          <li className='flex items-center'>
            <h4 className='w-32 mr-3 text-sm font-semibold'>Contact</h4>
            <p>placeholder@website.com</p>
          </li>
        </ul>
      </div>

      <div className='mb-8'>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-3'>Known Network</h2>
          <p>The Reseau des Initiatives Agroecologiques du Maroc works on L’Observatoire de l’Agroecologie au Maroc with 3 collaborators in total.</p>
        </div>
        <div className='mb-6'>
          <p className='w-full h-48 flex items-center justify-center bg-grey-200'>Network Diagram</p>
        </div>
        <div>
          <ul className='flex items-center gap-5'>
            <li className='text-sm font-medium flex items-center'><span className='block w-4 h-4 bg-brand-teal mr-1.5'></span>Selected Partner</li>
            <li className='text-sm font-medium flex items-center'><span className='block w-4 h-4 bg-brand-red mr-1.5'></span>Collaborator</li>
            <li className='text-sm font-medium flex items-center'><span className='block w-4 h-4 bg-brand-gold mr-1.5'></span>Project</li>
          </ul>
        </div>
      </div>

      <div className='mb-8'>
        <h3 className='text-sm font-semibold uppercase mb-2 text-brand-dark-gold'>1 recorded project</h3>
        <div className='mb-5'>
          <h4 className='font-semibold'>Project name</h4>
          <div className='flex items-center'>
            <p className='mr-3'>3 collaborators</p>
            <div className='flex items-center gap-2'>
              <span className='block w-4 h-4 rounded-full bg-brand-red'></span>
              <span className='block w-4 h-4 rounded-full bg-brand-red'></span>
              <span className='block w-4 h-4 rounded-full bg-brand-red'></span>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-8'>
        <h3 className='text-sm font-semibold uppercase mb-2 text-brand-red'>3 known collaborators</h3>
        <div className='mb-5'>
          <h4 className='font-semibold'>Partner name</h4>
          <div className='flex items-center'>
            <p className='mr-3'>3 projects together</p>
            <div className='flex items-center gap-2'>
              <span className='block w-4 h-4 rounded-full bg-brand-gold'></span>
              <span className='block w-4 h-4 rounded-full bg-brand-gold'></span>
              <span className='block w-4 h-4 rounded-full bg-brand-gold'></span>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <h4 className='font-semibold'>Partner name</h4>
          <div className='flex items-center'>
            <p className='mr-3'>3 projects together</p>
            <div className='flex items-center gap-2'>
              <span className='block w-4 h-4 rounded-full bg-brand-gold'></span>
              <span className='block w-4 h-4 rounded-full bg-brand-gold'></span>
              <span className='block w-4 h-4 rounded-full bg-brand-gold'></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SidebarDetailActor