import React, { useState, useEffect, useRef } from 'react';
import { ActorData, NetworkData } from '@/types/sidebar.types';
import NetworkGraph from './network-graph';
import classNames from 'classnames';
import Spinner from './ui/spinner';
import { useIntersectionObserver } from '@/hooks/useInteractionObserver';

type Props = {
  index: number;
  actor: any;
  handleActorSelect: any;
  viewProjects: boolean;
  viewByBudget: boolean;
  activeActor: ActorData | null | undefined;
  selectedCurrency: string;
  selectedType: string | null | undefined;
  networksData: NetworkData[];
};

const SidebarListActor = ({
  index,
  actor,
  handleActorSelect,
  activeActor,
  networksData,
}: Props) => {
  const graphRef = useRef(null);
  const isVisible = useIntersectionObserver(graphRef);
  const [isGraphLoaded, setIsGraphLoaded] = useState(false); // State to keep track if the graph has been loaded
  const hasGraph = actor.projects.length > 0;
  const maxWidth = hasGraph ? 'max-w-[230px]' : 'max-w-[430px]';

  useEffect(() => {
    if (isVisible) {
      setIsGraphLoaded(true); // Once the graph becomes visible, we mark it as loaded
    }
  }, [isVisible]);

  return (
    <div
      onClick={() => handleActorSelect(actor)}
      className={classNames(
        'pl-5 border-b border-b-grey-200 cursor-pointer',
        'hover:bg-grey-lightest transition duration-300',
        { 'pr-5': !hasGraph }, // Add right padding to list items without a graph
        { 'bg-grey-lightest pointer-events-none': actor.actorCode === activeActor?.actorCode } // Highlight active actor
      )}
    >
      <div className='flex justify-between'>
        <div className={`${maxWidth} my-4`}>
          <h2 className='text-[16px] leading-tight font-semibold text-black line-clamp-3'>{actor.name}</h2>
        </div>
        {hasGraph && (
          <div ref={graphRef} className='relative h-[132px] w-[152px]'>
            {(isGraphLoaded || isVisible) && (
              // Render the graph if it's visible or has been loaded previously
              <NetworkGraph
                actorCode={actor.actorCode}
                networksData={networksData}
                width={152}
                height={132}
                type={'list'}
              />
            )}
            {!isGraphLoaded && !isVisible &&
              // Render the loading spinner if the graph hasn't loaded yet
              <Spinner className='absolute top-0 left-0 h-full w-full bg-pink flex justify-center items-center' />
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarListActor;
