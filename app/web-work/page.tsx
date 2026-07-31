import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import { webProjects } from "@/lib/data";
import WebAppCard from "../components/WebAppCard";

export const metadata: Metadata = {
  title: PAGE_META.webWork.title,
  description: PAGE_META.webWork.description,
  alternates: { canonical: "/web-work" },
};

export default function WebWorkPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white selection:text-black overflow-x-hidden pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <header className="mb-24 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4">
            Web Architecture Archive
          </h1>
          <p className="text-xl font-light text-gray-400 max-w-xl">
            {webProjects.length} production full-stack platforms built with Next.js, TypeScript, and robust backend systems.
          </p>
        </header>

        <div className="space-y-32 max-w-5xl mx-auto">
          {webProjects.map((project) => (
            <WebAppCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
