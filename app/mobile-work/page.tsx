import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import { mobileProjects } from "@/lib/data";
import MobileAppCard from "../components/MobileAppCard";

export const metadata: Metadata = {
  title: PAGE_META.mobileWork.title,
  description: PAGE_META.mobileWork.description,
  alternates: { canonical: "/mobile-work" },
};

export default function MobileWorkPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white selection:text-black overflow-x-hidden pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <header className="mb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4">
            Mobile Archive
          </h1>
          <p className="text-xl font-light text-gray-400 max-w-xl">
            {mobileProjects.length} production React Native applications with real-time sync, AI integration, and offline capability.
          </p>
        </header>

        <div className="space-y-32">
          {mobileProjects.map((project, idx) => (
            <MobileAppCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </main>
  );
}
