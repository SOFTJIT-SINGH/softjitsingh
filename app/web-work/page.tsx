import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_META } from "@/lib/constants";
import ArchivePage from "@/app/components/ArchivePage";

export const metadata: Metadata = pageMetadata({
  title: PAGE_META.webWork.title,
  description: PAGE_META.webWork.description,
  path: "/web-work",
});

export default function WebWorkPage() {
  return (
    <ArchivePage
      initial="web"
      title="Web platforms."
      intro="Production Next.js platforms: real-time video, multi-tenant POS, e-commerce, dashboards and AI tools."
    />
  );
}
