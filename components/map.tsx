import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ReactMapGL, { Source, Layer, Popup } from 'react-map-gl'
import type { CircleLayer } from 'react-map-gl'
import { currentYear } from '@/utils/time'
import 'mapbox-gl/dist/mapbox-gl.css'

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle' as const, // Explicitly setting the type to 'circle'
  paint: {
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      2, 2, // At zoom level 2, circles will have a radius of 2
      4, 3,
      8, 6, // At zoom level 8, circles will have a radius of 6
    ],
    'circle-color': [
      'case',
      ['==', ['get', 'budgetEuroLog'], null], // Check if budgetEuroLog is null
      '#636363', // Color for null values
      // Interpolation for non-null values
      ['interpolate',
        ['linear'],
        ['get', 'budgetEuroLog'],
        1, '#73B959',
        10, '#009ADB',
      ]
    ],
  },
};

type HoverInfo = {
  feature: any // Ideally, replace any with a more specific type
  longitude: number
  latitude: number
  dateEnd: number
  ongoing: boolean
  projectScale: string | null
  numLocations: string | null
} | null;

function Map() {
  const [locationData, setLocationData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      'data/locations_jittered_systematic.geojson'
    )
      .then(resp => resp.json())
      .then(json => setLocationData(json))
      .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    return locationData;
  }, [locationData]);

  const onHover = useCallback((event: any) => {
    const features = event.features;
    // Find the first feature within the "point" layer.
    const hoveredFeature = features && features.find((f: any) => f.layer.id === 'point');
    if (hoveredFeature && hoveredFeature.geometry && hoveredFeature.geometry.type === 'Point') {
      const coords = hoveredFeature.geometry.coordinates
      const dateEnd = hoveredFeature.properties.dateEnd
      const ongoing = (dateEnd && dateEnd <= currentYear) ? true : false
      const locations = hoveredFeature.properties.projectNumLocations
      const projectScale = (hoveredFeature.properties.projectScale) ? hoveredFeature.properties.projectScale + ' Scale' : null
      const numLocations = (locations && locations > 1) ? locations + ' Locations' : (locations && locations === 1) ? '1 Location' : null
      // Ensure the coordinates array has two numbers.
      if (coords.length >= 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        setHoverInfo({
          feature: hoveredFeature,
          longitude: coords[0],
          latitude: coords[1],
          dateEnd: dateEnd,
          ongoing: ongoing,
          projectScale: projectScale,
          numLocations: numLocations,
        });
      }
    } else {
      setHoverInfo(null);
    }
  }, []);


  return (
    <ReactMapGL
      mapboxAccessToken="pk.eyJ1IjoiY2dpYXItY2lhdCIsImEiOiJjbG82MzBiM3QwMG05Mm5tcmE1cm9pbjA4In0.zTT62DYwEJt08N-Q_lmb_A"
      initialViewState={{
        longitude: 20,
        latitude: 0,
        zoom: 2.8
      }}
      minZoom={2}
      maxZoom={8}
      onMouseMove={onHover}
      interactiveLayerIds={['point']}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/cgiar-ciat/clo632ouh009401rf3rgihruy"
    >
      {data && (
        <Source id="projects" type="geojson" data={data}>
          <Layer
            {...layerStyle}
          />
        </Source>
      )}

      {hoverInfo && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          offset={15}
          closeButton={false}
          closeOnClick={false}
          anchor={"bottom"}
          className='min-w-[200px]'
        >
          <div className="pt-1 px-2">
            {hoverInfo.dateEnd && hoverInfo.ongoing && <p className='text-xs font-medium text-brand-blue mb-2'>Ongoing</p>}
            {hoverInfo.dateEnd && !hoverInfo.ongoing && <p className='text-xs font-medium text-brand-burgundy mb-2'>Completed</p>}
            <h1 className='text-base font-medium mb-3'>{hoverInfo.feature.properties.projectName}</h1>
            {(hoverInfo.projectScale || hoverInfo.numLocations) &&
              <div className='flex justify-between'>
                {hoverInfo.projectScale && <p className='text-xs text-grey-300 font-medium'>{hoverInfo.projectScale}</p>}
                {hoverInfo.numLocations && <p className='text-xs text-grey-300 font-medium'>{hoverInfo.numLocations}</p>}
              </div>
            }
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map