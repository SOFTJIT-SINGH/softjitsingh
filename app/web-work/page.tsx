import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import ArchivePage from "@/app/components/ArchivePage";

export const metadata: Metadata = {
  title: PAGE_META.webWork.title,
  description: PAGE_META.webWork.description,
  alternates: { canonical: "/web-work" },
};

export default function WebWorkPage() {
  return (
    <ArchivePage
      initial="web"
      title="Web platforms."
      intro="Production Next.js platforms: real-time video, multi-tenant POS, e-commerce, dashboards and AI tools."
    />
  );
}
