import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_META } from "@/lib/constants";
import ArchivePage from "@/app/components/ArchivePage";
import { allProjects } from "@/lib/featured";

export const metadata: Metadata = pageMetadata({
  title: PAGE_META.portfolio.title,
  description: PAGE_META.portfolio.description,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <ArchivePage
      initial="all"
      title="Everything I've shipped."
      intro={`${allProjects.length} web and mobile apps for real businesses and real users. Filter by type or by the tools behind them.`}
    />
  );
}
