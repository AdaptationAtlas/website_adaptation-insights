import { ActorData, ProjectData, NetworkData } from '@/types/sidebar.types'
import React, { useRef, useEffect, memo, useMemo, useCallback, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { find, cloneDeep } from 'lodash'
import cn from 'classnames'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { getProjectName, getActorName } from '@/utils/data.utils'
import { useMediaQuery } from '@/lib/hooks'

type Props = {
  actorCode: string
  networksData: NetworkData[]
  width: number
  height: number
  type: string
  actorsRawData?: ActorData[] // Optional
  projectsRawData?: ProjectData[] // Optional
  detailPanelRef?: React.RefObject<HTMLDivElement> // Optional
}

const NetworkGraph = memo(({ actorCode, networksData, actorsRawData, projectsRawData, width, height, type, detailPanelRef }: Props) => {

  // TODO - add a hover state to the nodes - update border color

  // Node color
  const rootColor = '#387B94'
  const actorColor = '#EC5A47'
  const projectColor = '#FFC84F'
  // Node size
  const rootSize = type === 'list' ? 4.5 : 13
  const actorSize = type === 'list' ? 2.5 : 5
  const projectSize = type === 'list' ? 3.5 : 7
  // Link distance
  const rootLink = type === 'list' ? 10 : 30
  const actorLink = type === 'list' ? 5 : 10
  // Charge strength
  const rootCharge = type === 'list' ? -7 : -30
  const actorCharge = type === 'list' ? -7 : -30
  const projectCharge = type === 'list' ? -10 : -40

  // Other variables
  const cooldown = (type === 'detail') ? 15000 : 2000
  const displayTooltip = (type === 'detail') ? true : false
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [tooltipContent, setTooltipContent] = useState({ title: '', subtitle: '', group: '', visible: false })
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipHeight, setTooltipHeight] = useState(0)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const isTablet = useMediaQuery(768)

  const handleNodeClick = useCallback((node: any) => {
    // Create a new URLSearchParams object based on the current search params
    const params = new URLSearchParams(searchParams)

    if (node.group === 'project') {
      params.delete('partner')
      params.set('project', node.id)
      params.set('view', 'projects')
    } else {
      params.delete('project')
      params.set('partner', node.id)
      params.set('view', 'partners')
    }

    // Construct the new URL string
    const newUrl = `${pathname}?${params.toString()}`

    // Push the updated URL to the router
    router.push(newUrl)
  }, [router, pathname, searchParams])

  // Handle node hover
  const handleNodeHover = useCallback((node: any) => {
    if (node) {
      const headerTitle = (node.group === 'project') ? getProjectName(node.id, projectsRawData) : getActorName(node.id, actorsRawData)
      const subheadTitle = (node.group === 'project') ? 'Project' : 'Partner'
      setTooltipContent({ title: headerTitle, subtitle: subheadTitle, group: node.group, visible: true })
    } else {
      setTooltipContent({ ...tooltipContent, visible: false })
    }
  }, [actorsRawData, projectsRawData, tooltipContent])


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
    const network = getNetwork(actorCode)
    return cloneDeep(network?.network)
  }, [actorCode, networksData])

  const forceGraphRef = useRef() // Ref to access the force graph instance

  useEffect(() => {
    if (forceGraphRef.current) {
      // Directly cast forceGraphRef.current to 'any' to access d3Force and zoomToFit
      const fg = forceGraphRef.current as any

      // Change the link distance based on the group
      fg.d3Force('link').distance((link: any) => {
        const type = link.type
        if (type === 'actorProject') {
          return actorLink
        } else if (type === 'rootProject') {
          return rootLink
        }
      })

      // Change the link distance based on the group
      fg.d3Force('charge').strength((charge: any) => {
        const source = charge.group
        if (source === 'project') {
          return projectCharge
        } else if (source === 'actor') {
          return actorCharge
        } else {
          return rootCharge
        }
      })

      // Set zoom to fit on list item thumbnails
      // if (type === 'list' && forceGraphRef.current) {
      //   // setTimeout(() => fg.zoomToFit(250, 21), 1000) // Adjust the numbers as needed
      // }
    }

  }, [type, forceGraphRef, actorLink, rootLink, projectCharge, actorCharge, rootCharge]) // Run only once after initial render

  // Measure tooltip height
  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipHeight = tooltipRef.current.offsetHeight
      // Save the tooltip height in the state or a ref
      setTooltipHeight(tooltipHeight)
    }
  }, [tooltipContent])

  // Handle mouse move logic
  useEffect(() => {
    if (isTablet) {
      const handleMouseMove = (event: any) => {
        const offsetX = -515

        // Offset Y to position the tooltip above the cursor
        // Use the tooltipHeight to adjust the position above the cursor
        const offsetY = -70 - tooltipHeight // Adjust the base offset as needed

        const scrollX = detailPanelRef?.current?.scrollLeft
        const scrollY = detailPanelRef?.current?.scrollTop

        const relativeX = event.clientX + scrollX + offsetX
        const relativeY = event.clientY + scrollY + offsetY

        setTooltipPosition({ x: relativeX, y: relativeY })
      }

      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [tooltipContent.visible, detailPanelRef, tooltipHeight, isTablet]) // Add tooltipHeight as a dependency





  return (
    <div className='relative flex justify-center pointer-events-none md:pointer-events-auto'>
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

