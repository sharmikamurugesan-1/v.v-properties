export interface ProjectApproval {
  verified: boolean;
  number: string | null;
  qrImage?: string | null;
}

export interface ProjectFact {
  label: string;
  value: string;
  verified: boolean;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  isRender: boolean;
}

export interface ProjectConfig {
  slug: string;
  name: string;
  title: string;
  area: string;
  type: string;
  shortDescription: string;
  heroImage: string;
  plotLayout: string;
  brochureUrl: string | null;
  location: {
    taluk: string;
    district: string;
  };
  features: {
    roadWidthFt: number;
    waterSource: string;
    electricity: string;
    boundary: string;
  };
  statutory: {
    dtcpNumber: string | null;
    reraNumber: string | null;
  };
  approvals: {
    dtcp: ProjectApproval;
    rera: ProjectApproval;
  };
  pricing: {
    startingPriceInLakhs: number | null;
    verified: boolean;
  };
  priceStartingPerCent: {
    value: number | null; // In Lakhs
    verified: boolean;
  };
  facts: ProjectFact[] & {
    totalPlots?: number;
    zoning?: string;
  };
  gallery: ProjectGalleryImage[];
}

export const PROJECTS_CONFIG: ProjectConfig[] = [
  {
    slug: "the-garden-city",
    name: "The Garden City — Kovilpalayam",
    title: "The Garden City",
    area: "Kovilpalayam, Coimbatore",
    type: "Plotted Layout & Residential Villas",
    shortDescription: "Plotted residential community along the Kovilpalayam corridor with underground infrastructure and DTCP statutory approvals.",
    heroImage: "/images/projects/the-garden-city.png",
    plotLayout: "garden-city-cad",
    brochureUrl: null, // TODO(client): Real brochure URL
    location: {
      taluk: "Kovilpalayam",
      district: "Coimbatore",
    },
    features: {
      roadWidthFt: 40,
      waterSource: "Individual ground line & overhead manifold",
      electricity: "Three-phase electrical network & solar street lighting",
      boundary: "Secured perimeter compound with masonry gates",
    },
    statutory: {
      dtcpNumber: null, // TODO(client): Real DTCP approval number
      reraNumber: null, // TODO(client): Real TNRERA registration number
    },
    approvals: {
      dtcp: {
        verified: false,
        number: null,
      },
      rera: {
        verified: false,
        number: null,
        qrImage: null,
      },
    },
    pricing: {
      startingPriceInLakhs: null, // Unverified -> renders "Price on Application"
      verified: false,
    },
    priceStartingPerCent: {
      value: null,
      verified: false,
    },
    facts: Object.assign(
      [
        { label: "Corridor", value: "Sathy Road / Kovilpalayam", verified: true },
        { label: "Road Width", value: "30 & 40 ft Blacktop Roads", verified: true },
        { label: "Water Provision", value: "Individual Ground Connection", verified: true },
        { label: "Loan Pre-clearance", value: "Nationalised Banks Eligible", verified: true },
      ],
      {
        totalPlots: 48,
        zoning: "Residential Plotted",
      }
    ),
    gallery: [
      {
        src: "/images/projects/the-garden-city.png",
        alt: "The Garden City — Entrance Portal & Avenue",
        isRender: true,
      },
      {
        src: "/images/projects/interior.png",
        alt: "The Garden City — Planned Villa Architecture",
        isRender: true,
      },
      {
        src: "/images/projects/blueprint.png",
        alt: "The Garden City — Landscaped Open Reserve",
        isRender: true,
      },
    ],
  },
  {
    slug: "tech-valley",
    name: "Tech Valley — Saravanampatti",
    title: "Tech Valley",
    area: "Saravanampatti, Coimbatore",
    type: "Plotted Residential Community",
    shortDescription: "Urban plotted development in Saravanampatti IT corridor, designed for contemporary villas with immediate highway proximity.",
    heroImage: "/images/projects/tech-valley.png",
    plotLayout: "tech-valley-cad",
    brochureUrl: null, // TODO(client): Real brochure URL
    location: {
      taluk: "Saravanampatti",
      district: "Coimbatore",
    },
    features: {
      roadWidthFt: 33,
      waterSource: "Underground water line network",
      electricity: "Concealed underground ducting & LED avenue illumination",
      boundary: "Reinforced concrete perimeter boundary wall",
    },
    statutory: {
      dtcpNumber: null, // TODO(client): Real DTCP approval number
      reraNumber: null, // TODO(client): Real TNRERA registration number
    },
    approvals: {
      dtcp: {
        verified: false,
        number: null,
      },
      rera: {
        verified: false,
        number: null,
        qrImage: null,
      },
    },
    pricing: {
      startingPriceInLakhs: null, // Unverified -> renders "Price on Application"
      verified: false,
    },
    priceStartingPerCent: {
      value: null,
      verified: false,
    },
    facts: Object.assign(
      [
        { label: "Corridor", value: "Saravanampatti IT Hub", verified: true },
        { label: "Proximity", value: "Near CHIL SEZ IT Park", verified: true },
        { label: "Road Width", value: "33 & 40 ft Paved Corridors", verified: true },
        { label: "Infrastructure", value: "Underground Drainage & Lighting", verified: true },
      ],
      {
        totalPlots: 64,
        zoning: "Residential Plotted",
      }
    ),
    gallery: [
      {
        src: "/images/projects/tech-valley.png",
        alt: "Tech Valley — Architectural Street View",
        isRender: true,
      },
      {
        src: "/images/projects/interior.png",
        alt: "Tech Valley — Contemporary Residential Planning",
        isRender: true,
      },
      {
        src: "/images/projects/blueprint.png",
        alt: "Tech Valley — Internal Avenue Landscaping",
        isRender: true,
      },
    ],
  },
];

export const PROJECTS = PROJECTS_CONFIG;

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  return PROJECTS_CONFIG.find((p) => p.slug === slug);
}
