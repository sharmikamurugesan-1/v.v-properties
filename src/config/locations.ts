export interface LandmarkLocation {
  name: string;
  distanceKm: number | null;
  corridor: string;
  verified: boolean;
}

export const LOCATIONS_CONFIG: LandmarkLocation[] = [
  {
    name: 'CHIL SEZ IT Park (Saravanampatti)',
    distanceKm: null, // TODO(client): Measure verified road distance
    corridor: 'Saravanampatti',
    verified: false
  },
  {
    name: 'Coimbatore International Airport',
    distanceKm: null, // TODO(client): Measure verified road distance
    corridor: 'Avinashi Road',
    verified: false
  },
  {
    name: 'Gandhipuram Central Bus Terminus',
    distanceKm: null, // TODO(client): Measure verified road distance
    corridor: 'City Centre',
    verified: false
  },
  {
    name: 'Sathy Main Road Junction',
    distanceKm: null, // TODO(client): Measure verified road distance
    corridor: 'Kovilpalayam',
    verified: false
  }
];

export function getVerifiedLocations(): LandmarkLocation[] {
  return LOCATIONS_CONFIG.filter((l) => l.verified && l.distanceKm !== null);
}
