import React, { ReactNode, useState } from 'react';
import { formatNumberCommas } from '@/lib/utils'
import Switch from '@/components/ui/switch'

type Props = {
  page: string;
  slug: string;
};

const testData = [
  {
    'id': 0,
    'title': 'Farmers’ Organizations for Africa, Caribbean and Pacific',
    'beneficiaries': 52000000,
    'budget': 5820000
  },
  {
    'id': 1,
    'title': 'Forest and Farm Facility Phase 1&2',
    'beneficiaries': 40000000,
    'budget': 96500000
  },
  {
    'id': 2,
    'title': 'Sustainable management of dryland landscapes in Burkina Faso',
    'beneficiaries': 300000,
    'budget': 6430000
  },
  {
    'id': 3,
    'title': 'Prepared for the impact of climate change',
    'beneficiaries': 6300,
    'budget': 27000
  },
  {
    'id': 4,
    'title': 'L’Observatoire de l’Agroecologie au Maroc',
    'beneficiaries': null,
    'budget': 6400
  },
  {
    'id': 5,
    'title': 'PA categories V and VI as landscape mechanisms for enhancing biodiversity in agricultural land, ecological connectivity and REDD+ implementation',
    'beneficiaries': 38000,
    'budget': 42700000
  }
]

const SidebarPanel = ({ page, slug }: Props) => {
  const [viewByBudget, setViewByBudget] = useState(false)
  return (
    <div className='w-[415px] min-h-screen bg-off-white border-r border-grey-100'>
      <header className='p-5'>
        <p className='uppercase text-sm'>Explore {page}</p>
        <Switch
          viewByBudget={viewByBudget}
          setViewByBudget={setViewByBudget}
          label=''
          options={['Partners', 'Projects']}
        />
        <p className='text-lg mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. aliqua. Ut enim ad minim veniam.</p>
        <Switch
          viewByBudget={viewByBudget}
          setViewByBudget={setViewByBudget}
          label='View projects by'
          options={['Beneficiaries', 'Budget']}
        />
        <span className='uppercase text-sm'>During</span>
      </header>
      <div>
        <div className='flex justify-between px-5 py-5'>
          <p className='uppercase'>All countries</p>
          <p className='uppercase'>200 of 200 projects</p>
        </div>
        <div className='flex flex-col overflow-x-auto'>
          {testData.map(project => {
            return (
              <div key={project.id} className='px-5 my-5'>
                <h3 className='uppercase text-xs'>Project budget</h3>
                <p className='text-5xl font-bold'>${formatNumberCommas(project.budget)}</p>
                <p className='text-sm'>{project.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SidebarPanel