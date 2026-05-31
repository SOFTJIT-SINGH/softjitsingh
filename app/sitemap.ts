import type { MetadataRoute } from "next";
import { mobileProjects, webProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProjects = [...mobileProjects, ...webProjects];

  const projectRoutes = allProjects.map((project) => ({
    url: `https://softjit-portfolio.vercel.app/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://softjit-portfolio.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://softjit-portfolio.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://softjit-portfolio.vercel.app/portfolio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://softjit-portfolio.vercel.app/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...projectRoutes,
  ];
}
