import { Property, Project, PlotUnit, LocationHub, Testimonial } from '@/types';

export const COMPANY_INFO = {
  name: "V.V Properties",
  legalName: "V.V Properties Coimbatore",
  tagline: "Building Dreams, Delivering Values",
  description: "Coimbatore's premier property development firm specializing in verified clear-title DTCP and RERA-approved residential plots, luxury villas, and planned land investments.",
  phone: "TODO: Contact Phone Number",
  displayPhone: "TODO: Contact Phone Number",
  whatsapp: "TODO: WhatsApp Number",
  email: "contact@vvpropertiescbe.com",
  salesEmail: "sales@vvpropertiescbe.com",
  officeAddress: "V.V Towers, 2nd Floor, Sathy Main Road, Near Saravanampatti Junction, Coimbatore - 641035, Tamil Nadu, India",
  youtube: "https://youtube.com/@v.vproperties?si=fK4pKfEYHjIlby",
  instagram: "https://instagram.com/v.v_properties",
  reraOfficeRegistration: "TODO: RERA Registration Number",
  experienceYears: "TODO: Years of Experience",
  deliveredProjects: "TODO: Completed Projects Count",
  satisfiedFamilies: "TODO: Satisfied Families Count",
  activeDevelopments: 2,
};

export const PROJECTS: Project[] = [
  {
    id: "tech-valley-saravanampatti",
    slug: "tech-valley-saravanampatti",
    name: "Tech Valley — Premium Plots & Villas",
    tagline: "In the Heart of Growth | Under Corporation Limit | Near CHIL SEZ IT Park",
    location: "Saravanampatti, Coimbatore",
    corridor: "Saravanampatti IT Corridor",
    bannerImage: "/images/hero-villa.png",
    gallery: [
      "/images/hero-villa.png",
      "/images/night-pool-villa.jpg",
      "/images/properties/prop-1.png",
      "/images/properties/prop-2.png"
    ],
    priceStartingPerCent: 14.50,
    type: "DTCP & RERA Approved Residential Plots",
    totalAcres: 12.5,
    totalPlots: 88,
    availablePlotsCount: 22,
    approvals: ["DTCP: TODO: DTCP Sanction Number", "TN RERA: TODO: RERA Registration Number", "Coimbatore City Municipal Corporation Limit"],
    reraNumber: "TODO: RERA Registration Number",
    dtcpNumber: "TODO: DTCP Sanction Number",
    corporationLimit: true,
    overview: "Tech Valley is V.V Properties' flagship plotted development situated right in the prime IT corridor of Saravanampatti. Located just 3 minutes from CHIL SEZ (home to Cognizant, Bosch, KGISL, and Amazon), this elite project features 40-foot and 33-foot blacktop roads, underground cabling, individual water connection per plot, and verified legal documentation.",
    keyFeatures: [
      "Within Coimbatore Municipal Corporation Limit",
      "3 Minutes to CHIL SEZ & Keeranatham IT corridor",
      "Grand Architectural Entrance Arch with 24/7 Security",
      "40 ft and 33 ft Tar Roads with LED Street Lighting",
      "Siruvani & Borewell Water pipeline to each plot boundary",
      "Verified Clear Title vetted by top High Court Senior Advocates"
    ],
    amenities: [
      { icon: "ShieldCheck", name: "24/7 Gated Security", description: "Perimeter boundary wall with CCTV and manned access control" },
      { icon: "Droplets", name: "Siruvani & Borewell", description: "Dedicated underground water pipelines with individual valve points" },
      { icon: "Zap", name: "Underground Power", description: "Safe EB power connection with avenue tree plantations" },
      { icon: "Trees", name: "Landscaped Park", description: "Children's play area, walking jog-track, and senior citizen seating" },
      { icon: "Compass", name: "Vedic Vaastu Compliant", description: "All plots engineered strictly according to Vedic Vaastu principles" }
    ],
    distanceHighlights: [
      { landmark: "CHIL SEZ IT Park (Cognizant / Bosch)", distance: "1.4 km", travelTime: "3 mins", icon: "Building2" },
      { landmark: "Kumaraguru College of Technology (KCT)", distance: "2.8 km", travelTime: "6 mins", icon: "GraduationCap" },
      { landmark: "KMCH Super Speciality Hospital", distance: "6.2 km", travelTime: "12 mins", icon: "Cross" },
      { landmark: "Coimbatore International Airport", distance: "9.5 km", travelTime: "18 mins", icon: "Plane" },
      { landmark: "Prozone Mall & Sathy Road Junction", distance: "4.5 km", travelTime: "9 mins", icon: "ShoppingBag" }
    ],
    layoutDescription: "Symmetrically planned 88-plot master layout featuring prime North and East facing villa plots ranging from 2.5 cents up to 6 cents.",
    brochureUrl: "#brochure-download",
    featured: true,
  },
  {
    id: "garden-city-kovilpalayam",
    slug: "garden-city-kovilpalayam",
    name: "The Garden City — Kovilpalayam",
    tagline: "Build Your Dream Home | Thoughtfully Planned Plotted Community",
    location: "Kovilpalayam, Coimbatore",
    corridor: "Sathy Main Road Highway",
    bannerImage: "/images/night-pool-villa.jpg",
    gallery: [
      "/images/night-pool-villa.jpg",
      "/images/hero-villa.png",
      "/images/properties/prop-3.png",
      "/images/properties/prop-4.png"
    ],
    priceStartingPerCent: 5.60,
    type: "DTCP & RERA Approved Affordable Luxury Plots",
    totalAcres: 9.8,
    totalPlots: 74,
    availablePlotsCount: 18,
    approvals: ["DTCP: TODO: DTCP Sanction Number", "TN RERA: TODO: RERA Registration Number", "Verified Clear Title Parent Deed"],
    reraNumber: "TODO: RERA Registration Number",
    dtcpNumber: "TODO: DTCP Sanction Number",
    corporationLimit: false,
    overview: "The Garden City at Kovilpalayam represents the most attractive entry point into Coimbatore's booming Northern corridor. Located just 2 KM from Sathy Main Road, this community offers spacious plots with lush green surroundings at an unbeatable market challenge price of just ₹5.60 Lakhs per Cent.",
    keyFeatures: [
      "2 KM from 4-Lane Sathy National Highway",
      "Rapidly appreciating residential belt near top engineering universities",
      "30 ft wide asphalted internal roadways with solar street lights",
      "Sweet potable groundwater at just 80 feet depth",
      "Ready for immediate house construction with full bank loan approvals",
      "Bank Loan available up to 85% from SBI, HDFC, ICICI, and Canara Bank"
    ],
    amenities: [
      { icon: "ShieldCheck", name: "Security Gate", description: "Round-the-clock security cabin and fenced compound" },
      { icon: "Droplets", name: "Abundant Water", description: "Overhead storage tank with direct pipeline supply" },
      { icon: "Sun", name: "Solar Street Lights", description: "Energy-efficient illumination across all internal roads" },
      { icon: "Trees", name: "Avenue Trees", description: "Shady native tree plantations along every plot frontage" }
    ],
    distanceHighlights: [
      { landmark: "Sathy Main Road Highway", distance: "2.0 km", travelTime: "4 mins", icon: "Navigation" },
      { landmark: "PPG Institute of Technology & Allied Health", distance: "3.2 km", travelTime: "6 mins", icon: "GraduationCap" },
      { landmark: "Saravanampatti IT Junction", distance: "8.5 km", travelTime: "14 mins", icon: "Building2" },
      { landmark: "Annur Bus Terminus", distance: "7.0 km", travelTime: "11 mins", icon: "Bus" }
    ],
    layoutDescription: "Serene garden-facing layout with 74 plots, each planned with clear demarcation stones and wide turning radius.",
    brochureUrl: "#brochure-download",
    featured: true,
  },
  {
    id: "greenfield-meadows-kalapatti",
    slug: "greenfield-meadows-kalapatti",
    name: "Greenfield Meadows — Kalapatti",
    tagline: "Airport Corridor Living | Fast Connectivity to KMCH & TIDEL",
    location: "Kalapatti, Coimbatore",
    corridor: "Airport & Avinashi Corridor",
    bannerImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80"
    ],
    priceStartingPerCent: 12.80,
    type: "Premium Villa Plots & Turnkey Luxury Villas",
    totalAcres: 8.2,
    totalPlots: 52,
    availablePlotsCount: 14,
    approvals: ["DTCP Approved", "TN RERA Approved", "Corporation Limit Adjacent"],
    reraNumber: "TN/11/Layout/1105/2023",
    dtcpNumber: "DTCP No. 92/2023",
    corporationLimit: true,
    overview: "Strategically located between Kalapatti village and the Airport ring road, Greenfield Meadows offers seamless 10-minute connectivity to both the airport and Avinashi road medical institutes.",
    keyFeatures: [
      "10 minutes to Coimbatore International Airport",
      "Proximity to TIDEL Park Coimbatore & KMCH",
      "Underground drainage (UGD) and storm water drains",
      "Custom architect-designed 3 & 4 BHK villas optional"
    ],
    amenities: [
      { icon: "ShieldCheck", name: "CCTV Surveillance", description: "24/7 smart monitoring at entrance and crossroads" },
      { icon: "Dumbbell", name: "Outdoor Fitness Park", description: "Open gym equipment and paved reflexology path" }
    ],
    distanceHighlights: [
      { landmark: "Coimbatore International Airport", distance: "4.8 km", travelTime: "9 mins", icon: "Plane" },
      { landmark: "KMCH & Le Meridien Avinashi Rd", distance: "5.5 km", travelTime: "11 mins", icon: "Cross" },
      { landmark: "TIDEL Park Coimbatore", distance: "7.8 km", travelTime: "15 mins", icon: "Building2" }
    ],
    layoutDescription: "Exclusive 52-unit boutique villa layout with lush avenues and dedicated park reserve.",
    brochureUrl: "#brochure-download",
    featured: true,
  },
  {
    id: "royal-palm-enclave-kovaipudur",
    slug: "royal-palm-enclave-kovaipudur",
    name: "Royal Palm Enclave — Kovaipudur",
    tagline: "Little Ooty Foothills | Pure Mountain Breeze & Tranquil Privacy",
    location: "Kovaipudur, Coimbatore",
    corridor: "Kovaipudur Western Ghats Corridor",
    bannerImage: "/images/properties/prop-1.png",
    gallery: [
      "/images/properties/prop-1.png",
      "/images/properties/prop-2.png"
    ],
    priceStartingPerCent: 7.20,
    type: "Scenic Hillview Residential Plots",
    totalAcres: 11.0,
    totalPlots: 65,
    availablePlotsCount: 16,
    approvals: ["DTCP Approved", "RERA Registered"],
    reraNumber: "TN/11/Layout/0612/2023",
    dtcpNumber: "DTCP No. 44/2023",
    corporationLimit: true,
    overview: "Nestled in Kovaipudur, famously known as the 'Little Ooty of Coimbatore' due to its year-round pleasant climate and gentle mountain breezes, Royal Palm Enclave is the sanctuary for peaceful family living.",
    keyFeatures: [
      "Panoramic views of the Western Ghats range",
      "Air Quality Index (AQI) pristine and cool temperatures",
      "Close to Sri Krishna Arts and Science College & CS Academy",
      "Siruvani drinking water supply"
    ],
    amenities: [
      { icon: "Mountain", name: "Hillview Gazebo", description: "Elevated community deck overlooking Western Ghats" },
      { icon: "Droplets", name: "Siruvani Water", description: "Direct Corporation Siruvani connection" }
    ],
    distanceHighlights: [
      { landmark: "Sri Krishna Institutions", distance: "2.1 km", travelTime: "4 mins", icon: "GraduationCap" },
      { landmark: "Sundarapuram Junction", distance: "5.8 km", travelTime: "11 mins", icon: "Navigation" },
      { landmark: "Coimbatore Railway Junction", distance: "11.2 km", travelTime: "22 mins", icon: "Train" }
    ],
    layoutDescription: "Contoured plotted layout preserving natural elevation gradients and lush coconut groves.",
    brochureUrl: "#brochure-download",
    featured: false,
  }
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-tv-01",
    slug: "tech-valley-plot-14-saravanampatti",
    title: "East-Facing Corner Plot in Tech Valley",
    projectTitle: "Tech Valley",
    projectSlug: "tech-valley-saravanampatti",
    type: "plot",
    location: "Saravanampatti, Coimbatore",
    corridor: "Saravanampatti IT Corridor",
    areaCents: 3.25,
    areaSqFt: 1415,
    pricePerCent: 14.50,
    totalPrice: 47.125,
    status: "Available",
    approvals: ["DTCP Approved", "RERA Registered", "Corporation Limit"],
    dtcpNumber: "118/2023",
    reraNumber: "TN/11/Layout/1429/2023",
    facing: "East",
    roadWidthFt: 40,
    featuredImage: "/images/hero-villa.png",
    gallery: [
      "/images/hero-villa.png",
      "/images/properties/prop-1.png"
    ],
    description: "Prime East-facing residential plot in Tech Valley directly fronting the 40-foot main central boulevard. Only 3 minutes to CHIL SEZ IT Park, ideal for immediate villa construction or rental duplex investment.",
    highlights: [
      "3.25 Cents (1,415 Sq.Ft)",
      "Vedic East Facing for maximum natural sunlight",
      "Direct 40 ft road access",
      "Ready for immediate registration & construction"
    ],
    amenities: ["Siruvani Water", "Underground Electricity", "Compound Wall", "40ft Road", "Street Light", "Vaastu Compliant"],
    distanceToITParkKm: 1.4,
    distanceToAirportKm: 9.5,
    distanceToBusStandKm: 4.5,
    readyForConstruction: true,
    clearTitle100Percent: true,
    waterSupply: "Siruvani + Borewell pipeline",
    electricity: "3-Phase EB connection ready",
    suitableFor: ["immediate-living", "high-appreciation-investment"]
  },
  {
    id: "prop-tv-02",
    slug: "tech-valley-plot-28-north-facing",
    title: "North-Facing Premium Villa Plot — Plot #28",
    projectTitle: "Tech Valley",
    projectSlug: "tech-valley-saravanampatti",
    type: "plot",
    location: "Saravanampatti, Coimbatore",
    corridor: "Saravanampatti IT Corridor",
    areaCents: 4.50,
    areaSqFt: 1960,
    pricePerCent: 14.50,
    totalPrice: 65.25,
    status: "Fast Selling",
    approvals: ["DTCP Approved", "RERA Registered", "Corporation Limit"],
    dtcpNumber: "118/2023",
    reraNumber: "TN/11/Layout/1429/2023",
    facing: "North",
    roadWidthFt: 33,
    featuredImage: "/images/night-pool-villa.jpg",
    gallery: [
      "/images/night-pool-villa.jpg",
      "/images/hero-villa.png"
    ],
    description: "Spacious 4.5 Cent rectangular plot designed for a grand independent luxury villa with private garden, portico, and terrace deck.",
    highlights: [
      "4.50 Cents (1,960 Sq.Ft)",
      "North-Facing Auspicious Vastu",
      "Adjacent to Central Landscaped Park"
    ],
    amenities: ["Park View", "Siruvani Water", "33ft Tar Road", "Solar Lights", "Security Guard"],
    distanceToITParkKm: 1.4,
    distanceToAirportKm: 9.5,
    distanceToBusStandKm: 4.5,
    readyForConstruction: true,
    clearTitle100Percent: true,
    waterSupply: "Underground piped supply",
    electricity: "EB line ready",
    suitableFor: ["immediate-living", "build-later"]
  },
  {
    id: "prop-gc-01",
    slug: "garden-city-plot-07-kovilpalayam",
    title: "Affordable High-Return Plot in The Garden City",
    projectTitle: "The Garden City",
    projectSlug: "garden-city-kovilpalayam",
    type: "plot",
    location: "Kovilpalayam, Coimbatore",
    corridor: "Sathy Main Road Highway",
    areaCents: 2.75,
    areaSqFt: 1198,
    pricePerCent: 5.60,
    totalPrice: 15.40,
    status: "Available",
    approvals: ["DTCP Approved", "RERA Registered"],
    dtcpNumber: "74/2023",
    reraNumber: "TN/11/Layout/0892/2023",
    facing: "North-East",
    roadWidthFt: 30,
    featuredImage: "/images/properties/prop-1.png",
    gallery: [
      "/images/properties/prop-1.png",
      "/images/properties/prop-2.png"
    ],
    description: "Unbeatable value for money at just ₹15.40 Lakhs total package price! Perfect for first-time land buyers and tech professionals seeking high capital appreciation.",
    highlights: [
      "2.75 Cents at only ₹5.60 Lakhs/Cent",
      "North-East Corner orientation",
      "Sweet potable groundwater at 80 ft",
      "Clear title legal verification report included"
    ],
    amenities: ["Sweet Groundwater", "30ft Wide Road", "Avenue Plantation", "24/7 Security"],
    distanceToITParkKm: 8.5,
    distanceToAirportKm: 16.0,
    distanceToBusStandKm: 2.0,
    readyForConstruction: true,
    clearTitle100Percent: true,
    waterSupply: "Borewell + Panchayat Piped Water",
    electricity: "Single/Three Phase available",
    suitableFor: ["high-appreciation-investment", "build-later"]
  },
  {
    id: "prop-gc-02",
    slug: "garden-city-villa-plot-19",
    title: "Large Villa Plot with Sweet Ground Water — Plot #19",
    projectTitle: "The Garden City",
    projectSlug: "garden-city-kovilpalayam",
    type: "plot",
    location: "Kovilpalayam, Coimbatore",
    corridor: "Sathy Main Road Highway",
    areaCents: 4.00,
    areaSqFt: 1742,
    pricePerCent: 5.60,
    totalPrice: 22.40,
    status: "Selected Plots",
    approvals: ["DTCP Approved", "RERA Registered"],
    dtcpNumber: "74/2023",
    reraNumber: "TN/11/Layout/0892/2023",
    facing: "East",
    roadWidthFt: 30,
    featuredImage: "/images/properties/prop-2.png",
    gallery: [
      "/images/properties/prop-2.png",
      "/images/properties/prop-3.png"
    ],
    description: "4 Cents ready-to-build plot with 35 feet frontage. 85% home loan pre-approved with State Bank of India and HDFC Bank.",
    highlights: [
      "4.00 Cents (1,742 Sq.Ft)",
      "Bank Loan available up to 85%",
      "35 ft Wide Frontage"
    ],
    amenities: ["Sweet Groundwater", "30ft Road", "Solar Lights", "Perimeter Fence"],
    distanceToITParkKm: 8.5,
    distanceToAirportKm: 16.0,
    distanceToBusStandKm: 2.0,
    readyForConstruction: true,
    clearTitle100Percent: true,
    waterSupply: "Borewell connection provided",
    electricity: "Ready",
    suitableFor: ["immediate-living", "build-later"]
  },
  {
    id: "prop-gm-01",
    slug: "greenfield-meadows-plot-08-kalapatti",
    title: "Airport Corridor Executive Plot — Greenfield Meadows",
    projectTitle: "Greenfield Meadows",
    projectSlug: "greenfield-meadows-kalapatti",
    type: "plot",
    location: "Kalapatti, Coimbatore",
    corridor: "Airport & Avinashi Corridor",
    areaCents: 3.50,
    areaSqFt: 1524,
    pricePerCent: 12.80,
    totalPrice: 44.80,
    status: "Available",
    approvals: ["DTCP Approved", "RERA Registered"],
    dtcpNumber: "92/2023",
    reraNumber: "TN/11/Layout/1105/2023",
    facing: "North",
    roadWidthFt: 33,
    featuredImage: "/images/properties/prop-3.png",
    gallery: [
      "/images/properties/prop-3.png",
      "/images/properties/prop-4.png"
    ],
    description: "Exclusive plot situated just 8 minutes from the International Airport and 10 minutes to KMCH Medical Centre.",
    highlights: [
      "3.50 Cents (1,524 Sq.Ft)",
      "8 Minutes to Airport Terminal",
      "Underground Drainage (UGD) ready"
    ],
    amenities: ["UGD Drainage", "Tar Road", "Street Lamps", "Gated Entry"],
    distanceToITParkKm: 4.8,
    distanceToAirportKm: 4.8,
    distanceToBusStandKm: 6.0,
    readyForConstruction: true,
    clearTitle100Percent: true,
    waterSupply: "Corporation + Borewell",
    electricity: "Underground cable ready",
    suitableFor: ["immediate-living", "high-appreciation-investment"]
  },
  {
    id: "prop-rp-01",
    slug: "royal-palm-plot-12-kovaipudur",
    title: "Hillview Scenic Villa Plot in Kovaipudur",
    projectTitle: "Royal Palm Enclave",
    projectSlug: "royal-palm-enclave-kovaipudur",
    type: "plot",
    location: "Kovaipudur, Coimbatore",
    corridor: "Kovaipudur Western Ghats Corridor",
    areaCents: 5.00,
    areaSqFt: 2178,
    pricePerCent: 7.20,
    totalPrice: 36.00,
    status: "Available",
    approvals: ["DTCP Approved", "RERA Registered"],
    dtcpNumber: "44/2023",
    reraNumber: "TN/11/Layout/0612/2023",
    facing: "East",
    roadWidthFt: 33,
    featuredImage: "/images/properties/prop-4.png",
    gallery: [
      "/images/properties/prop-4.png",
      "/images/hero-villa.png"
    ],
    description: "Enjoy mountain views and pristine air in Coimbatore's Little Ooty. 5 Cents of clear title land ideal for retirement or holiday villa.",
    highlights: [
      "5.00 Cents (2,178 Sq.Ft)",
      "Unobstructed Western Ghats Views",
      "Cooler micro-climate year round"
    ],
    amenities: ["Mountain View", "Siruvani Water", "Children Play Area", "Wide Tar Road"],
    distanceToITParkKm: 18.0,
    distanceToAirportKm: 19.5,
    distanceToBusStandKm: 5.8,
    readyForConstruction: true,
    clearTitle100Percent: true,
    waterSupply: "Siruvani Water Connection",
    electricity: "Overhead 3-phase line",
    suitableFor: ["immediate-living", "build-later"]
  }
];

export const TECH_VALLEY_PLOTS: PlotUnit[] = [
  { id: "tv-p01", plotNumber: "01", projectSlug: "tech-valley-saravanampatti", dimensions: "35 x 45", areaCents: 3.61, areaSqFt: 1575, facing: "Corner Plot", pricePerCent: 14.50, totalPrice: 52.34, status: "available", roadWidth: "40 ft", cornerPlot: true },
  { id: "tv-p02", plotNumber: "02", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 45", areaCents: 3.10, areaSqFt: 1350, facing: "North", pricePerCent: 14.50, totalPrice: 44.95, status: "sold", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p03", plotNumber: "03", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 45", areaCents: 3.10, areaSqFt: 1350, facing: "North", pricePerCent: 14.50, totalPrice: 44.95, status: "available", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p04", plotNumber: "04", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 45", areaCents: 3.10, areaSqFt: 1350, facing: "North", pricePerCent: 14.50, totalPrice: 44.95, status: "reserved", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p05", plotNumber: "05", projectSlug: "tech-valley-saravanampatti", dimensions: "32 x 45", areaCents: 3.30, areaSqFt: 1440, facing: "North", pricePerCent: 14.50, totalPrice: 47.85, status: "available", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p06", plotNumber: "06", projectSlug: "tech-valley-saravanampatti", dimensions: "35 x 50", areaCents: 4.02, areaSqFt: 1750, facing: "Corner Plot", pricePerCent: 14.50, totalPrice: 58.29, status: "available", roadWidth: "40 & 33 ft", cornerPlot: true },
  
  { id: "tv-p07", plotNumber: "07", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 40", areaCents: 2.75, areaSqFt: 1200, facing: "East", pricePerCent: 14.50, totalPrice: 39.87, status: "sold", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p08", plotNumber: "08", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 40", areaCents: 2.75, areaSqFt: 1200, facing: "East", pricePerCent: 14.50, totalPrice: 39.87, status: "available", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p09", plotNumber: "09", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 40", areaCents: 2.75, areaSqFt: 1200, facing: "East", pricePerCent: 14.50, totalPrice: 39.87, status: "reserved", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p10", plotNumber: "10", projectSlug: "tech-valley-saravanampatti", dimensions: "32 x 40", areaCents: 2.94, areaSqFt: 1280, facing: "East", pricePerCent: 14.50, totalPrice: 42.63, status: "available", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p11", plotNumber: "11", projectSlug: "tech-valley-saravanampatti", dimensions: "32 x 40", areaCents: 2.94, areaSqFt: 1280, facing: "East", pricePerCent: 14.50, totalPrice: 42.63, status: "sold", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p12", plotNumber: "12", projectSlug: "tech-valley-saravanampatti", dimensions: "36 x 40", areaCents: 3.30, areaSqFt: 1440, facing: "Corner Plot", pricePerCent: 14.50, totalPrice: 47.85, status: "available", roadWidth: "33 ft", cornerPlot: true },

  { id: "tv-p13", plotNumber: "13", projectSlug: "tech-valley-saravanampatti", dimensions: "35 x 55", areaCents: 4.42, areaSqFt: 1925, facing: "East", pricePerCent: 14.50, totalPrice: 64.09, status: "available", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p14", plotNumber: "14", projectSlug: "tech-valley-saravanampatti", dimensions: "32 x 44", areaCents: 3.25, areaSqFt: 1415, facing: "East", pricePerCent: 14.50, totalPrice: 47.12, status: "available", roadWidth: "40 ft", cornerPlot: true },
  { id: "tv-p15", plotNumber: "15", projectSlug: "tech-valley-saravanampatti", dimensions: "40 x 50", areaCents: 4.59, areaSqFt: 2000, facing: "North", pricePerCent: 14.50, totalPrice: 66.55, status: "sold", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p16", plotNumber: "16", projectSlug: "tech-valley-saravanampatti", dimensions: "40 x 50", areaCents: 4.59, areaSqFt: 2000, facing: "North", pricePerCent: 14.50, totalPrice: 66.55, status: "available", roadWidth: "33 ft", cornerPlot: false },
  { id: "tv-p17", plotNumber: "17", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 40", areaCents: 2.75, areaSqFt: 1200, facing: "West", pricePerCent: 14.50, totalPrice: 39.87, status: "available", roadWidth: "30 ft", cornerPlot: false },
  { id: "tv-p18", plotNumber: "18", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 40", areaCents: 2.75, areaSqFt: 1200, facing: "West", pricePerCent: 14.50, totalPrice: 39.87, status: "sold", roadWidth: "30 ft", cornerPlot: false },

  { id: "tv-p19", plotNumber: "19", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 42", areaCents: 2.89, areaSqFt: 1260, facing: "South", pricePerCent: 14.50, totalPrice: 41.90, status: "available", roadWidth: "30 ft", cornerPlot: false },
  { id: "tv-p20", plotNumber: "20", projectSlug: "tech-valley-saravanampatti", dimensions: "30 x 42", areaCents: 2.89, areaSqFt: 1260, facing: "South", pricePerCent: 14.50, totalPrice: 41.90, status: "reserved", roadWidth: "30 ft", cornerPlot: false },
  { id: "tv-p21", plotNumber: "21", projectSlug: "tech-valley-saravanampatti", dimensions: "35 x 42", areaCents: 3.37, areaSqFt: 1470, facing: "Corner Plot", pricePerCent: 14.50, totalPrice: 48.86, status: "available", roadWidth: "33 ft", cornerPlot: true },
  { id: "tv-p22", plotNumber: "22", projectSlug: "tech-valley-saravanampatti", dimensions: "40 x 60", areaCents: 5.51, areaSqFt: 2400, facing: "North", pricePerCent: 14.50, totalPrice: 79.89, status: "available", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p23", plotNumber: "23", projectSlug: "tech-valley-saravanampatti", dimensions: "40 x 60", areaCents: 5.51, areaSqFt: 2400, facing: "North", pricePerCent: 14.50, totalPrice: 79.89, status: "sold", roadWidth: "40 ft", cornerPlot: false },
  { id: "tv-p24", plotNumber: "24", projectSlug: "tech-valley-saravanampatti", dimensions: "42 x 60", areaCents: 5.78, areaSqFt: 2520, facing: "Corner Plot", pricePerCent: 14.50, totalPrice: 83.81, status: "available", roadWidth: "40 ft", cornerPlot: true }
];

export const LOCATION_HUBS: LocationHub[] = [
  {
    id: "saravanampatti",
    name: "Saravanampatti",
    tamilName: "சரவணம்பட்டி",
    corridor: "Coimbatore IT Corridor",
    tagline: "The Silicon Valley of Coimbatore",
    description: "Home to CHIL SEZ, Cognizant, Bosch, KGISL, and top educational campuses. Saravanampatti commands Coimbatore's highest rental yields and steady 18-22% annual land value appreciation.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    averageAppreciation: "18% - 22% p.a.",
    keyDrivers: ["CHIL SEZ IT Park", "Keeranatham Special Economic Zone", "Corporation Limit Expansion", "Proposed Metro Line 1"],
    majorCompanies: ["Cognizant", "Bosch Global Software", "KGISL", "Amazon Development Centre", "Ford Tech"],
    collegesHospitals: ["Kumaraguru College of Technology (KCT)", "SNS College of Technology", "KMCH Saravanampatti Centre"],
    distanceToAirport: "9.5 KM (18 Mins)",
    distanceToGandhipuram: "7.0 KM (14 Mins)",
    distanceToITPark: "0.5 - 2 KM (Immediate)",
    activeProjectsCount: 3
  },
  {
    id: "kovilpalayam",
    name: "Kovilpalayam",
    tamilName: "கோவில்பாளையம்",
    corridor: "Sathy Main Road Highway",
    tagline: "The Fast-Rising Educational & Residential Gateway",
    description: "Located along the 4-lane NH 209 (Sathy Road), Kovilpalayam offers the sweet spot of affordability, pristine air, and direct connectivity to both Saravanampatti and Annur industrial hubs.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    averageAppreciation: "14% - 16% p.a.",
    keyDrivers: ["4-Lane Sathy Highway Upgradation", "Expanding Engineering Institutes", "Market Challenge Price Advantage", "Abundant Groundwater"],
    majorCompanies: ["Annur Industrial Corridor", "Engineering Design Hubs", "KGISL Sub-campus"],
    collegesHospitals: ["PPG Institute of Technology", "Info Institute of Engineering", "KMC Multi-Speciality Clinic"],
    distanceToAirport: "16.0 KM (24 Mins)",
    distanceToGandhipuram: "16.5 KM (25 Mins)",
    distanceToITPark: "8.5 KM (14 Mins)",
    activeProjectsCount: 2
  },
  {
    id: "kalapatti",
    name: "Kalapatti",
    tamilName: "காளப்பட்டி",
    corridor: "Airport & Avinashi Corridor",
    tagline: "The Airport & Tech Intersection",
    description: "Situated directly behind Coimbatore International Airport and adjacent to TIDEL Park, Kalapatti is preferred by CXOs, aviation executives, and healthcare professionals.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    averageAppreciation: "15% - 19% p.a.",
    keyDrivers: ["Airport Runway Expansion", "TIDEL Park Phase 2", "Proximity to Avinashi Highway", "Premium Villa Communities"],
    majorCompanies: ["TIDEL Park IT Firms", "Pricol Ltd", "Roots Industries", "L&T Healthcare"],
    collegesHospitals: ["KMCH Hospital & Research Institute", "Dr. N.G.P. Institute of Technology"],
    distanceToAirport: "4.5 KM (8 Mins)",
    distanceToGandhipuram: "9.0 KM (18 Mins)",
    distanceToITPark: "4.8 KM (10 Mins)",
    activeProjectsCount: 2
  },
  {
    id: "kovaipudur",
    name: "Kovaipudur",
    tamilName: "கோவைபுதூர்",
    corridor: "Western Ghats Corridor",
    tagline: "Little Ooty — Clean Air, Hillview Serenity",
    description: "Known as the serene green oasis of Coimbatore with natural temperatures 2-3°C cooler than the city centre. Highly sought after for retirement homes, eco villas, and peaceful residential living.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    averageAppreciation: "11% - 13% p.a.",
    keyDrivers: ["Pollution-free mountain micro-climate", "Sri Krishna Educational Campus", "Peaceful residential neighborhood"],
    majorCompanies: ["Educational Institutions", "IT Outsourcing Centres"],
    collegesHospitals: ["Sri Krishna Arts & Science", "VLB Janakiammal College", "Kovaipudur Government Hospital"],
    distanceToAirport: "19.5 KM (30 Mins)",
    distanceToGandhipuram: "12.0 KM (20 Mins)",
    distanceToITPark: "18.0 KM (28 Mins)",
    activeProjectsCount: 1
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-01",
    name: "Dr. K. Senthil Kumar",
    profession: "Senior Consultant, KMCH Coimbatore",
    location: "Saravanampatti",
    projectPurchased: "Tech Valley",
    plotNumber: "Plot #14 (3.25 Cents)",
    quote: "As a doctor with very little free time, transparent paperwork was my number one criterion. V.V Properties provided the entire DTCP approval order, RERA certificate, and 30-year parent deed trace upfront. Registration was completed smoothly in one afternoon. Our house construction is already underway!",
    verifiedBuyer: true,
    rating: 5,
    year: "2023"
  },
  {
    id: "test-02",
    name: "Ananya & Rajesh Murali",
    profession: "Lead Architect & Senior Tech Lead (Bosch)",
    location: "Keeranatham / CHIL SEZ",
    projectPurchased: "Tech Valley",
    plotNumber: "Plot #06 (4.02 Cents Corner)",
    quote: "Working at Bosch CHIL SEZ, we wanted a residential plot within a 5-minute commute without dealing with narrow village roads. Tech Valley gave us 40-foot wide asphalt roads, corporation drinking water, and excellent elevation. Their sales team is honest and never pushed false urgency.",
    verifiedBuyer: true,
    rating: 5,
    year: "2024"
  },
  {
    id: "test-03",
    name: "M. Thangavel",
    profession: "Business Owner, Textile Machinery",
    location: "Kovilpalayam",
    projectPurchased: "The Garden City",
    plotNumber: "Plot #19 (4.00 Cents)",
    quote: "₹5.60 Lakhs per Cent in Kovilpalayam is genuinely a market challenge price. I compared 4 other layouts nearby before finalizing with V.V Properties. The groundwater is remarkably sweet, roads are well lit with solar lamps, and my SBI loan of 80% was sanctioned in just 10 days.",
    verifiedBuyer: true,
    rating: 5,
    year: "2023"
  }
];

export const BUYER_DUE_DILIGENCE_CHECKLIST = [
  {
    step: 1,
    title: "Verify DTCP Approval Order & Layout Number",
    description: "Ensure the layout has an official Directorate of Town and Country Planning (DTCP) sanction number. V.V Properties provides the certified DTCP layout drawing stamped with road gift deeds.",
    mandatory: true,
    verifiedByVVProperties: true
  },
  {
    step: 2,
    title: "Check Tamil Nadu RERA (TNRERA) Registration",
    description: "Verify that the project is registered on the official TNRERA portal (rera.tn.gov.in) with its genuine registration certificate number. Protects buyer rights and ensures timeline compliance.",
    mandatory: true,
    verifiedByVVProperties: true
  },
  {
    step: 3,
    title: "30-Year Encumbrance Certificate (EC) Verification",
    description: "Obtain Nil Encumbrance Certificate for 30 years from the Sub-Registrar Office confirming zero legal disputes, mortgage liens, or third-party claims.",
    mandatory: true,
    verifiedByVVProperties: true
  },
  {
    step: 4,
    title: "Parent Title Deed Tracing & Chain of Ownership",
    description: "Verify unbroken chain of title deeds from the original agricultural landowners to the developer with revenue records (Patta, Chitta, Adangal).",
    mandatory: true,
    verifiedByVVProperties: true
  },
  {
    step: 5,
    title: "Roads & Public Space Gift Deed to Local Panchayat/Corporation",
    description: "Ensure all internal roads, street lights, and OSR (Open Space Reservation) park land have been legally gifted via registered deed to the local governing body.",
    mandatory: true,
    verifiedByVVProperties: true
  },
  {
    step: 6,
    title: "Physical Demarcation & Boundary Verification",
    description: "Ensure stone boundaries and corner markers match the DTCP approved layout map precisely in length, width, and square footage.",
    mandatory: true,
    verifiedByVVProperties: true
  }
];

export const TAMIL_NADU_BUYING_COST_RULES = {
  stampDutyPercent: 7.0, // 7% Stamp Duty in Tamil Nadu
  registrationFeePercent: 4.0, // 4% Registration Fee
  guidelineVsMarketExplanation: "In Tamil Nadu, Stamp Duty and Registration fees are computed on the registered property value (or guideline value, whichever is higher).",
  legalVerificationCharges: 15000, // Standard legal fee for title clearance
  documentationAndSurveyCharges: 12000, // Patta transfer, survey charges
  waterAndEbInfrastructureCharges: 25000, // EB line & water junction
  disclaimer: "All figures are estimated approximations based on prevailing Tamil Nadu Registration Department norms. Government statutory rates are subject to official revision."
};
