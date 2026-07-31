import Hero from "./components/Hero";
import FeaturedEngagement from "./components/FeaturedEngagement";
import TechMarquee from "./components/TechMarquee";
import MetricsBanner from "./components/MetricsBanner";
import ImpactSection from "./components/ImpactSection";
import HomepageAbout from "./components/HomepageAbout";
import JourneyTimeline from "./components/JourneyTimeline";
import MobileAppCard from "./components/MobileAppCard";
import WebAppCard from "./components/WebAppCard";
import Footer from "./components/Footer";
import { mobileProjects, webProjects } from "../lib/data";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const featuredMobileApps = mobileProjects.slice(0, 3);
  const featuredWebApps = webProjects;

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Hero />
      <FeaturedEngagement />
      <TechMarquee />
      <MetricsBanner />
      <ImpactSection />

      <section id="projects" className="w-full bg-[#050505] py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <header className="mb-20">
            <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">01. Mobile Engineering</h2>
            <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">
              {mobileProjects.length} cross-platform mobile applications built with React Native, Expo, and modern real-time APIs.
            </p>
          </header>

          <div className="space-y-32">
            {featuredMobileApps.map((project, idx) => (
              <MobileAppCard key={project.slug} project={project} index={idx} />
            ))}
          </div>

          <div className="mt-20 pb-16 border-b border-white/10 flex justify-center">
            <Link
              href="/mobile-work"
              className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white text-sm font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all hover:scale-105 active:scale-95"
            >
              View all {mobileProjects.length} mobile apps <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <section id="web-apps" className="w-full bg-[#050505] pt-12 pb-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <header className="mb-20">
            <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">02. Web Architecture</h2>
            <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">
              {webProjects.length} scalable full-stack platforms built with Next.js, TypeScript, and production-grade backend systems.
            </p>
          </header>

          <div className="space-y-32">
            {featuredWebApps.map((project) => (
              <WebAppCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-12 flex flex-col items-center gap-4">
            <Link
              href="/web-work"
              className="px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              View all {webProjects.length} web platforms
            </Link>
            <Link
              href="/portfolio"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Or see all 18 projects in the archive →
            </Link>
          </div>
        </div>
      </section>

      <HomepageAbout />
      <JourneyTimeline />
      <Footer />
    </main>
  );
}
