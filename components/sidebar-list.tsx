import Link from 'next/link'
import { formatNumberCommas } from '@/lib/utils'
import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import NetworkGraph from './network-graph'
import { interpolateColor } from '@/utils/color'
import { minBy, maxBy } from 'lodash'
import classNames from 'classnames'

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
  setActiveProject
}: Props) => {

  // Set active actor to selected list item
  const handleActorSelect = (actor: ActorData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    if (viewProjectsDetail) { setViewProjectsDetail(false) }
    setActiveActor(actor)
  }

  // Set active project to selected list item
  const handleProjectSelect = (project: ProjectData) => {
    if (!detailPanelActive) { setDetailPanelActive(true) }
    if (!viewProjectsDetail) { setViewProjectsDetail(true) }
    setActiveProject(project)
  }

  // Assuming projectsData is an array of projects
  const maxBudget = maxBy(projectsData, 'budget')?.budget || 0;
  const minBudget = minBy(projectsData, p => p.budget || Infinity)?.budget || 0;

  const maxBeneficiaries = maxBy(projectsData, 'beneficiaryNum')?.beneficiaryNum || 0;
  const minBeneficiaries = minBy(projectsData, p => p.beneficiaryNum || Infinity)?.beneficiaryNum || 0;


  return (
    <div className='flex flex-col overflow-x-auto'>
      {viewProjects && projectsData.map(project => {
        const budget = (project.budget) ? '$' + formatNumberCommas(project.budget) : 'Unspecified'
        const beneficiaries = (project.beneficiaryNum) ? formatNumberCommas(project.beneficiaryNum) : 'Unspecified'
        // const colorBudget = project.budget ? interpolateColor(project.budget, minBudget, maxBudget, '#73B959', '#009ADB', true) : '#B7B7B7'
        // const colorBeneficiaries = project.beneficiaryNum ? interpolateColor(project.beneficiaryNum, minBeneficiaries, maxBeneficiaries, '#73B959', '#009ADB', true) : '#B7B7B7'
        const colorBudget = project.budget ? '#73B959' : '#B7B7B7'
        const colorBeneficiaries = project.beneficiaryNum ? '#009ADB' : '#B7B7B7'
        const classBudget = (project.budget) ? 'font-bold' : 'font-normal'
        const classBeneficiaries = (project.beneficiaryNum) ? 'font-bold' : 'font-normal'

        return (
          <div
            key={project.projectCode}
            onClick={() => { handleProjectSelect(project) }}
            className={classNames(
              'px-5 py-5 border-b border-t border-b-grey-200 border-t-grey-200 cursor-pointer',
              'hover:border-b-brand-gold hover:border-t-brand-gold',
              { 'bg-grey-lightest': project.projectCode === activeProject?.projectCode }
            )}
          >
            {viewByBudget &&
              <div>
                <h3 className='uppercase text-sm mb-1'>Budget</h3>
                <p className={`text-5xl uppercase ${classBudget}`} style={{ color: colorBudget }}>{budget}</p>
              </div>
            }
            {!viewByBudget &&
              <div>
                <h3 className='uppercase text-sm mb-1'>Beneficiaries</h3>
                <p className={`text-5xl uppercase ${classBeneficiaries}`} style={{ color: colorBeneficiaries }}>{beneficiaries}</p>
              </div>
            }
            <p className='text-base mt-3 text-ellipsis whitespace-nowrap overflow-hidden'>{project.projectName}</p>
          </div>
        )
      })}
      {!viewProjects && actorsData.map((actor, index) => {
        // TODO - sort partner list items by budget or beneficiaries
        const budget = (actor.totalBudget) ? '$' + formatNumberCommas(actor.totalBudget) : 'Unspecified'
        const beneficiaries = (actor.totalBeneficiaries) ? formatNumberCommas(actor.totalBeneficiaries) : 'Unspecified'
        const maxWidth = (index < 10) ? 'max-w-[230px]' : 'max-w-[430px]'

        return (
          <div
            key={actor.actorCode}
            onClick={() => { handleActorSelect(actor) }}
            className={classNames(
              'px-5 py-5 border-b border-t border-b-grey-200 border-t-grey-200 cursor-pointer',
              'hover:border-b-brand-gold hover:border-t-brand-gold',
              { 'bg-grey-lightest': actor.actorCode === activeActor?.actorCode }
            )}
          >
            {viewByBudget &&
              <div className='flex items-center justify-between'>
                <div className={maxWidth}>
                  <h3 className='uppercase text-sm mb-2'>{budget} Total budget</h3>
                  <h2 className='text-lg font-bold text-black line-clamp-3'>{actor.name}</h2>
                </div>
                {index < 10 &&
                  <NetworkGraph
                    actorCode={actor.actorCode}
                    networksData={networksData}
                    actorsData={actorsData}
                    projectsData={projectsData}
                    width={132}
                    height={132}
                    type={'list'}
                  />
                }
              </div>
            }
            {!viewByBudget &&
              <div className='flex items-center justify-between'>
                <div className={maxWidth}>
                  <h3 className='uppercase text-sm mb-2'>{beneficiaries} Total beneficiaries</h3>
                  {/* TODO - account for unspecified beneficiaries */}
                  <h2 className='text-lg font-bold text-black line-clamp-3'>{actor.name}</h2>
                </div>
                {index < 10 &&
                  <NetworkGraph
                    actorCode={actor.actorCode}
                    networksData={networksData}
                    actorsData={actorsData}
                    projectsData={projectsData}
                    width={132}
                    height={132}
                    type={'list'}
                  />
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