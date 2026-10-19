export interface LandmarkLocation {
  id: string;
  name: string;
  landmark: string;
  significance: string;
  category: "commercial" | "transit" | "infrastructure" | "civic";
  distanceKm: number | null;
  corridor: string;
  verified: boolean;
}

export const LOCATIONS_CONFIG: LandmarkLocation[] = [
  {
    id: "chil-sez",
    name: "Saravanampatti Corridor",
    landmark: "CHIL SEZ IT Park",
    significance: "Major IT/ITES enterprise hub housing Cognizant, Bosch, and tech employment campuses.",
    category: "commercial",
    distanceKm: null, // TODO(client): Measure verified road distance from projects
    corridor: "Saravanampatti",
    verified: false,
  },
  {
    id: "cbe-airport",
    name: "Airport Connectivity",
    landmark: "Coimbatore International Airport",
    significance: "Domestic & international flight connectivity with planned arterial bypass expansion.",
    category: "transit",
    distanceKm: null, // TODO(client): Measure verified road distance from projects
    corridor: "Avinashi Road",
    verified: false,
  },
  {
    id: "sathy-road",
    name: "NH Corridor",
    landmark: "Sathy Main Road (NH 209)",
    significance: "Arterial four-lane connectivity linking Annur, Kovilpalayam to Coimbatore city centre.",
    category: "infrastructure",
    distanceKm: null, // TODO(client): Measure verified road distance from projects
    corridor: "Kovilpalayam",
    verified: false,
  },
  {
    id: "gandhipuram",
    name: "Civic Centre",
    landmark: "Gandhipuram Central Hub",
    significance: "Central commercial district and inter-district transportation interchange.",
    category: "civic",
    distanceKm: null, // TODO(client): Measure verified road distance from projects
    corridor: "City Centre",
    verified: false,
  },
];

export const LOCATIONS = LOCATIONS_CONFIG;

export function getVerifiedLocations(): LandmarkLocation[] {
  return LOCATIONS_CONFIG.filter((l) => l.verified && l.distanceKm !== null);
}
