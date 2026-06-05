import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import MetricsBanner from "./components/MetricsBanner";
import HomepageAbout from "./components/HomepageAbout";
import JourneyTimeline from "./components/JourneyTimeline";
import MethodologySection from "./components/MethodologySection";
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
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white selection:text-black overflow-x-hidden pt-16">
      
      <Hero />
      <TechMarquee />
      <MetricsBanner />
      <HomepageAbout />
      <JourneyTimeline />

      <div id="projects" className="w-full bg-[#050505] py-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-24">
            <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">01. Mobile Engineering</h2>
            <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">High-performance native applications built with React Native and modern APIs.</p>
          </div>

          <div className="space-y-48">
            {featuredMobileApps.map((project, idx) => (
              <MobileAppCard key={project.title} project={project} index={idx} />
            ))}
          </div>
          
          <div className="mt-24 pb-24 border-b border-white/10">
            <Link href="/mobile-work" className="inline-flex items-center gap-3 text-sm font-medium text-white hover:text-gray-300 transition-colors">
              View All Mobile Work <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div id="web-apps" className="w-full bg-[#050505] pt-12 pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-24">
            <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">02. Web Architecture</h2>
            <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">Scalable full-stack platforms built with Next.js and robust backend systems.</p>
          </div>

          <div className="space-y-48">
            {featuredWebApps.map((project) => (
              <WebAppCard key={project.title} project={project} />
            ))}
          </div>
          
          <div className="mt-32 border-t border-white/10 pt-16 flex flex-col items-center">
            <Link href="/web-work" className="px-8 py-4 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors">
              View All Web Work
            </Link>
          </div>
        </div>
      </div>

      <MethodologySection />
      <Footer />
      
    </main>
  );
}