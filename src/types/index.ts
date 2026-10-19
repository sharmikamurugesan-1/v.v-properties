export type PropertyType = 'plot' | 'villa' | 'apartment' | 'farmland';

export type PropertyStatus = 
  | 'Available' 
  | 'Fast Selling' 
  | 'Selected Plots' 
  | 'Ready to Construct' 
  | 'Sold Out'
  | 'New Launch';

export type PlotStatus = 'available' | 'reserved' | 'sold';

export interface Property {
  id: string;
  slug: string;
  title: string;
  projectTitle: string;
  projectSlug: string;
  type: PropertyType;
  location: string;
  corridor: string;
  areaCents: number;
  areaSqFt: number;
  pricePerCent: number; // in Lakhs
  totalPrice: number; // in Lakhs
  status: PropertyStatus;
  approvals: string[]; // e.g. ["DTCP Approved", "RERA Registered", "Coimbatore Corporation Limit"]
  dtcpNumber: string;
  reraNumber: string;
  facing: 'North' | 'East' | 'South' | 'West' | 'North-East' | 'North-West';
  roadWidthFt: number; // e.g. 40, 33, 30
  featuredImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  distanceToITParkKm: number;
  distanceToAirportKm: number;
  distanceToBusStandKm: number;
  readyForConstruction: boolean;
  clearTitle100Percent: boolean;
  waterSupply: string;
  electricity: string;
  suitableFor: ('immediate-living' | 'build-later' | 'high-appreciation-investment')[];
}

export interface PlotUnit {
  id: string;
  plotNumber: string;
  projectSlug: string;
  dimensions: string; // e.g. "30 x 40"
  areaCents: number;
  areaSqFt: number;
  facing: 'North' | 'East' | 'South' | 'West' | 'Corner Plot';
  pricePerCent: number; // in Lakhs
  totalPrice: number; // in Lakhs
  status: PlotStatus;
  roadWidth: string;
  cornerPlot: boolean;
  coordinates?: { x: number; y: number; width: number; height: number };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  corridor: string;
  bannerImage: string;
  gallery: string[];
  priceStartingPerCent: number; // in Lakhs
  type: string;
  totalAcres: number;
  totalPlots: number;
  availablePlotsCount: number;
  approvals: string[];
  reraNumber: string;
  dtcpNumber: string;
  corporationLimit: boolean;
  overview: string;
  keyFeatures: string[];
  amenities: { icon: string; name: string; description: string }[];
  distanceHighlights: { landmark: string; distance: string; travelTime: string; icon: string }[];
  layoutDescription: string;
  brochureUrl?: string;
  featured: boolean;
}

export interface LocationHub {
  id: string;
  name: string;
  tamilName: string;
  corridor: string;
  tagline: string;
  description: string;
  image: string;
  averageAppreciation: string;
  keyDrivers: string[];
  majorCompanies: string[];
  collegesHospitals: string[];
  distanceToAirport: string;
  distanceToGandhipuram: string;
  distanceToITPark: string;
  activeProjectsCount: number;
}

export interface LeadEnquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  project?: string;
  plotNumber?: string;
  enquiryType: 'general' | 'site-visit' | 'plot-reservation' | 'brochure' | 'cost-sheet';
  preferredDate?: string;
  preferredTime?: string;
  needCabPickup?: boolean;
  message?: string;
  budgetRange?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Visit Scheduled' | 'Completed';
}

export interface Testimonial {
  id: string;
  name: string;
  profession: string;
  location: string;
  projectPurchased: string;
  plotNumber: string;
  quote: string;
  verifiedBuyer: boolean;
  rating: number;
  year: string;
}
