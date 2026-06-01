import { mobileProjects } from "../../lib/data";
import MobileAppCard from "../components/MobileAppCard";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function MobileWorkPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white selection:text-black overflow-x-hidden pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10">
              <FaArrowLeft size={12} /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4">Mobile Archive</h1>
            <p className="text-xl font-light text-gray-400 max-w-xl">
              A comprehensive collection of high-performance native applications built with React Native.
            </p>
          </div>
        </div>

        <div className="space-y-48">
          {mobileProjects.map((project, idx) => (
            <MobileAppCard key={project.title} project={project} index={idx} />
          ))}
        </div>
        
      </div>
    </main>
  );
}
