import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Softjit Singh — Websites & Apps for Your Business",
  description:
    "Professional business websites delivered in 5 days. Web apps, mobile apps, and AI automation for restaurants, shops, salons, clinics, and wholesalers in Amritsar and across India.",
  alternates: { canonical: "/hire" },
};

export default function HirePage() {
  return <HireClient />;
}

import HireClient from "./HireClient";
