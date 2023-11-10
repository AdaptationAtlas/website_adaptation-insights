'use client'

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData } from '@/types/sidebar.types'
import { find } from 'lodash'

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

// export type ActorData = {
//   actorCode: string
//   beneficiaryFlagMultiple: boolean | null
//   collaborators: Collaborator[] | null
//   email: string | null
//   name: string
//   projects: Project[] | null
//   totalBeneficiaries: number | null
//   totalBudget: number | null
//   type: string | null
// }

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

  // Utility function to look up project based on projectCode
  const getProject = (projectCode: string) => {
    const project = find(projectsData, { 'projectCode': projectCode });
    return project;
  }

  // Utility function to look up actor based on actorCode
  const getActor = (actorCode: string) => {
    const actor = find(actorsData, { 'actorCode': actorCode });
    return actor;
  }

  // Store the active actor for quick reference
  const actor = activeActor

  // Store collab and project counts
  const collabCount = actor?.collaborators?.length || 0
  const collabPlural = (collabCount && collabCount > 1) ? 'collaborators' : 'collaborator'
  const collabText = (collabCount) ? `${collabCount} ${collabPlural} in total` : 'no other collaborators'
  const projectCount = actor?.projects?.length || 0

  // Parse the known network intro text
  const firstProjectCode = actor?.projects?.[0]?.projectCode;
  const firstProjectData = firstProjectCode ? getProject(firstProjectCode) : null;
  const collabProjectText = projectCount && projectCount > 1
    ? `on ${projectCount} projects`
    : projectCount === 1
      ? `on ${firstProjectData?.projectName}`
      : '';

  // Parse project list
  const projects = actor?.projects
  const projectHeader = (projectCount && projectCount > 1) ? `${projectCount} recorded projects` : '1 recorded project'

  // Parse collaborator list
  const collaborators = actor?.collaborators
  const collabHeader = (collabCount && collabCount > 1) ? `${collabCount} known collaborators` : '1 known collaborator'

  return (
    <div className='p-5'>
      <header className='mb-5'>
        <p className='uppercase text-sm text-brand-teal mb-1'>Partner detail</p>
        <h1 className='text-xl font-semibold'>{actor?.name}</h1>
      </header>

      <div className='mb-10'>
        <ul>
          {actor?.type &&
            <li className='flex items-center'>
              <h4 className='w-32 mr-3 text-sm font-semibold'>Type</h4>
              <p>{actor?.type}</p>
            </li>
          }
          {actor?.email &&
            <li className='flex items-center'>
              <h4 className='w-32 mr-3 text-sm font-semibold'>Contact</h4>
              <p>{actor?.email}</p>
            </li>
          }
        </ul>
      </div>

      <div className='mb-10'>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-3'>Known Network</h2>
          <p>{actor?.name} works {collabProjectText} with {collabText}.</p>
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

      {(projectCount > 0) &&
        <div className='mb-8'>
          <h3 className='text-sm font-semibold uppercase mb-2 text-brand-dark-gold'>{projectHeader}</h3>
          {projects && projects.map((project) => {
            const projectData = getProject(project.projectCode)
            const numCollaborators = project.numCollaborators
            const projectPlural = (numCollaborators > 1) ? 'collaborators' : 'collaborator'
            return (
              <div key={project.projectCode} className='mb-7'>
                <h4 className='font-semibold mb-2'>{projectData?.projectName}</h4>
                {numCollaborators > 0 &&
                  <div className='flex items-center'>
                    <p className='mr-3 w-32'>{numCollaborators} {projectPlural}</p>
                    <div className='flex items-center gap-2 flex-wrap'>
                      {Array.from({ length: numCollaborators }).map((_, i) => (
                        <span key={i} className='block w-4 h-4 rounded-full bg-brand-red'></span>
                      ))}
                    </div>
                  </div>
                }
              </div>
            )
          })}
        </div>
      }

      {collabCount > 0 &&
        <div className='mb-8'>
          <h3 className='text-sm font-semibold uppercase mb-2 text-brand-red'>{collabHeader}</h3>
          {collaborators && collaborators?.map((collaborator) => {
            const collaboratorData = getActor(collaborator.actorCode)
            const projectsShared = collaborator.projectsShared
            const projectPlural = (projectsShared > 1) ? 'projects' : 'project'
            return (
              <div key={collaborator.actorCode} className='mb-7'>
                <h4 className='font-semibold mb-2'>{collaboratorData?.name}</h4>
                {projectsShared > 0 &&
                  <div className='flex items-center'>
                    <p className='mr-3 w-40'>{projectsShared} {projectPlural} together</p>
                    <div className='flex items-center gap-2 flex-wrap'>
                      {Array.from({ length: projectsShared }).map((_, i) => (
                        <span key={i} className='block w-4 h-4 rounded-full bg-brand-gold'></span>
                      ))}
                    </div>
                  </div>
                }
              </div>
            )
          })}
        </div>
      }

    </div>
  )
}

export default SidebarDetailActor