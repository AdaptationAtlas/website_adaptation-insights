import React, { useState, useEffect, useCallback } from 'react';
import { formatNumberCommas } from '@/lib/utils'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import NetworkGraph from './network-graph'
import { colorRange } from '@/utils/color'
import { minBy, maxBy } from 'lodash'
import classNames from 'classnames'
import Spinner from './ui/spinner'

type Props = {
  viewProjects: boolean
  viewProjectsDetail: boolean
  setViewProjectsDetail: React.Dispatch<React.SetStateAction<boolean>>
  viewByBudget: boolean
  actorsData: ActorData[]
  projectsData: ProjectData[]
  networksData: NetworkData[]
  detailPanelActive: boolean
  setDetailPanelActive: React.Dispatch<React.SetStateAction<boolean>>
  activeActor: ActorData | null | undefined
  setActiveActor: React.Dispatch<React.SetStateAction<ActorData | null | undefined>>
  activeProject: ProjectData | null | undefined
  setActiveProject: React.Dispatch<React.SetStateAction<ProjectData | null | undefined>>
  selectedCurrency: string
  selectedType: string | null | undefined
  selectedCountry: string | null | undefined
  selectedYear: number | null | undefined
}

const SidebarList = ({
  viewProjects,
  viewProjectsDetail,
  setViewProjectsDetail,
  viewByBudget,
  actorsData,
  projectsData,
  networksData,
  detailPanelActive,
  setDetailPanelActive,
  activeActor,
  setActiveActor,
  activeProject,
  setActiveProject,
  selectedCurrency,
  selectedType,
  selectedCountry,
  selectedYear,
}: Props) => {
  // State to track loading of network graphs
  const [isGraphLoading, setIsGraphLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  // Handle the loading state of the graphs
  useEffect(() => {
    setIsGraphLoading(true);
    // Set a timeout to change the loading state after 1500 milliseconds
    const timeout = setTimeout(() => {
      setIsGraphLoading(false);
    }, 1500);

    // Cleanup the timeout when component unmounts
    return () => clearTimeout(timeout);
  }, [viewProjects, viewByBudget, selectedType]); // Change loading state when panel state changes

  // Set active actor to selected list item
  const handleActorSelect = (actor: ActorData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    if (viewProjectsDetail) { setViewProjectsDetail(false) }
    router.push(pathname + '?' + createQueryString('partner', actor.actorCode)) // push updated view to router
    setActiveActor(actor)
  }

  // Set active project to selected list item
  const handleProjectSelect = (project: ProjectData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    if (!viewProjectsDetail) { setViewProjectsDetail(true) }
    router.push(pathname + '?' + createQueryString('project', project.projectCode)) // push updated view to router
    setActiveProject(project)
  }

  // Generate color stops for colorRange function

  // Helper function to calculate logarithm with base 10
  const log10 = (value: number) => Math.log10(value || 1)

  // Function to generate logarithmic buckets
  const generateLogarithmicBuckets = (minValue: number, maxValue: number, numBuckets: number) => {
    const logMin = log10(minValue)
    const logMax = log10(maxValue)
    const step = (logMax - logMin) / (numBuckets - 1)

    const buckets = []
    for (let i = 0; i < numBuckets; i++) {
      buckets.push(Math.pow(10, logMin + step * i))
    }
    return buckets
  }

  // Assuming projectsData is an array of projects
  const maxBudget = maxBy(projectsData, 'budget')?.budget || 1 // Ensure non-zero
  const minBudget = minBy(projectsData, p => p.budget || Infinity)?.budget || 1

  const maxBeneficiaries = maxBy(projectsData, 'beneficiaryNum')?.beneficiaryNum || 1
  const minBeneficiaries = minBy(projectsData, p => p.beneficiaryNum || Infinity)?.beneficiaryNum || 1

  // Generate buckets
  const budgetBuckets = generateLogarithmicBuckets(minBudget, maxBudget, 5)
  const beneficiariesBuckets = generateLogarithmicBuckets(minBeneficiaries, maxBeneficiaries, 5)
  const bucketColors = ['#73BA5A', '#6EB17C', '#62A99D', '#4BA2BD', '#019BDC']

  return (
    <div className='flex flex-col'>
      {viewProjects && projectsData.map((project, index) => {
        const budgetCurrency = (selectedCurrency === 'EUR') ? project.budgetEUR : project.budgetUSD
        const currencySymbol = (selectedCurrency === 'EUR') ? '€' : '$'
        const budget = (budgetCurrency && currencySymbol) ? currencySymbol + formatNumberCommas(Math.round(budgetCurrency)) : 'Unspecified'
        const beneficiaries = (project.beneficiaryNum) ? formatNumberCommas(Math.round(project.beneficiaryNum)) : 'Unspecified'
        const colorBudget = project.budget ? colorRange(project.budget, budgetBuckets, bucketColors) : '#B7B7B7'
        const colorBeneficiaries = project.beneficiaryNum ? colorRange(project.beneficiaryNum, beneficiariesBuckets, bucketColors) : '#B7B7B7'
        const classBudget = (project.budget) ? 'font-bold' : 'font-normal'
        const classBeneficiaries = (project.beneficiaryNum) ? 'font-bold' : 'font-normal'
        const delay = (index + 2) * 100 // Calculate the delay for each list item
        // Change the key to force a re-render
        const combinedKey = `${project.projectCode}-budget-${viewByBudget}-type-${selectedType}-country-${selectedCountry}-year-${selectedYear}`

        return (
          <div
            key={combinedKey}
            onClick={() => { handleProjectSelect(project) }}
            className={classNames(
              'opacity-0 px-5 py-3 border-b border-b-grey-200 cursor-pointer',
              'hover:bg-grey-lightest transition duration-300 animate-fade-in-up',
              { 'bg-grey-lightest pointer-events-none': project.projectCode === activeProject?.projectCode }
            )}
            style={{ animationDelay: `${delay}ms` }}
          >
            {viewByBudget &&
              <div>
                <h3 className='uppercase text-sm'>Budget</h3>
                <p className={`text-[45px] uppercase leading-tight font-semibold ${classBudget}`} style={{ color: colorBudget }}>{budget}</p>
              </div>
            }
            {!viewByBudget &&
              <div>
                <h3 className='uppercase text-sm'>Beneficiaries</h3>
                <p className={`text-[45px] uppercase leading-tight font-semibold ${classBeneficiaries}`} style={{ color: colorBeneficiaries }}>{beneficiaries}</p>
              </div>
            }
            <p className='text-base mt-1 text-ellipsis whitespace-nowrap overflow-hidden'>{project.projectName}</p>
          </div>
        )
      })}
      {!viewProjects && actorsData.map((actor, index) => {
        const budgetCurrency = (selectedCurrency === 'EUR') ? actor.totalBudgetEUR : actor.totalBudgetUSD
        const currencySymbol = (selectedCurrency === 'EUR') ? '€' : '$'
        const budget = (budgetCurrency && currencySymbol) ? currencySymbol + formatNumberCommas(Math.round(budgetCurrency)) : 'Unspecified'
        const beneficiaries = (actor.totalBeneficiaries) ? formatNumberCommas(Math.round(actor.totalBeneficiaries)) : 'Unspecified'
        const maxWidth = (index < 10) ? 'max-w-[230px]' : 'max-w-[430px]'
        const delay = (index + 2) * 100 // Calculate the delay for each list item
        // Change the key to force a re-render
        const combinedKey = `${actor.actorCode}-budget-${viewByBudget}-type-${selectedType}`

        return (
          <div
            key={combinedKey}
            onClick={() => { handleActorSelect(actor) }}
            className={classNames(
              'opacity-0 px-5 border-b border-b-grey-200 cursor-pointer',
              'hover:bg-grey-lightest transition duration-300 animate-fade-in-up',
              { 'bg-grey-lightest pointer-events-none': actor.actorCode === activeActor?.actorCode }
            )}
            style={{ animationDelay: `${delay}ms` }}
          >
            {viewByBudget &&
              <div className='flex justify-between'>
                <div className={`${maxWidth} my-4`}>
                  <h3 className='uppercase text-sm mb-2'>{budget} budget</h3>
                  <h2 className='text-[16px] font-semibold text-black line-clamp-3'>{actor.name}</h2>
                </div>
                {index < 10 &&
                  <div className='relative h-[132px] w-[132px]'>
                    <div className={`${isGraphLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
                      <NetworkGraph
                        actorCode={actor.actorCode}
                        networksData={networksData}
                        width={132}
                        height={132}
                        type={'list'}
                      />
                    </div>
                    <div className={`absolute top-0 left-0 h-full w-full bg-pink flex justify-center items-center transition-opacity duration-100 ${isGraphLoading ? 'opacity-100' : 'opacity-0'}`}><Spinner /></div>
                  </div>
                }
              </div>
            }
            {!viewByBudget &&
              <div className='flex justify-between'>
                <div className={`${maxWidth} my-4`}>
                  <h3 className='uppercase text-sm mb-2'>{beneficiaries} beneficiaries</h3>
                  <h2 className='text-[17px] leading-tight font-semibold text-black line-clamp-3'>{actor.name}</h2>
                </div>
                {index < 10 &&
                  <div className='relative h-[132px] w-[132px]'>
                    <div className={`${isGraphLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
                      <NetworkGraph
                        actorCode={actor.actorCode}
                        networksData={networksData}
                        width={132}
                        height={132}
                        type={'list'}
                      />
                    </div>
                    <div className={`absolute top-0 left-0 h-full w-full bg-pink flex justify-center items-center transition-opacity duration-100 ${isGraphLoading ? 'opacity-100' : 'opacity-0'}`}><Spinner /></div>
                  </div>
                }
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}
export default SidebarList