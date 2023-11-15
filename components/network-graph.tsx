import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

type Props = {
  actorsData: ActorData[]
  projectsData: ProjectData[]
  networkData: NetworkData
  width: number
  height: number
}

function NetworkGraph({ networkData, actorsData, projectsData, width, height }: Props) {
  const data = networkData.network
  const rootColor = "#387B94"
  const actorColor = "#EC5A47"
  const projectColor = "#FFC84F"
  const rootSize = 6
  const actorSize = 1
  const projectSize = 3

  return (
    <div className="relative">
      <ForceGraph2D
        graphData={data}
        width={width}
        height={height}
        enablePanInteraction={false}
        enableZoomInteraction={false}
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
  );
}

export default NetworkGraph;