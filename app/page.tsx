import Hero from "./components/Hero";
import MobileAppCard from "./components/MobileAppCard";
import WebAppCard from "./components/WebAppCard";
import Footer from "./components/Footer";
import { mobileProjects, webProjects } from "../lib/data";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  // Grab the first 3 mobile apps to feature
  const featuredMobileApps = mobileProjects.slice(0, 3);
  // Grab all web apps (you have 2)
  const featuredWebApps = webProjects;

  return (
    <main className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <Hero />

      {/* MOBILE APPS SECTION 
        The id="mobile-apps" makes the Hero button scroll here!
      */}
      <div id="mobile-apps" className="relative w-full bg-zinc-950 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">Mobile Ecosystem</h2>
            <p className="text-xl text-gray-400">Native performance powered by AI.</p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {featuredMobileApps.map((project, idx) => (
              <MobileAppCard key={project.title} project={project} index={idx} />
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <Link href="/portfolio" className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 transition-colors border border-white/10">
              View All Mobile Apps <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* WEB APPS SECTION 
        The id="web-apps" makes the Hero button scroll here!
      */}
      <div id="web-apps" className="relative w-full bg-black py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">Web Architecture</h2>
            <p className="text-xl text-gray-400">Scalable full-stack platforms built with Next.js 15.</p>
          </div>

          <div className="space-y-32">
            {featuredWebApps.map((project) => (
              <WebAppCard key={project.title} project={project} />
            ))}
          </div>
          
          {/* MASSIVE CALL TO ACTION TO VIEW EVERYTHING */}
          <div className="mt-32 flex justify-center">
            <Link href="/portfolio" className="group flex items-center gap-4 px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              View Full Portfolio Archive <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
      
    </main>
  );
}