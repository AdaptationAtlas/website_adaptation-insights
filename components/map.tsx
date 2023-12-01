import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ReactMapGL, { Source, Layer, Popup } from 'react-map-gl'
import type { CircleLayer } from 'react-map-gl'
import { currentYear } from '@/utils/time'
import { minBy, maxBy } from 'lodash'
import { GeoJsonFeatureCollection } from '@/types/map.types'
import 'mapbox-gl/dist/mapbox-gl.css'

type Props = {
  viewByBudget: boolean
  selectedCountry: string | null | undefined
  selectedYear: number | null | undefined
}

type HoverInfo = {
  feature: any // Ideally, replace any with a more specific type
  longitude: number
  latitude: number
  dateEnd: number
  ongoing: boolean
  projectScale: string | null
  numLocations: string | null
} | null;

function Map({
  viewByBudget,
  selectedCountry,
  selectedYear,
}: Props) {
  const [locationData, setLocationData] = useState<GeoJsonFeatureCollection | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);
  const [minBudgetLog, setMinBudgetLog] = useState<number | undefined | null>(null);
  const [maxBudgetLog, setMaxBudgetLog] = useState<number | undefined | null>(null);
  const [minBeneficiariesLog, setMinBeneficiariesLog] = useState<number | undefined | null>(null);
  const [maxBeneficiariesLog, setMaxBeneficiariesLog] = useState<number | undefined | null>(null);

  useEffect(() => {
    /* global fetch */
    fetch('data/locations_jitter_variable.geojson')
      .then(resp => resp.json())
      .then((json: GeoJsonFeatureCollection) => {
        setLocationData(json);

        // Assuming budgetEuroLog and beneficiariesLog are directly inside properties
        const features = json.features;
        const minBudget = minBy(features, feature => feature.properties.budgetEURLog)?.properties.budgetEURLog;
        const maxBudget = maxBy(features, feature => feature.properties.budgetEURLog)?.properties.budgetEURLog;
        const minBeneficiaries = minBy(features, feature => feature.properties.beneficiaryNumLog)?.properties.beneficiaryNumLog;
        const maxBeneficiaries = maxBy(features, feature => feature.properties.beneficiaryNumLog)?.properties.beneficiaryNumLog;

        setMinBudgetLog(minBudget);
        setMaxBudgetLog(maxBudget);
        setMinBeneficiariesLog(minBeneficiaries);
        setMaxBeneficiariesLog(maxBeneficiaries);
      })
      .catch(err => console.error('Could not load data', err));
  }, []);

  const data = useMemo(() => {
    return locationData;
  }, [locationData]);

  const layerStyle: CircleLayer = useMemo(() => {
    // Determine which fields and corresponding min/max values to use based on viewByBudget
    const dataField = viewByBudget ? 'budgetEURLog' : 'beneficiaryNumLog';
    const minDataValue = viewByBudget ? minBudgetLog : minBeneficiariesLog;
    const maxDataValue = viewByBudget ? maxBudgetLog : maxBeneficiariesLog;

    const bucketColors = ['#94D851', '#74CB6C', '#31C6AD', '#29B5D4', '#2290DF']

    // Function to generate the steps for the 'step' expression in Mapbox
    const generateColorSteps = (minValue: number | null | undefined, maxValue: number | null | undefined, colors: string[]) => {
      const steps = [];

      if (minValue && maxValue) {
        const numSteps = colors.length;
        const stepSize = (maxValue - minValue) / (numSteps - 1);

        for (let i = 0; i < numSteps; i++) {
          const value = minValue + stepSize * i;
          steps.push(value, colors[i]);
        }
      }

      return steps;
    };

    const colorSteps = generateColorSteps(minDataValue, maxDataValue, bucketColors);

    return {
      id: 'point',
      type: 'circle' as const,
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['zoom'], // Interpolate the circle radius based on zoom level
          2, // Zoom level 2
          [
            'case',
            // Neither country nor year selected
            ['all',
              ['!', ['to-boolean', selectedCountry]], // selectedCountry is null or undefined
              ["==", selectedYear, 0], // selectedCountry matches the country property
            ], 2,

            // Both country and year selected
            [
              'all',
              // ['!', ['to-boolean', selectedCountry]], // Country selected
              // ["!=", selectedYear, 0], // selectedYear is not 0 (or null)
              ["==", ["typeof", ["get", "dateStart"]], "number"],
              ["==", ["typeof", ["get", "dateEnd"]], "number"],
              ['>=', ['get', 'dateStart'], selectedYear],
              ['<=', ['get', 'dateEnd'], selectedYear],
              ['!=', ['get', 'country'], null], // Ensure country exists
              ['==', ['get', 'country'], selectedCountry],
              // Then check if selectedCountry is null or matches the country property
            ], 2, // Circle radius when both year and country conditions are met

            // Only country selected
            [
              'all',
              ["==", selectedYear, 0], // No year selected
              ['!=', ['get', 'country'], null], // Ensure country exists
              ['==', ['get', 'country'], selectedCountry],
            ], 2, // Circle radius for only country selected

            // Only year selected
            [
              'all',
              ['!', ['to-boolean', selectedCountry]], // No country selected
              ["==", ["typeof", ["get", "dateStart"]], "number"],
              ["==", ["typeof", ["get", "dateEnd"]], "number"],
              ['>=', selectedYear, ['get', 'dateStart']],
              ['<=', selectedYear, ['get', 'dateEnd']],
            ], 2, // Circle radius for only year selected

            // Default case if none of the above conditions are met
            0 // Set radius to 0 to hide circle
          ],
          8, // Zoom level 8
          [
            'case',
            // Neither country nor year selected
            ['all',
              ['!', ['to-boolean', selectedCountry]], // selectedCountry is null or undefined
              ["==", selectedYear, 0], // selectedCountry matches the country property
            ], 6,

            // Both country and year selected
            [
              'all',
              // ['!', ['to-boolean', selectedCountry]], // Country selected
              // ["!=", selectedYear, 0], // selectedYear is not 0 (or null)
              ["==", ["typeof", ["get", "dateStart"]], "number"],
              ["==", ["typeof", ["get", "dateEnd"]], "number"],
              ['>=', ['get', 'dateStart'], selectedYear],
              ['<=', ['get', 'dateEnd'], selectedYear],
              ['!=', ['get', 'country'], null], // Ensure country exists
              ['==', ['get', 'country'], selectedCountry],
              // Then check if selectedCountry is null or matches the country property
            ], 6, // Circle radius when both year and country conditions are met

            // Only country selected
            [
              'all',
              ["==", selectedYear, 0], // No year selected
              ['!=', ['get', 'country'], null], // Ensure country exists
              ['==', ['get', 'country'], selectedCountry],
            ], 6, // Circle radius for only country selected

            // Only year selected
            [
              'all',
              ['!', ['to-boolean', selectedCountry]], // No country selected
              ["==", ["typeof", ["get", "dateStart"]], "number"],
              ["==", ["typeof", ["get", "dateEnd"]], "number"],
              ['>=', selectedYear, ['get', 'dateStart']],
              ['<=', selectedYear, ['get', 'dateEnd']],
            ], 6, // Circle radius for only year selected

            // Default case if none of the above conditions are met
            0 // Set radius to 0 to hide circle
          ],
        ],

        // 'circle-color': [
        //   'case',
        //   ['==', ['get', dataField], null],
        //   '#636363', // Color for null values
        //   ['interpolate',
        //     ['linear'],
        //     ['get', dataField],
        //     minDataValue, '#73B959',
        //     maxDataValue, '#009ADB',
        //   ]
        // ],
        'circle-color': [
          'case',
          ['==', ['get', dataField], null], // Check if the dataField is null
          '#636363', // Default color if dataField is null
          // If dataField is not null, apply the step expression
          ['step',
            ['get', dataField],
            '#636363', // Default color for the lowest range (you can adjust this if needed)
            ...colorSteps
          ]
        ]

      },
    };
  }, [viewByBudget, selectedCountry, selectedYear, minBudgetLog, maxBudgetLog, minBeneficiariesLog, maxBeneficiariesLog]);

  const onHover = useCallback((event: any) => {
    const features = event.features;
    // Find the first feature within the "point" layer.
    const hoveredFeature = features && features.find((f: any) => f.layer.id === 'point');
    if (hoveredFeature && hoveredFeature.geometry && hoveredFeature.geometry.type === 'Point') {
      // console.log(hoveredFeature.properties)
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