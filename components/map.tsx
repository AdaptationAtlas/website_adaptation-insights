import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMapGL, { Source, Layer, Popup } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle' as const, // Explicitly setting the type to 'circle'
  paint: {
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      2, 1, // At zoom level 2, circles will have a radius of 2
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
  feature: any;  // Ideally, replace any with a more specific type
  longitude: number;
  latitude: number;
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
      const coords = hoveredFeature.geometry.coordinates;
      // Ensure the coordinates array has two numbers.
      if (coords.length >= 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        setHoverInfo({
          feature: hoveredFeature,
          longitude: coords[0],
          latitude: coords[1],
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

      <div></div>

      {/* {hoverInfo && (
        // <div className='h-[200px] w-[200px] bg-pink-400 absolute top-10 right-10 z-50'>{hoverInfo.feature.properties.projectName}</div>
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
          closeOnClick={false}
          anchor="top"
        >
          {hoverInfo.feature.properties.projectName}
        </Popup>
      )} */}
    </ReactMapGL>
  );
}

export default Map