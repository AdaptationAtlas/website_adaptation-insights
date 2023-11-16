interface GeoJsonFeatureProperties {
  detailId: number;
  projectCode: string;
  dateStart: number;
  dateEnd: number;
  projectName: string;
  projectScale: string;
  projectNumLocations: number;
  beneficiaryNum: number;
  beneficiaryNumLog: number;
  beneficiaryUnits: string;
  budget: number;
  budgetCurrency: string;
  budgetEuro: number;
  budgetEuroLog: number;
  locationId: string;
  locationName: string;
  latitude: number;
  longitude: number;
  overlapLatLong: boolean;
  country: string;
}

interface GeoJsonGeometry {
  type: 'Point';
  coordinates: [number, number]; // Assuming all your geometries are points
}

interface GeoJsonFeature {
  type: 'Feature';
  properties: GeoJsonFeatureProperties;
  geometry: GeoJsonGeometry;
}

export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: GeoJsonFeature[];
}
