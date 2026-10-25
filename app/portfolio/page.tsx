import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import ArchivePage from "@/app/components/ArchivePage";

export const metadata: Metadata = {
  title: PAGE_META.portfolio.title,
  description: PAGE_META.portfolio.description,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <ArchivePage
      initial="all"
      title="Everything I've shipped."
      intro="Eighteen web and mobile apps for real businesses and real users. Filter by type or by the tools behind them."
    />
  );
}
