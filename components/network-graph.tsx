import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import React, { useRef, useEffect, memo, useMemo, useCallback, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { find, cloneDeep } from 'lodash'
import cn from 'classnames'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { getProjectName, getActorName } from '@/utils/data-helpers'

type Props = {
  actorCode: string
  networksData: NetworkData[]
  actorsRawData: ActorData[]
  projectsRawData: ProjectData[]
  width: number
  height: number
  type: string
  detailPanelRef: React.RefObject<HTMLDivElement>
}

const NetworkGraph = memo(({ actorCode, networksData, actorsRawData, projectsRawData, width, height, type, detailPanelRef }: Props) => {

  // TODO - add a hover state to the nodes - update border color

  const rootColor = '#387B94'
  const actorColor = '#EC5A47'
  const projectColor = '#FFC84F'
  const rootSize = 12
  const actorSize = 4
  const projectSize = 6
  const cooldown = (type === 'detail') ? 15000 : 1000
  const displayTooltip = (type === 'detail') ? true : false
  // const tooltipRef = useRef<any>(null)
  // const tooltipHeaderRef = useRef<any>(null)
  // const tooltipSubheadRef = useRef<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [tooltipContent, setTooltipContent] = useState({ title: '', subtitle: '', group: '', visible: false });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipHeight, setTooltipHeight] = useState(0)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleNodeClick = useCallback((node: any) => {
    router.push(pathname + '?' + createQueryString('project', node.id));
  }, [router, pathname, createQueryString]);

  // Handle node hover
  const handleNodeHover = useCallback((node: any) => {
    console.log(node)
    if (node) {
      const headerTitle = (node.group === 'project') ? getProjectName(node.id, projectsRawData) : getActorName(node.id, actorsRawData)
      const subheadTitle = (node.group === 'project') ? 'Project' : 'Partner';
      setTooltipContent({ title: headerTitle, subtitle: subheadTitle, group: node.group, visible: true });
    } else {
      setTooltipContent({ ...tooltipContent, visible: false });
    }
  }, [actorsRawData, projectsRawData, tooltipContent]);


  // Custom node canvas object to style nodes
  const nodeCanvasObject = (node: any, ctx: any) => {
    const size = (node.group === 'root') ? rootSize : (node.group === 'actor') ? actorSize : projectSize

    // Draw node
    ctx.beginPath()
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
    ctx.fillStyle = (node.group === 'root') ? rootColor : (node.group === 'actor') ? actorColor : projectColor
    ctx.fill()

    // Draw stroke
    ctx.lineWidth = 1 // Stroke width
    ctx.strokeStyle = 'white'
    ctx.stroke()
  }

  const processedNetworkData = useMemo(() => {
    // Utility function to look up project based on projectCode
    const getNetwork = (actorCode: string) => {
      const network = find(networksData, { 'actorCode': actorCode })
      return network
    }
    const network = getNetwork(actorCode);
    return cloneDeep(network?.network);
  }, [actorCode, networksData]);

  const forceGraphRef = useRef() // Ref to access the force graph instance

  // TODO - add loading animation to actor list thumbnails
  useEffect(() => {
    if (forceGraphRef.current) {
      // Directly cast forceGraphRef.current to 'any' to access d3Force and zoomToFit
      const fg = forceGraphRef.current as any

      // Change the link distance based on the group
      fg.d3Force('link').distance((link: any) => {
        const source = link.source.group
        if (source === 'root') {
          return 25
        } else if (source === 'actor') {
          return 10
        } else {
          return 20
        }
      })

      // Set zoom to fit on list item thumbnails
      if (type === 'list' && forceGraphRef.current) {
        setTimeout(() => fg.zoomToFit(250, 21), 1000) // Adjust the numbers as needed
      }
    }

  }, [type, forceGraphRef]) // Run only once after initial render

  // Measure tooltip height
  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipHeight = tooltipRef.current.offsetHeight;
      // Save the tooltip height in the state or a ref
      setTooltipHeight(tooltipHeight);
    }
  }, [tooltipContent]);

  // Handle mouse move logic
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const offsetX = -515; // Adjust as needed
  
        // Offset Y to position the tooltip above the cursor
        // Use the tooltipHeight to adjust the position above the cursor
        const offsetY = -70 - tooltipHeight; // Adjust the base offset as needed
  
        const scrollX = detailPanelRef?.current?.scrollLeft;
        const scrollY = detailPanelRef?.current?.scrollTop;
  
        const relativeX = event.clientX + scrollX + offsetX;
        const relativeY = event.clientY + scrollY + offsetY;
  
        setTooltipPosition({ x: relativeX, y: relativeY });
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [tooltipContent.visible, detailPanelRef, tooltipHeight]); // Add tooltipHeight as a dependency
  




  return (
    <div className='relative'>
      <ForceGraph2D
        ref={forceGraphRef}
        graphData={processedNetworkData}
        width={width}
        height={height}
        enablePanInteraction={false}
        enableZoomInteraction={false}
        enableNodeDrag={false}
        cooldownTime={cooldown}
        nodeCanvasObject={nodeCanvasObject}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
      />

      {displayTooltip && (
        <div
          className={cn(
            'fixed z-[999] w-[200px] p-4 rounded-[3px] pointer-events-none bg-white border shadow',
            'transition-opacity duration-300',
            { 'opacity-0 delay-300': !tooltipContent.visible, 'opacity-100': tooltipContent.visible }
          )}
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
          ref={tooltipRef}
        >
          <h2 className={cn(
            'text-xs font-medium mb-2',
            {
              'text-brand-teal': tooltipContent.group === 'root',
              'text-brand-dark-gold': tooltipContent.group === 'project',
              'text-brand-dark-red': tooltipContent.group === 'actor'
            }
          )}>{tooltipContent.subtitle}</h2>
          <h1 className='text-base font-medium'>{tooltipContent.title}</h1>
        </div>
      )}

    </div>
  )
})

// Set the display name for the component
NetworkGraph.displayName = 'NetworkGraph'

export default NetworkGraph

