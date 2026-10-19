export interface StatItem {
  label: string;
  value: string;
  verified: boolean;
}

export const STATS_CONFIG: StatItem[] = [
  {
    label: "Families Served",
    value: "TODO", // TODO(client): Real verified count
    verified: false
  },
  {
    label: "Years in Coimbatore",
    value: "TODO", // TODO(client): Verified founding year
    verified: false
  },
  {
    label: "Land Developed (Acres)",
    value: "TODO", // TODO(client): Verified acreage
    verified: false
  }
];

export function getVerifiedStats(): StatItem[] {
  return STATS_CONFIG.filter((s) => s.verified);
}
