import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import Link from "next/link";
import { FaArrowLeft, FaGithub } from "react-icons/fa";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  // Find the exact project based on the URL slug
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans p-8 md:p-20">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12">
        <FaArrowLeft className="mr-2" /> Back to Portfolio
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4">{project.type}</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">{project.title}</h1>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {project.tech.map((t, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium">
              {t}
            </span>
          ))}
        </div>

        {/* Massive Hero Image for the Project */}
        <div className="w-full aspect-video bg-gray-900 border border-gray-800 rounded-3xl mb-12 flex items-center justify-center overflow-hidden">
            <span className="text-gray-600">Full App Screenshot / Demo GIF Here</span>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            {project.longDescription}
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-800">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            <FaGithub size={20} /> View Source Code
          </a>
        </div>
      </div>
    </div>
  );
}