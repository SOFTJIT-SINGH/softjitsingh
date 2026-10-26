import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_META } from "@/lib/constants";
import ArchivePage from "@/app/components/ArchivePage";

export const metadata: Metadata = pageMetadata({
  title: PAGE_META.mobileWork.title,
  description: PAGE_META.mobileWork.description,
  path: "/mobile-work",
});

export default function MobileWorkPage() {
  return (
    <ArchivePage
      initial="mobile"
      title="Mobile apps."
      intro="Cross-platform React Native apps with real-time sync, offline support and AI features."
    />
  );
}
