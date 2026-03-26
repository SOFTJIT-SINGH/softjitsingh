import Hero from "./components/Hero";
import MobileAppCard from "./components/MobileAppCard";
import WebAppCard from "./components/WebAppCard";
import Footer from "./components/Footer";
import { mobileProjects, webProjects } from "../lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      <Hero />

      {/* Mobile Apps Section */}
      <section id="mobile-apps" className="relative w-full bg-zinc-950 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">Mobile Ecosystem</h2>
            <p className="text-xl text-gray-400">Native performance powered by AI.</p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {mobileProjects.map((project, idx) => (
              <MobileAppCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Web Apps Section */}
      <section id="web-apps" className="relative w-full bg-black py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">Web Architecture</h2>
            <p className="text-xl text-gray-400">Scalable full-stack platforms built with Next.js 15.</p>
          </div>

          <div className="space-y-32">
            {webProjects.map((project) => (
              <WebAppCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
    </main>
  );
}