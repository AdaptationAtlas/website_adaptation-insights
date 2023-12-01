import Link from 'next/link'

type Props = {
  viewByBudget: boolean
  selectedCurrency: string
}

const MapLegend = ({ viewByBudget, selectedCurrency }: Props) => {
  const title = (viewByBudget) ? 'Project budget' : 'Project beneficiaries'
  const bucketColors = ['bg-bucket-100', 'bg-bucket-200', 'bg-bucket-300', 'bg-bucket-400', 'bg-bucket-500']

  return (
    <div className='absolute w-[250px] z-50 right-3 bottom-7 p-3 pb-2 bg-off-white'>
      <h1 className='text-sm uppercase mb-3'>{title}</h1>
      <div className='flex items-center justify-between mb-1'>
        {bucketColors && bucketColors.map((color) => (
          <i key={color} className={`${color} block w-1/5 h-3`}></i>
        ))}
      </div>
      {(viewByBudget && selectedCurrency && selectedCurrency === 'USD') &&
        <div className='flex items-center justify-between'>
          <p className='text-sm uppercase'>$4,600</p>
          <p className='text-sm uppercase'>$14,300,000,000</p>
        </div>
      }
      {(viewByBudget && selectedCurrency && selectedCurrency === 'EUR') &&
        <div className='flex items-center justify-between'>
          <p className='text-sm uppercase'>€4,193</p>
          <p className='text-sm uppercase'>€13,036,166,000</p>
        </div>
      }
      {!viewByBudget &&
        <div className='flex items-center justify-between'>
          <p className='text-sm uppercase'>10</p>
          <p className='text-sm uppercase'>270,000,000</p>
        </div>
      }
    </div>
  )
}
export default MapLegend