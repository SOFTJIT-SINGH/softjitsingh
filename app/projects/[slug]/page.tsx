import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { mobileProjects, webProjects } from "@/lib/data";

// Next.js 15 requires params to be awaited
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  // Await the params for Next.js 15 compatibility
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Combine both arrays to search for the specific project
  const allProjects = [...mobileProjects, ...webProjects];
  const project = allProjects.find((p) => p.slug === slug);

  // If the URL slug doesn't match any project, show a 404 page
  if (!project) {
    notFound();
  }

  // Determine if it's a mobile app to decide image styling
  const isMobile = project.type.includes("Mobile");

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans p-8 md:p-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group">
          <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" /> 
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <div className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4">{project.type}</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white">{project.title}</h1>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((t, i) => (
              <span key={i} className="px-5 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-gray-300">
                {t}
              </span>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Dynamic Image Presentation */}
        <div className="w-full flex justify-center mb-16">
          {isMobile ? (
             // Render vertical phone styling for mobile apps
             <div className="relative w-full max-w-md aspect-[9/16] rounded-[3rem] border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden p-2">
               <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
                 <Image src={project.image} alt={project.title} fill className="object-cover" />
               </div>
             </div>
          ) : (
             // Render wide laptop styling for web apps
             <div className="relative w-full aspect-video rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden group">
               <Image src={project.image} alt={project.title} fill className="object-cover object-top group-hover:object-bottom transition-all duration-[8s]" />
             </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="flex justify-center mt-12 pt-12 border-t border-white/10">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            <FaGithub size={20} /> View Source Code
          </a>
        </div>
      </div>
    </div>
  );
}