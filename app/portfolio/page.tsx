import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: PAGE_META.portfolio.title,
  description: PAGE_META.portfolio.description,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
