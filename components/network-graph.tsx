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
  const rootSize = 12
  const actorSize = 4
  const projectSize = 6
  const enableDrag = (type === 'detail') ? true : false
  const cooldown = (type === 'detail') ? 15000 : 15000

  // Custom node canvas object to style nodes
  const nodeCanvasObject = (node: any, ctx: any) => {
    const size = (node.group === "root") ? rootSize : (node.group === "actor") ? actorSize : projectSize;

    // Draw node
    ctx.beginPath();
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
    ctx.fillStyle = (node.group === "root") ? rootColor : (node.group === "actor") ? actorColor : projectColor;
    ctx.fill();

    // Draw stroke
    ctx.lineWidth = 1; // Stroke width
    ctx.strokeStyle = 'white';
    ctx.stroke();
  };

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
    if (forceGraphRef.current) {
      // Directly cast forceGraphRef.current to 'any' to access d3Force and zoomToFit
      const fg = forceGraphRef.current as any;

      // Change the link distance based on the group
      fg.d3Force('link').distance((link: any) => {
        const source = link.source.group
        // const target = link.target.group
        if (source === 'root') {
          return 25
        } else if (source === 'actor') {
          return 10
        } else {
          return 20
        }
      });

      // Set zoom to fit on list item thumbnails
      if (type === 'list' && forceGraphRef.current) {
        setTimeout(() => fg.zoomToFit(400, 20), 500); // Adjust the numbers as needed
      }
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
        enableNodeDrag={false}
        cooldownTime={cooldown}
        nodeCanvasObject={nodeCanvasObject}
        // nodeVal={(node) => {
        //   const size = (node.group === "root") ? rootSize : (node.group === "actor") ? actorSize : projectSize
        //   return size
        // }}
        // nodeColor={(node) => {
        //   const color = (node.group === "root") ? rootColor : (node.group === "actor") ? actorColor : projectColor
        //   return color
        // }}
      />
    </div>
  )
})

// Set the display name for the component
NetworkGraph.displayName = 'NetworkGraph';

export default NetworkGraph;

// const width = 300;
// const height = 300;

// // nodes
// const colorField = "group";
// const color = d3
//   .scaleOrdinal()
//   .domain(["root", "project", "actor"])
//   .range(["#397B94", "#F2C14D", "#EC5948"]);
// const radiusField = "group";
// const radius = (d) => {
//   if (d == "root") {
//     return 15;
//   }
//   if (d == "project") {
//     return 10;
//   } else return 5;
// };
// const title = (d) => {
//   if (["root", "actor"].includes(d.group)) {
//     // actors
//     return `${d.name} (${d.code})\n\n- Actor Type: ${d.type}\n- Actor Scope: ${d.scope}`;
//   } else {
//     // projects
//     return `${d.name} (${d.projectCode})\n\n- Project Scale: ${
//       d.scale
//     }\n- Project Budget: ${d3.format("$.3s")(d.budget)} ${d.budgetCurrency}`;
//   }
// };

// // links
// const distance = (d) => {
//   if (d.type == "rootProject") return 80;
//   else if (d.type == "actorProject" && d.sourceConnections > 1) {
//     return 30;
//   } else {
//     return 1;
//   }
// };
// const strength = (d) => {
//   if (d.type == "rootProject") return 0.2;
//   else if (d.type == "actorProject" && d.sourceConnections > 1) {
//     return 0.2;
//   } else {
//     return 0.3;
//   }
// };
