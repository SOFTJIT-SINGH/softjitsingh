import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { mobileProjects, webProjects } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const allProjects = [...mobileProjects, ...webProjects];
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isMobile = project.type.includes("Mobile");

  return (
    <div className="relative min-h-screen bg-black text-gray-100 font-sans overflow-hidden">
      
      {/* Immersive Cinematic Background */}
      <div className="absolute inset-0 z-0 opacity-30 blur-[150px] pointer-events-none select-none">
        {project.image && <Image src={project.image} alt="Background glow" fill className="object-cover" />}
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/90 to-black pointer-events-none"></div>

      <div className="relative z-10 p-8 md:p-20 max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group text-sm font-medium">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> 
          </div>
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <div className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-4 drop-shadow-md">{project.type}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter text-white drop-shadow-lg">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((t, i) => (
              <span key={i} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 backdrop-blur-md">
                {t}
              </span>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-10">
            {project.description}
          </p>

          <ul className="space-y-4 max-w-3xl">
            {project.bulletPoints?.map((point, i) => (
              <li key={i} className="flex items-start gap-4 text-gray-300">
                <span className="text-blue-500 mt-1.5 text-xl">▹</span>
                <span className="text-lg leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Image Presentation */}
        <div className="w-full flex justify-center mb-16 relative">
          {/* Spotlight behind the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          {isMobile ? (
             <div className="relative w-full max-w-md aspect-[9/16] rounded-[3rem] border-4 border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden p-1.5 ring-1 ring-white/10 z-10 hover:scale-[1.02] transition-transform duration-500">
               <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-black">
                 {project.image ? (
                   <Image src={project.image} alt={project.title} fill className="object-cover" priority />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 text-sm font-semibold uppercase tracking-widest border border-zinc-800 rounded-[2.6rem]">{project.title} Pending</div>
                 )}
               </div>
             </div>
          ) : (
             <div className="relative w-full aspect-video rounded-xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden group z-10">
               {project.image ? (
                 <Image src={project.image} alt={project.title} fill className="object-cover object-top group-hover:object-bottom transition-all duration-[10s] ease-in-out" priority />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-zinc-600 font-bold text-3xl uppercase tracking-widest p-8 text-center border-t border-zinc-800">
                   <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-inner mb-4">
                     <div className="w-10 h-10 bg-blue-500/20 rounded-full blur-md"></div>
                   </div>
                   {project.title}
                 </div>
               )}
             </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="flex justify-center mt-16 pt-12 border-t border-white/10">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            <FaGithub size={22} /> 
            <span>View Source Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}