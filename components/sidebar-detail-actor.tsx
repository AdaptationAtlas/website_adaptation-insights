'use client'

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import { find } from 'lodash'
import NetworkGraph from './network-graph'
import { getActor, getProject } from '@/utils/data-helpers'

type Props = {
  viewProjects: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  viewByBudget: boolean
  actorCode: string
  actorsData: ActorData[]
  projectsData: ProjectData[]
  actorsRawData: ActorData[]
  projectsRawData: ProjectData[]
  networksData: NetworkData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null | undefined
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null | undefined>>
  activeProject: ProjectData | null | undefined
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null | undefined>>
  scrollToTop: () => void
  detailPanelRef: React.RefObject<HTMLDivElement>
}

const SidebarDetailActor = ({
  viewProjects,
  setViewProjectsDetail,
  viewByBudget,
  actorCode,
  actorsData,
  projectsData,
  actorsRawData,
  projectsRawData,
  networksData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject,
  scrollToTop,
  detailPanelRef,
}: Props) => {

  // Store the active actor for quick reference
  const actor = activeActor

  // Store collab and project counts
  const collabCount = actor?.collaborators?.length || 0
  const collabPlural = (collabCount && collabCount > 1) ? 'collaborators' : 'collaborator'
  const collabText = (collabCount) ? `${collabCount} ${collabPlural} in total` : 'no other collaborators'
  const projectCount = actor?.projects?.length || 0

  // Parse the known network intro text
  const firstProjectCode = actor?.projects?.[0]?.projectCode;
  const firstProjectData = firstProjectCode ? getProject(firstProjectCode, projectsRawData) : null;
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

  // Handle when the user selects a collaborator from the actor detail
  const handleCollaboratorSelect = (actor: ActorData | undefined) => {
    setViewProjectsDetail(false)
    setActiveActor(actor)
    scrollToTop()
  }

  // Handle when the user selects a project from the actor detail
  const handleProjectSelect = (project: ProjectData | undefined) => {
    setViewProjectsDetail(true)
    setActiveProject(project)
    scrollToTop()
  }

  return (
    <div className='p-5'>
      <header className='mb-5'>
        <p className='uppercase font-medium text-sm text-brand-teal mb-1'>Partner detail</p>
        <h1 className='text-xl font-semibold'>{actor?.name}</h1>
      </header>

      <div className='mb-10'>
        <ul>
          {actor?.type &&
            <li className='flex'>
              <h4 className='w-[120px] mr-3 text-sm font-semibold'>Type</h4>
              <p className='w-[250px]'>{actor?.type}</p>
            </li>
          }
          {actor?.email &&
            <li className='flex items-center'>
              <h4 className='w-[120px] mr-3 text-sm font-semibold'>Contact</h4>
              <p className='w-[250px]'>{actor?.email}</p>
            </li>
          }
        </ul>
      </div>

      {projectCount > 0 &&
        <div className='mb-14'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-3'>Known Network</h2>
            <p>{actor?.name} works {collabProjectText} with {collabText}.</p>
          </div>
          <div className='mb-6'>
            <NetworkGraph
              actorCode={actorCode}
              networksData={networksData}
              actorsRawData={actorsRawData}
              projectsRawData={projectsRawData}
              width={374}
              height={374}
              type={'detail'}
              detailPanelRef={detailPanelRef}
            />
          </div>
          <div>
            <ul className='flex items-center gap-5'>
              <li className='text-sm font-medium flex items-center'><span className='block w-4 h-4 bg-brand-teal mr-1.5'></span>Selected Partner</li>
              <li className='text-sm font-medium flex items-center'><span className='block w-4 h-4 bg-brand-red mr-1.5'></span>Collaborator</li>
              <li className='text-sm font-medium flex items-center'><span className='block w-4 h-4 bg-brand-gold mr-1.5'></span>Project</li>
            </ul>
          </div>
        </div>
      }

      {(projectCount > 0) &&
        <div className='mb-14'>
          <h3 className='text-sm font-semibold uppercase mb-3 text-brand-dark-gold'>{projectHeader}</h3>
          {projects && projects.map((project) => {
            const projectData = getProject(project.projectCode, projectsRawData)
            const numCollaborators = project.numCollaborators
            const projectPlural = (numCollaborators > 1) ? 'collaborators' : 'collaborator'
            return (
              <div key={project.projectCode} className='mb-7 cursor-pointer' onClick={() => handleProjectSelect(projectData)}>
                <h4 className='font-semibold mb-1'>{projectData?.projectName}</h4>
                {numCollaborators > 0 &&
                  <div className='flex items-center'>
                    <p className='mr-4'>{numCollaborators} {projectPlural}</p>
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
        <div className='mb-14'>
          <h3 className='text-sm font-semibold uppercase mb-3 text-brand-red'>{collabHeader}</h3>
          {collaborators && collaborators?.map((collaborator) => {
            const collaboratorData = getActor(collaborator.actorCode, actorsRawData)
            const projectsShared = collaborator.projectsShared
            const projectPlural = (projectsShared > 1) ? 'projects' : 'project'
            return (
              <div key={collaborator.actorCode} className='mb-7 cursor-pointer' onClick={() => handleCollaboratorSelect(collaboratorData)}>
                <h4 className='font-semibold mb-1'>{collaboratorData?.name}</h4>
                {projectsShared > 0 &&
                  <div className='flex items-center'>
                    <p className='mr-4'>{projectsShared} {projectPlural} together</p>
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