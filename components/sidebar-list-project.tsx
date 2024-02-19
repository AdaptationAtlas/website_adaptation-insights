import { formatNumberCommas } from '@/utils/numbers.utils'
import { ProjectData } from '@/types/sidebar.types'
import { colorRange, generateLogarithmicBuckets } from '@/utils/color.utils'
import { minBy, maxBy } from 'lodash'
import classNames from 'classnames'
import Info from './ui/info'

type Props = {
  project: any
  projectsData: ProjectData[]
  handleProjectSelect: any
  viewByBudget: boolean
  activeProject: ProjectData | null | undefined
  selectedCurrency: string
  selectedType: string | null | undefined
  selectedCountry: string | null | undefined
  selectedYear: number | null | undefined
}

const SidebarListProject = ({
  project,
  projectsData,
  handleProjectSelect,
  viewByBudget,
  activeProject,
  selectedCurrency,
  selectedType,
  selectedCountry,
  selectedYear,
}: Props) => {

  // Assuming projectsData is an array of projects
  const maxBudget = maxBy(projectsData, 'budget')?.budget || 1 // Ensure non-zero
  const minBudget = minBy(projectsData, p => p.budget || Infinity)?.budget || 1

  const maxBeneficiaries = maxBy(projectsData, 'beneficiaryNum')?.beneficiaryNum || 1
  const minBeneficiaries = minBy(projectsData, p => p.beneficiaryNum || Infinity)?.beneficiaryNum || 1

  // Generate buckets
  const budgetBuckets = generateLogarithmicBuckets(minBudget, maxBudget, 5)
  const beneficiariesBuckets = generateLogarithmicBuckets(minBeneficiaries, maxBeneficiaries, 5)
  const bucketColors = ['#73BA5A', '#6EB17C', '#62A99D', '#4BA2BD', '#019BDC']

  // Calculate budget and beneficiary figures
  const budgetCurrency = (selectedCurrency === 'EUR') ? project.budgetEUR : project.budgetUSD
  const currencySymbol = (selectedCurrency === 'EUR') ? '€' : '$'
  const budget = (budgetCurrency && currencySymbol) ? currencySymbol + formatNumberCommas(Math.round(budgetCurrency)) : 'Unspecified'
  const beneficiaries = (project.beneficiaryNum) ? formatNumberCommas(Math.round(project.beneficiaryNum)) : 'Unspecified'
  const colorBudget = project.budget ? colorRange(project.budget, budgetBuckets, bucketColors) : '#B7B7B7'
  const colorBeneficiaries = project.beneficiaryNum ? colorRange(project.beneficiaryNum, beneficiariesBuckets, bucketColors) : '#B7B7B7'
  const classBudget = (project.budget) ? 'font-bold' : 'font-normal'
  const classBeneficiaries = (project.beneficiaryNum) ? 'font-bold' : 'font-normal'
  const beneficiaryFlagMultiple = project.beneficiaryFlagMultiple

  // const delay = (index + 2) * 100 // Calculate the delay for each list item
  // Change the key to force a re-render
  const combinedKey = `${project.projectCode}-budget-${viewByBudget}-type-${selectedType}-country-${selectedCountry}-year-${selectedYear}`

  return (
    <div
      key={combinedKey}
      onClick={() => { handleProjectSelect(project) }}
      className={classNames(
        'px-5 py-3 border-b border-b-grey-200 cursor-pointer',
        'hover:bg-grey-lightest transition duration-300',
        { 'bg-grey-lightest pointer-events-none': project.projectCode === activeProject?.projectCode }
      )}
      // style={{ animationDelay: `${delay}ms` }}
    >
      {viewByBudget &&
        <div>
          <h3 className='uppercase text-sm'>Budget</h3>
          <p className={`text-[40px] md:text-[45px] uppercase leading-tight font-semibold ${classBudget}`} style={{ color: colorBudget }}>{budget}</p>
        </div>
      }
      {!viewByBudget &&
        <div>
          <div className='flex items-center'>
            <h3 className='uppercase text-sm'>Beneficiaries</h3>
            {beneficiaryFlagMultiple &&
              <Info
                tooltipContent='Multiple people may make up a single beneficiary in this project.'
              />
            }
          </div>
          <p className={`text-[40px] md:text-[45px] uppercase leading-tight font-semibold ${classBeneficiaries}`} style={{ color: colorBeneficiaries }}>{beneficiaries}</p>
        </div>
      }
      <p className='text-base mt-1 text-ellipsis whitespace-nowrap overflow-hidden'>{project.projectName}</p>
    </div>
  )
}
export default SidebarListProject