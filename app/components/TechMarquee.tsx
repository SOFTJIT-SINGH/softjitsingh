"use client";
import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiNodedotjs, SiTypescript, 
  SiTailwindcss, SiMongodb, SiPostgresql, SiExpress,
  SiLivewire, SiSupabase
} from "react-icons/si";

const technologies = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React Native", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Express", icon: SiExpress },
  { name: "LiveKit", icon: SiLivewire },
  { name: "Supabase", icon: SiSupabase },
];

const TechRow = () => (
  <div className="flex gap-16 pr-16 items-center flex-shrink-0">
    {technologies.map((tech, i) => (
      <div key={i} className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors cursor-default">
        <tech.icon size={24} />
        <span className="text-xl font-bold tracking-tight">{tech.name}</span>
      </div>
    ))}
  </div>
);

export default function TechMarquee() {
  return (
    <div className="w-full bg-[#030303] py-8 border-y border-white/5 overflow-hidden flex relative">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>
      
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <TechRow />
        <TechRow />
      </motion.div>
    </div>
  );
}
