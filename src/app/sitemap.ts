import { MetadataRoute } from "next";
import { PROJECTS } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vvpropertiescbe.com";

  const staticRoutes = [
    "",
    "/projects",
    "/properties",
    "/plot-explorer",
    "/locations",
    "/calculator",
    "/compare",
    "/trust-centre",
    "/contact",
    "/legal/disclaimer",
    "/legal/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = PROJECTS.map((p: { slug: string }) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
