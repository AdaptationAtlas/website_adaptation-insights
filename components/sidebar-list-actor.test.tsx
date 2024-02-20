import React, { useState, useEffect } from 'react'
import { ActorData, NetworkData } from '@/types/sidebar.types'
import NetworkGraph from './network-graph'
import classNames from 'classnames'
import Spinner from './ui/spinner'

type Props = {
  index: number
  actor: any
  handleActorSelect: any
  viewProjects: boolean
  viewByBudget: boolean
  activeActor: ActorData | null | undefined
  selectedCurrency: string
  selectedType: string | null | undefined
  networksData: NetworkData[]
}

const SidebarListActor = ({
  index,
  actor,
  handleActorSelect,
  viewProjects,
  viewByBudget,
  activeActor,
  networksData,
  selectedType
}: Props) => {
  // const [isGraphLoading, setIsGraphLoading] = useState(true) // State to track loading of network graphs
  const maxWidth = (index < 10) ? 'max-w-[230px]' : 'max-w-[430px]'
  const delay = (index + 2) * 100 // Calculate the delay for each list item
  const combinedKey = `${actor.actorCode}-budget-${viewByBudget}-type-${selectedType}` // Change the key to force a re-render

  // Handle the loading state of the graphs
  // useEffect(() => {
  //   setIsGraphLoading(true);
  //   // Set a timeout to change the loading state after 1500 milliseconds
  //   const timeout = setTimeout(() => {
  //     setIsGraphLoading(false);
  //   }, 1500);

  //   // Cleanup the timeout when component unmounts
  //   return () => clearTimeout(timeout);
  // }, [viewProjects, viewByBudget, selectedType]); // Change loading state when panel state changes

  return (
    <div
      key={combinedKey}
      onClick={() => { handleActorSelect(actor) }}
      className={classNames(
        'px-5 border-b border-b-grey-200 cursor-pointer',
        'hover:bg-grey-lightest transition duration-300',
        { 'bg-grey-lightest pointer-events-none': actor.actorCode === activeActor?.actorCode }
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {viewByBudget &&
        <div className='flex justify-between'>
          <div className={`${maxWidth} my-4`}>
            <h2 className='text-[16px] font-semibold text-black line-clamp-3'>{actor.name}</h2>
          </div>
          {index < 10 &&
            <div className='relative h-[132px] w-[132px]'>
              {/* <div className={`${isGraphLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}> */}
              <div>
                <NetworkGraph
                  actorCode={actor.actorCode}
                  networksData={networksData}
                  width={132}
                  height={132}
                  type={'list'}
                />
              </div>
              {/* <div className={`absolute top-0 left-0 h-full w-full bg-pink flex justify-center items-center transition-opacity duration-100 ${isGraphLoading ? 'opacity-100' : 'opacity-0'}`}><Spinner /></div> */}
            </div>
          }
        </div>
      }
      {!viewByBudget &&
        <div className='flex justify-between'>
          <div className={`${maxWidth} my-4`}>
            <h2 className='text-[17px] leading-tight font-semibold text-black line-clamp-3'>{actor.name}</h2>
          </div>
          {index < 10 &&
            <div className='relative h-[132px] w-[132px]'>
              {/* <div className={`${isGraphLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}> */}
              <div>
                <NetworkGraph
                  actorCode={actor.actorCode}
                  networksData={networksData}
                  width={132}
                  height={132}
                  type={'list'}
                />
              </div>
              {/* <div className={`absolute top-0 left-0 h-full w-full bg-pink flex justify-center items-center transition-opacity duration-100 ${isGraphLoading ? 'opacity-100' : 'opacity-0'}`}><Spinner /></div> */}
            </div>
          }
        </div>
      }
    </div>
  )
}
export default SidebarListActor