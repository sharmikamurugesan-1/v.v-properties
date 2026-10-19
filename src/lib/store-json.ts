import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  IStoreAdapter,
  Lead,
  NewLead,
  SiteSettings,
  PlotRecord,
} from "./store";
import { COMPANY } from "@/config/company";
import { PROJECTS_CONFIG } from "@/config/projects";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const PLOTS_FILE = path.join(DATA_DIR, "plots.json");

function ensureDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Atomic file writing:
 * Writes content to a unique temp file, syncs to disk, then renames atomically.
 */
async function atomicWriteJson(filePath: string, data: unknown): Promise<void> {
  ensureDirectory();
  const tempPath = `${filePath}.tmp.${Date.now()}.${crypto.randomBytes(4).toString("hex")}`;
  const serialized = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(tempPath, serialized, "utf-8");
  await fs.promises.rename(tempPath, filePath);
}

async function readJsonOrDefault<T>(filePath: string, defaultFactory: () => T): Promise<T> {
  try {
    ensureDirectory();
    if (fs.existsSync(filePath)) {
      const content = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`[STORE] Failed reading ${filePath}, generating default`, err);
  }
  const defaultVal = defaultFactory();
  await atomicWriteJson(filePath, defaultVal);
  return defaultVal;
}

function getDefaultSettings(): SiteSettings {
  const projectsSettings: SiteSettings["projects"] = {};
  for (const p of PROJECTS_CONFIG) {
    projectsSettings[p.slug] = {
      slug: p.slug,
      dtcpNumber: p.statutory.dtcpNumber,
      reraNumber: p.statutory.reraNumber,
      startingPriceInLakhs: p.pricing.startingPriceInLakhs,
      plotSizesCent: "2.5 – 6.0 Cents",
      verified: {
        dtcp: p.approvals.dtcp.verified,
        rera: p.approvals.rera.verified,
        pricing: p.pricing.verified,
      },
    };
  }

  return {
    company: {
      phone: COMPANY.phone,
      whatsapp: COMPANY.whatsapp,
      email: COMPANY.email,
      officeAddress: COMPANY.officeAddress,
      verified: false,
    },
    projects: projectsSettings,
    updatedAt: new Date().toISOString(),
  };
}

function getDefaultPlots(): PlotRecord[] {
  const plots: PlotRecord[] = [];
  const projects = ["the-garden-city", "tech-valley"];
  const facings: ("North" | "East" | "South" | "West")[] = ["East", "North", "South", "West"];

  for (const proj of projects) {
    for (let i = 1; i <= 24; i++) {
      plots.push({
        id: `${proj}-p${i}`,
        projectSlug: proj,
        plotNumber: `Plot ${i}`,
        cents: 2.5 + ((i % 5) * 0.5),
        facing: facings[i % facings.length],
        status: i % 7 === 0 ? "booked" : i % 11 === 0 ? "hold" : "available",
        updatedAt: new Date().toISOString(),
      });
    }
  }
  return plots;
}

/**
 * JsonStoreAdapter
 * NOTE FOR PRODUCTION: Local JSON persistence operates on local persistent disks (e.g. Node.js VM, VPS, Docker).
 * For stateless/ephemeral serverless hosts (Vercel, AWS Lambda without EFS), replace with a database adapter
 * (e.g. Supabase, Prisma, Firestore) to guarantee durable persistence across instances.
 */
export class JsonStoreAdapter implements IStoreAdapter {
  async getLeads(): Promise<Lead[]> {
    return readJsonOrDefault<Lead[]>(LEADS_FILE, () => []);
  }

  async addLead(newLead: NewLead): Promise<Lead> {
    const leads = await this.getLeads();
    const id = `lead_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
    const now = new Date().toISOString();

    const createdLead: Lead = {
      ...newLead,
      id,
      status: newLead.status || "new",
      createdAt: now,
      updatedAt: now,
    };

    leads.unshift(createdLead);
    await atomicWriteJson(LEADS_FILE, leads);
    return createdLead;
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    const leads = await this.getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const existing = leads[index];
    const updated: Lead = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    leads[index] = updated;
    await atomicWriteJson(LEADS_FILE, leads);
    return updated;
  }

  async deleteLead(id: string): Promise<boolean> {
    const leads = await this.getLeads();
    const filtered = leads.filter((l) => l.id !== id);
    if (filtered.length === leads.length) return false;
    await atomicWriteJson(LEADS_FILE, filtered);
    return true;
  }

  async getSettings(): Promise<SiteSettings> {
    return readJsonOrDefault<SiteSettings>(SETTINGS_FILE, getDefaultSettings);
  }

  async saveSettings(partialSettings: import("./store").DeepPartial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const updated: SiteSettings = {
      ...current,
      updatedAt: new Date().toISOString(),
      company: {
        phone: partialSettings.company?.phone !== undefined ? (partialSettings.company.phone as string | null) : current.company.phone,
        whatsapp: partialSettings.company?.whatsapp !== undefined ? (partialSettings.company.whatsapp as string | null) : current.company.whatsapp,
        email: partialSettings.company?.email !== undefined ? (partialSettings.company.email as string | null) : current.company.email,
        officeAddress: partialSettings.company?.officeAddress !== undefined ? (partialSettings.company.officeAddress as string | null) : current.company.officeAddress,
        verified: partialSettings.company?.verified !== undefined ? Boolean(partialSettings.company.verified) : current.company.verified,
      },
      projects: {
        ...current.projects,
        ...((partialSettings.projects as unknown as SiteSettings["projects"]) || {}),
      },
    };

    await atomicWriteJson(SETTINGS_FILE, updated);
    return updated;
  }

  async getPlots(): Promise<PlotRecord[]> {
    return readJsonOrDefault<PlotRecord[]>(PLOTS_FILE, getDefaultPlots);
  }

  async updatePlot(id: string, status: "available" | "booked" | "hold"): Promise<PlotRecord | null> {
    const plots = await this.getPlots();
    const index = plots.findIndex((p) => p.id === id);
    if (index === -1) return null;

    plots[index] = {
      ...plots[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    await atomicWriteJson(PLOTS_FILE, plots);
    return plots[index];
  }
}

export const store = new JsonStoreAdapter();
