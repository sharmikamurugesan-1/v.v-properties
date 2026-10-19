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
  area: string;
  type: string;
  heroImage: string;
  plotLayout: string;
  brochureUrl: string | null;
  approvals: {
    dtcp: ProjectApproval;
    rera: ProjectApproval;
  };
  priceStartingPerCent: {
    value: number | null; // In Lakhs
    verified: boolean;
  };
  facts: ProjectFact[];
  gallery: ProjectGalleryImage[];
}

export const PROJECTS_CONFIG: ProjectConfig[] = [
  {
    slug: 'the-garden-city',
    name: 'The Garden City — Kovilpalayam',
    area: 'Kovilpalayam, Coimbatore',
    type: 'Plotted Layout & Residential Villas',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    plotLayout: 'garden-city-cad',
    brochureUrl: null, // TODO(client): Real brochure URL
    approvals: {
      dtcp: {
        verified: false,
        number: null // TODO(client): Real DTCP approval number
      },
      rera: {
        verified: false,
        number: null, // TODO(client): Real TNRERA registration number
        qrImage: null // TODO(client): /public/rera-qr/the-garden-city.png
      }
    },
    priceStartingPerCent: {
      value: null, // Unverified -> renders "Price on request"
      verified: false
    },
    facts: [
      { label: 'Corridor', value: 'Sathy Road / Kovilpalayam', verified: true },
      { label: 'Road Width', value: '30 & 40 ft Blacktop Roads', verified: true },
      { label: 'Water Provision', value: 'Individual Ground Connection', verified: true },
      { label: 'Loan Pre-clearance', value: 'Nationalised Banks Eligible', verified: true }
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        alt: 'The Garden City — Entrance Portal & Avenue',
        isRender: true
      },
      {
        src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        alt: 'The Garden City — Planned Villa Architecture',
        isRender: true
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        alt: 'The Garden City — Landscaped Open Reserve',
        isRender: true
      }
    ]
  },
  {
    slug: 'tech-valley',
    name: 'Tech Valley — Saravanampatti',
    area: 'Saravanampatti, Coimbatore',
    type: 'Plotted Residential Community',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    plotLayout: 'tech-valley-cad',
    brochureUrl: null, // TODO(client): Real brochure URL
    approvals: {
      dtcp: {
        verified: false,
        number: null // TODO(client): Real DTCP approval number
      },
      rera: {
        verified: false,
        number: null, // TODO(client): Real TNRERA registration number
        qrImage: null // TODO(client): /public/rera-qr/tech-valley.png
      }
    },
    priceStartingPerCent: {
      value: null, // Unverified -> renders "Price on request"
      verified: false
    },
    facts: [
      { label: 'Corridor', value: 'Saravanampatti IT Hub', verified: true },
      { label: 'Proximity', value: 'Near CHIL SEZ IT Park', verified: true },
      { label: 'Road Width', value: '33 & 40 ft Paved Corridors', verified: true },
      { label: 'Infrastructure', value: 'Underground Drainage & Lighting', verified: true }
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tech Valley — Architectural Street View',
        isRender: true
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tech Valley — Contemporary Residential Planning',
        isRender: true
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tech Valley — Internal Avenue Landscaping',
        isRender: true
      }
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  return PROJECTS_CONFIG.find((p) => p.slug === slug);
}
