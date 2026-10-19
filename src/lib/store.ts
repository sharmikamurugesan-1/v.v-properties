export type LeadStatus = "new" | "contacted" | "site_visit" | "converted" | "archived";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  project: string;
  budget?: string;
  visitDate?: string;
  notes?: string;
  status: LeadStatus;
  adminNotes?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  ip?: string;
}

export type NewLead = Omit<Lead, "id" | "status" | "createdAt" | "updatedAt"> & {
  status?: LeadStatus;
};

export interface ProjectSettings {
  slug: string;
  dtcpNumber: string | null;
  reraNumber: string | null;
  startingPriceInLakhs: number | null;
  plotSizesCent: string | null;
  verified: {
    dtcp: boolean;
    rera: boolean;
    pricing: boolean;
  };
}

export interface SiteSettings {
  company: {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    officeAddress: string | null;
    verified: boolean;
  };
  projects: Record<string, ProjectSettings>;
  updatedAt: string;
}

export interface PlotRecord {
  id: string;
  projectSlug: string;
  plotNumber: string;
  cents: number;
  facing: "North" | "East" | "South" | "West";
  status: "available" | "booked" | "hold";
  updatedAt: string;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface IStoreAdapter {
  getLeads(): Promise<Lead[]>;
  addLead(lead: NewLead): Promise<Lead>;
  updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null>;
  deleteLead(id: string): Promise<boolean>;
  getSettings(): Promise<SiteSettings>;
  saveSettings(settings: DeepPartial<SiteSettings>): Promise<SiteSettings>;
  getPlots(): Promise<PlotRecord[]>;
  updatePlot(id: string, status: "available" | "booked" | "hold"): Promise<PlotRecord | null>;
}

export { store } from "./store-json";
