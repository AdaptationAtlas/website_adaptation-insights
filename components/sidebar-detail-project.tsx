'use client'

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ActorData, ProjectData } from '@/types/sidebar.types'
import { find, filter } from 'lodash'
import { formatNumberCommas } from '@/lib/utils'
import { currentYear } from '@/utils/time'

type Props = {
  viewProjects: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  viewByBudget: boolean
  actorsData: ActorData[]
  projectsData: ProjectData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null | undefined
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null | undefined>>
  activeProject: ProjectData | null | undefined
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null | undefined>>
  scrollToTop: () => void
}

const SidebarDetailProject = ({
  viewProjects,
  setViewProjectsDetail,
  viewByBudget,
  actorsData,
  projectsData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject,
  scrollToTop,
}: Props) => {

  // Store active project for quick reference
  const project = activeProject

  // Utility function to look up project based on projectCode
  const getProject = (projectCode: string) => {
    const project = find(projectsData, { 'projectCode': projectCode })
    return project
  }

  // Utility function to look up actor based on actorCode
  const getActor = (actorCode: string) => {
    const actor = find(actorsData, { 'actorCode': actorCode })
    return actor
  }

  // Store project data
  const projectName = project?.projectName
  const projectScale = project?.projectScale
  const budget = project?.budget
  const budgetText = (budget) ? formatNumberCommas(budget) : null
  const currency = project?.budgetCurrency
  const startDate = project?.minStartDate
  const endDate = project?.maxEndDate
  const completed = (endDate && endDate < currentYear) ? true : false

  // Store targeted beneficiaries
  const targetedBeneficiaries = project?.targetedBeneficiaries
  const targetedBeneficiaryCount = targetedBeneficiaries?.length || 0
  const beneficiaryNum = project?.beneficiaryNum
  const beneficiaryNumText = (beneficiaryNum) ? formatNumberCommas(beneficiaryNum) : null

  // Store vulnerable groups
  const vulnerableGroups = project?.vulnerableGroups
  const vulnerableGroupCount = vulnerableGroups?.length || 0

  // Store targeted value chain
  const valueChains = project?.targetedValueChains
  const valueChainCount = valueChains?.length || 0

  // Store on farm adaptations
  const onFarm = project?.onFarmAdaptations
  const onFarmCount = onFarm?.length || 0

  // Store beyond farm adaptations
  const beyondFarm = project?.beyondFarmAdaptations
  const beyondFarmCount = beyondFarm?.length || 0

  // Store project partners
  const partners = project?.partners
  const partnerCount = partners?.length || 0
  const primaryPartners = filter(partners, { 'type': 'primary' })
  const fundingPartners = filter(partners, { 'type': 'funding' })
  const implementationPartners = filter(partners, { 'type': 'implementation' })
  const primaryPartnerCount = primaryPartners?.length || 0
  const fundingPartnerCount = fundingPartners?.length || 0
  const implementationPartnerCount = implementationPartners?.length || 0

  // Utility function to get partner or partners
  const getPartnerPlural = (count: number) => {
    const plural = (count > 1) ? 'partners' : 'partner'
    return plural
  }

  // Handle when the user selects a partner from the project detail
  const handleActorSelect = (actor: ActorData | undefined) => {
    setViewProjectsDetail(false)
    setActiveActor(actor)
    scrollToTop()
  }

  return (
    <div className='p-5'>
      <header className='mb-5'>
        <p className='uppercase text-sm text-brand-dark-gold mb-1'>Project detail</p>
        <h1 className='text-xl font-semibold'>{projectName}</h1>
      </header>

      <div className='mb-10'>
        <ul>
          {projectScale &&
            <li className='flex items-center'>
              <h4 className='w-32 mr-3 text-sm font-semibold'>Scale</h4>
              <p>{projectScale} project</p>
            </li>
          }
          {budgetText && currency &&
            <li className='flex items-center'>
              <h4 className='w-32 mr-3 text-sm font-semibold'>Budget</h4>
              <p className='font-semibold'>{budgetText} {currency}</p>
            </li>
          }
          {(startDate || endDate) &&
            <li className='flex items-center'>
              <h4 className='w-32 mr-3 text-sm font-semibold'>Date</h4>
              <p>{startDate}-{endDate}{completed && <span className='text-brand-burgundy text-xs font-semibold ml-2'>Completed</span>}</p>
            </li>
          }
        </ul>
      </div>

      {(beneficiaryNum || targetedBeneficiaryCount > 0 || vulnerableGroupCount > 0) &&
          <div className='mb-10'>
          <div className='flex items-center mb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none" className='mr-3'>
              <path d="M8.4 11.0996C5.592 11.0996 0 12.5036 0 15.2996V17.3996H16.8V15.2996C16.8 12.5036 11.208 11.0996 8.4 11.0996ZM2.808 14.9996C3.816 14.3036 6.252 13.4996 8.4 13.4996C10.548 13.4996 12.984 14.3036 13.992 14.9996H2.808ZM8.4 8.99961C10.716 8.99961 12.6 7.11561 12.6 4.79961C12.6 2.48361 10.716 0.599609 8.4 0.599609C6.084 0.599609 4.2 2.48361 4.2 4.79961C4.2 7.11561 6.084 8.99961 8.4 8.99961ZM8.4 2.99961C9.396 2.99961 10.2 3.80361 10.2 4.79961C10.2 5.79561 9.396 6.59961 8.4 6.59961C7.404 6.59961 6.6 5.79561 6.6 4.79961C6.6 3.80361 7.404 2.99961 8.4 2.99961ZM16.848 11.1716C18.24 12.1796 19.2 13.5236 19.2 15.2996V17.3996H24V15.2996C24 12.8756 19.8 11.4956 16.848 11.1716ZM15.6 8.99961C17.916 8.99961 19.8 7.11561 19.8 4.79961C19.8 2.48361 17.916 0.599609 15.6 0.599609C14.952 0.599609 14.352 0.755609 13.8 1.01961C14.556 2.08761 15 3.39561 15 4.79961C15 6.20361 14.556 7.51161 13.8 8.57961C14.352 8.84361 14.952 8.99961 15.6 8.99961Z" fill="#FFC84F" />
            </svg>
            <h2 className='text-lg font-semibold'>Project Impact</h2>
          </div>
          <div className='flex items-baseline mb-4'>
            {beneficiaryNum &&
              <h3 className='w-32 mr-3 text-sm font-semibold uppercase'>{beneficiaryNumText} beneficiaries</h3>
            }
            {(!beneficiaryNum && targetedBeneficiaryCount > 0) &&
              <h3 className='w-32 mr-3 text-sm font-semibold uppercase'>Beneficiaries</h3>
            }
            {targetedBeneficiaryCount > 0 &&
              <ul>
                {targetedBeneficiaries && targetedBeneficiaries.map((beneficiary) => (
                  <li key={beneficiary.name} className='mb-1'>{beneficiary.name}</li>
                ))}
              </ul>
            }
          </div>
          {vulnerableGroupCount > 0 &&
            <div className='flex items-baseline'>
              <h3 className='w-32 mr-3 text-sm font-semibold uppercase'>Targeted vulnerable groups</h3>
              <ul>
                {vulnerableGroups && vulnerableGroups.map((group) => (
                  <li key={group} className='mb-1'>{group}</li>
                ))}
              </ul>
            </div>
          }
        </div>
      }

      <div className='mb-10'>
        <div className='flex items-center mb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none" className='mr-3'>
            <path d="M12 19.6004H0V17.2004H6.9C6.024 13.8284 3.372 11.1884 0 10.3124C0.768 10.1204 1.572 10.0004 2.4 10.0004C7.704 10.0004 12 14.2964 12 19.6004ZM24 10.3124C23.232 10.1204 22.428 10.0004 21.6 10.0004C18.084 10.0004 15.024 11.8964 13.344 14.7164C13.692 15.5084 13.98 16.3364 14.148 17.2004C14.304 17.9804 14.388 18.7844 14.388 19.6004H23.988V17.2004H17.088C17.976 13.8284 20.628 11.1884 24 10.3124ZM16.368 8.82439C17.304 6.31639 19.044 4.21639 21.276 2.82439C16.128 2.99239 12 7.20439 12 12.4004C12 12.4124 12 12.4244 12 12.4244C13.14 10.9004 14.64 9.66439 16.368 8.82439ZM11.304 6.22039C10.296 3.59239 8.256 1.46839 5.64 0.400391C7.368 2.63239 8.4 5.41639 8.4 8.45239C8.4 8.70439 8.364 8.94439 8.352 9.18439C8.868 9.47239 9.348 9.80839 9.816 10.1684C10.068 8.75239 10.596 7.42039 11.304 6.22039Z" fill="#FFC84F" />
          </svg>
          <h2 className='text-lg font-semibold'>Approaches & Interventions</h2>
        </div>

        {valueChainCount > 0 &&
          <div className='flex items-baseline mb-4'>
            <h3 className='w-32 mr-3 text-sm font-semibold uppercase'>Targeted value chain</h3>
            <ul>
              {valueChains && valueChains.map((chain) => (
                <li key={chain.name} className='mb-1'>{chain.name}</li>
              ))}
            </ul>
          </div>
        }

        {onFarmCount > 0 &&
          <div className='flex items-baseline mb-4'>
            <h3 className='w-32 mr-3 text-sm font-semibold uppercase'>On the farm</h3>
            <ul>
              {onFarm && onFarm.map((adaptation) => (
                <li key={adaptation.name} className='mb-1'>{adaptation.name}</li>
              ))}
            </ul>
          </div>
        }

        {beyondFarmCount > 0 &&
          <div className='flex items-baseline mb-4'>
            <h3 className='w-32 mr-3 text-sm font-semibold uppercase'>Beyond the farm</h3>
            <ul>
              {beyondFarm && beyondFarm.map((adaptation) => (
                <li key={adaptation.name} className='mb-1'>{adaptation.name}</li>
              ))}
            </ul>
          </div>
        }

      </div>

      {partnerCount > 0 &&
        <div className='mb-10'>
          <div className='flex items-center mb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" className='mr-3'>
              <path d="M12.1421 19.4794C11.9477 19.6738 11.6021 19.7062 11.3753 19.4794C11.1809 19.285 11.1485 18.9394 11.3753 18.7126L15.0367 15.0513L13.5138 13.5285L9.85239 17.1898C9.64718 17.4058 9.30156 17.395 9.08555 17.1898C8.85874 16.963 8.89114 16.6174 9.08555 16.423L12.7469 12.7617L11.2241 11.2389L7.56266 14.9001C7.36825 15.0945 7.02263 15.1269 6.79582 14.9001C6.59061 14.6949 6.59061 14.3493 6.79582 14.1333L10.4572 10.4721L8.92354 8.94928L5.26214 12.6105C5.06773 12.8049 4.72211 12.8373 4.4953 12.6105C4.29008 12.3945 4.29008 12.0597 4.4953 11.8437L9.22596 7.11325L11.2457 9.12208C12.2717 10.1481 14.043 10.1373 15.0691 9.12208C16.1275 8.06366 16.1275 6.35724 15.0691 5.29883L13.0602 3.29001L13.3626 2.9876C14.205 2.14519 15.5767 2.14519 16.4192 2.9876L20.9986 7.56686C21.841 8.40927 21.841 9.78088 20.9986 10.6233L12.1421 19.4794ZM22.5215 12.1569C24.2064 10.4721 24.2064 7.73966 22.5215 6.04404L17.942 1.46479C16.2571 -0.220033 13.5246 -0.220033 11.8289 1.46479L11.5265 1.76719L11.2241 1.46479C9.53917 -0.220033 6.80662 -0.220033 5.11093 1.46479L1.28752 5.28803C-0.246165 6.82165 -0.386573 9.20848 0.855495 10.8933L2.42158 9.32728C2.00036 8.51727 2.14077 7.49126 2.8212 6.81085L6.64461 2.9876C7.48706 2.14519 8.85874 2.14519 9.70118 2.9876L13.5462 6.83245C13.7406 7.02685 13.773 7.37246 13.5462 7.59926C13.3194 7.82606 12.9738 7.79366 12.7794 7.59926L9.22596 4.05682L2.96161 10.3101C1.90315 11.3577 1.90315 13.0749 2.96161 14.1333C3.38283 14.5545 3.92286 14.8137 4.4953 14.8893C4.5709 15.451 4.81931 15.991 5.25134 16.423C5.68336 16.855 6.22339 17.1034 6.78502 17.179C6.86063 17.7406 7.10904 18.2806 7.54106 18.7126C7.97309 19.1446 8.51312 19.393 9.07475 19.4686C9.15035 20.0518 9.40956 20.581 9.83079 21.0022C10.3384 21.5098 11.0189 21.7906 11.7425 21.7906C12.4661 21.7906 13.1466 21.5098 13.6542 21.0022L22.5215 12.1569Z" fill="#FFC84F" />
            </svg>
            <h2 className='text-lg font-semibold'>Project Partners</h2>
          </div>

          {primaryPartnerCount > 0 &&
            <div className='mb-4'>
              <h3 className='text-sm font-semibold uppercase mb-1'>{primaryPartnerCount} project {getPartnerPlural(primaryPartnerCount)}</h3>
              <ul>
                {primaryPartners && primaryPartners.map((partner) => {
                  const actor = getActor(partner.actorCode)
                  return <li key={partner.actorCode} className='mb-1 cursor-pointer' onClick={() => handleActorSelect(actor)}>{getActor(partner.actorCode)?.name}</li>
                })}
              </ul>
            </div>
          }

          {fundingPartnerCount > 0 &&
            <div className='mb-4'>
              <h3 className='text-sm font-semibold uppercase mb-1'>{fundingPartnerCount} funding {getPartnerPlural(fundingPartnerCount)}</h3>
              <ul>
                {fundingPartners && fundingPartners.map((partner) => (
                  <li key={partner.actorCode} className='mb-1'>{getActor(partner.actorCode)?.name}</li>
                ))}
              </ul>
            </div>
          }

          {implementationPartnerCount > 0 &&
            <div className='mb-4'>
              <h3 className='text-sm font-semibold uppercase mb-1'>{implementationPartnerCount} implementation {getPartnerPlural(implementationPartnerCount)}</h3>
              <ul>
                {implementationPartners && implementationPartners.map((partner) => (
                  <li key={partner.actorCode} className='mb-1'>{getActor(partner.actorCode)?.name}</li>
                ))}
              </ul>
            </div>
          }

        </div>
      }

    </div>
  )
}

export default SidebarDetailProject