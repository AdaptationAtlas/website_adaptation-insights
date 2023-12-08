import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import React, { useRef, useEffect, memo, useCallback } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { find, cloneDeep } from 'lodash'
import cn from 'classnames'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Props = {
  actorCode: string
  networksData: NetworkData[]
  actorsRawData: ActorData[]
  projectsRawData: ProjectData[]
  width: number
  height: number
  type: string
}

const NetworkGraph = memo(({ actorCode, networksData, actorsRawData, projectsRawData, width, height, type }: Props) => {

  // TODO - only apply the tooltip on detail panel graphs, not list graphs
  // TODO - add a hover state to the nodes - update border color

  const rootColor = '#387B94'
  const actorColor = '#EC5A47'
  const projectColor = '#FFC84F'
  const rootSize = 12
  const actorSize = 4
  const projectSize = 6
  const cooldown = (type === 'detail') ? 15000 : 1000
  const displayTooltip = (type === 'detail') ? true : false
  const tooltipRef = useRef<any>(null)
  const tooltipHeaderRef = useRef<any>(null)
  const tooltipSubheadRef = useRef<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

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

  // TODO - move this to utils
  const getProjectName = (projectCode: string) => {
    const project = find(projectsRawData, { 'projectCode': projectCode })
    return project?.projectName;
  }

  // TODO - move this to utils
  const getActorName = (actorCode: string) => {
    const actor = find(actorsRawData, { 'actorCode': actorCode })
    return actor?.name;
  }

  const handleNodeClick = (node: any) => {
    // Use nextjs router to handle node navigation
    router.push(pathname + '?' + createQueryString('project', node.id))
  }

  // Handle node hover
  const handleNodeHover = (node: any) => {
    if (node) {
      const headerTitle = (node.group === 'project') ? getProjectName(node.id) : getActorName(node.id)
      const subheadTitle = (node.group === 'project') ? 'Project' : 'Partner'
      const subheadColor = (node.group === 'project') ? '#DFA524' : '#D3412A'
      // Update tooltip content and styling
      if (tooltipHeaderRef.current) {
        tooltipHeaderRef.current.textContent = `${headerTitle}`;
      }
      if (tooltipSubheadRef.current) {
        tooltipSubheadRef.current.textContent = `${subheadTitle}`;
        tooltipSubheadRef.current.style.color = subheadColor;
      }
      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = 1;
      }
    } else if (tooltipRef.current) {
      tooltipRef.current.style.opacity = 0
    }
  }


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

  // Utility function to look up project based on projectCode
  const getNetwork = (actorCode: string) => {
    const network = find(networksData, { 'actorCode': actorCode })
    return network
  }

  // Get the network based on the actor code prop
  const networkData = getNetwork(actorCode)
  const data = cloneDeep(networkData?.network) // Create a deep copy of the data

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

  // Tooltip follows the cursor
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if (tooltipRef.current) {
        const offsetX = -530
        const offsetY = -300
        tooltipRef.current.style.left = `${event.clientX + offsetX}px`
        tooltipRef.current.style.top = `${event.clientY + offsetY}px`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className='relative'>
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
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
      />
      {displayTooltip &&
        <div ref={tooltipRef}
          className={cn(
            'absolute z-[999] w-[200px] p-4 rounded-[3px] pointer-events-none bg-white border shadow opacity-0',
            'transition-opacity duration-150 delay-150'
          )}>
            <h2 ref={tooltipSubheadRef} className='text-xs font-medium text-brand-burgundy mb-2'></h2>
            <h1 ref={tooltipHeaderRef} className='text-base font-medium'></h1>
        </div>
      }
    </div>
  )
})

// Set the display name for the component
NetworkGraph.displayName = 'NetworkGraph'

export default NetworkGraph

