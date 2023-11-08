import Link from 'next/link'
import { formatNumberCommas } from '@/lib/utils'

type Partner = {
  actorCode: string,
  type: string
}

type Collaborator = {
  actorCode: string,
  projectsShared: number
}

type Project = {
  projectCode: string,
  numCollaborators: number
}

type ActorsData = {
  actorCode: string
  beneficiaryFlagMultiple: boolean | null
  collaborators: Collaborator[] | null
  email: string | null
  name: string
  projects: Project[] | null
  totalBeneficiaries: number | null
  totalBudget: number | null
  type: string | null
}

type ProjectsData = {
  beneficiaryFlagMultiple: boolean | null
  beneficiaryNum: number | null
  beyondFarmAdaptations: string[] | null
  budget: number | null
  budgetCurrency: string | null
  budgetEuro: number | null
  maxEndDate: number | null
  minStartDate: number | null
  onFarmAdaptations: string[] | null
  partners: Partner[] | null
  projectCode: string
  projectName: string
  projectScale: string | null
  targetedBeneficiaries: string[] | null
  targetedValueChains: string[] | null
  vulnerableGroups: string[] | null
}

type Props = {
  viewProjects: boolean
  viewByBudget: boolean
  actorsData: ActorsData[]
  projectsData: ProjectsData[]
}

const SidebarList = ({ viewProjects, viewByBudget, actorsData, projectsData }: Props) => {
  return (
    <div className='flex flex-col overflow-x-auto'>
      {viewProjects && projectsData.map(project => {
        // TODO - sort project list items by budget or beneficiaries
        const budget = (project.budget) ? '$' + formatNumberCommas(project.budget) : 'Unspecified'
        const beneficiaries = (project.beneficiaryNum) ? formatNumberCommas(project.beneficiaryNum) : 'Unspecified'

        return (
          <div key={project.projectCode} className='px-5 py-5 border-b border-b-grey-200 cursor-pointer'>
            {viewByBudget &&
              <div>
                <h3 className='uppercase text-sm mb-1'>Budget</h3>
                <p className='text-5xl font-bold text-brand-light-green'>{budget}</p>
              </div>
            }
            {!viewByBudget &&
              <div>
                <h3 className='uppercase text-sm mb-1'>Beneficiaries</h3>
                <p className='text-5xl font-bold text-brand-blue'>{beneficiaries}</p>
              </div>
            }
            <p className='text-base mt-3 text-ellipsis whitespace-nowrap overflow-hidden'>{project.projectName}</p>
          </div>
        )
      })}
      {!viewProjects && actorsData.map(actor => {
        // TODO - sort partner list items by budget or beneficiaries
        const budget = (actor.totalBudget) ? '$' + formatNumberCommas(actor.totalBudget) : 'Unspecified'
        const beneficiaries = (actor.totalBeneficiaries) ? formatNumberCommas(actor.totalBeneficiaries) : 'Unspecified'

        return (
          <div key={actor.actorCode} className='px-5 py-5 border-b border-b-grey-200 cursor-pointer'>
            {viewByBudget &&
              <div className='max-w-[230px]'>
                <h3 className='uppercase text-sm mb-2'>{budget} Total budget</h3>
                <h2 className='text-lg font-bold text-black line-clamp-3'>{actor.name}</h2>
              </div>
            }
            {!viewByBudget &&
              <div className='max-w-[230px]'>
                <h3 className='uppercase text-sm mb-2'>{beneficiaries} Total beneficiaries</h3>
                {/* TODO - account for unspecified beneficiaries */}
                <h2 className='text-lg font-bold text-black line-clamp-3'>{actor.name}</h2>
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}
export default SidebarList