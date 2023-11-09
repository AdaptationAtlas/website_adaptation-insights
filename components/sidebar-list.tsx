import Link from 'next/link'
import { formatNumberCommas } from '@/lib/utils'
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

const SidebarList = ({
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

  // Set active actor to selected list item
  const handleActorSelect = (actor: ActorData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    setActiveActor(actor)
  }

  // Set active project to selected list item
  const handleProjectSelect = (project: ProjectData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    setActiveProject(project)
  }

  return (
    <div className='flex flex-col overflow-x-auto'>
      {viewProjects && projectsData.map(project => {
        // TODO - sort project list items by budget or beneficiaries
        const budget = (project.budget) ? '$' + formatNumberCommas(project.budget) : 'Unspecified'
        const beneficiaries = (project.beneficiaryNum) ? formatNumberCommas(project.beneficiaryNum) : 'Unspecified'

        return (
          <div key={project.projectCode} onClick={() => { handleProjectSelect(project) }} className='px-5 py-5 border-b border-b-grey-200 cursor-pointer'>
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
          <div key={actor.actorCode} onClick={() => { handleActorSelect(actor) }} className='px-5 py-5 border-b border-b-grey-200 cursor-pointer'>
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