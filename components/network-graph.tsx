import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import React, { useRef, useEffect, memo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { find, cloneDeep } from 'lodash'

type Props = {
  actorCode: string
  actorsData: ActorData[]
  projectsData: ProjectData[]
  networksData: NetworkData[]
  width: number
  height: number
  type: string
}

const NetworkGraph = memo(({ actorCode, networksData, actorsData, projectsData, width, height, type }: Props) => {
  
  const rootColor = "#387B94"
  const actorColor = "#EC5A47"
  const projectColor = "#FFC84F"
  const rootSize = 6
  const actorSize = 1
  const projectSize = 3
  const enableDrag = (type === 'detail') ? true : false
  const cooldown = (type === 'detail') ? 15000 : 15000

  // Utility function to look up project based on projectCode
  const getNetwork = (actorCode: string) => {
    const network = find(networksData, { 'actorCode': actorCode });
    return network;
  }

  // Get the network based on the actor code prop
  const networkData = getNetwork(actorCode);
  const data = cloneDeep(networkData?.network); // Create a deep copy of the data

  const forceGraphRef = useRef(); // Ref to access the force graph instance

  // TODO - add loading animation to actor list thumbnails
  useEffect(() => {
    if (type === 'list' && forceGraphRef.current) {
      const fg = forceGraphRef.current as any; // Directly cast forceGraphRef.current to 'any' to access zoomToFit
      setTimeout(() => fg.zoomToFit(400, 20), 500); // Adjust the numbers as needed
    }
  }, [type, forceGraphRef]); // Run only once after initial render

  return (
    <div className="relative">
      <ForceGraph2D
        ref={forceGraphRef}
        graphData={data}
        width={width}
        height={height}
        enablePanInteraction={false}
        enableZoomInteraction={false}
        enableNodeDrag={enableDrag}
        cooldownTime={cooldown}
        nodeVal={(node) => {
          const size = (node.group === "root") ? rootSize : (node.group === "actor") ? actorSize : projectSize
          return size
        }}
        nodeColor={(node) => {
          const color = (node.group === "root") ? rootColor : (node.group === "actor") ? actorColor : projectColor
          return color
        }}
      />
    </div>
  )
})

// Set the display name for the component
NetworkGraph.displayName = 'NetworkGraph';

export default NetworkGraph;