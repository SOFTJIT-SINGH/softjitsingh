import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

export default function MoreWork({ projects }: { projects: (Project & { line: string })[] }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p) => {
        const isMobile = p.type.includes("Mobile");
        return (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-night-2/60 overflow-hidden hover:border-mist/40 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[#070b16]">
                {isMobile ? (
                  // Portrait screenshots sit in a small phone outline instead of being cropped to a strip.
                  <div className="absolute inset-0 flex items-end justify-center">
                    <div className="relative w-[38%] h-[115%] translate-y-[22%] rounded-[1.4rem] border-[5px] border-[#1c2440] overflow-hidden transition-transform duration-500 group-hover:translate-y-[16%]">
                      <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="160px" className="object-cover object-top" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={p.image}
                    alt={`${p.title} screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className={`font-mono text-[11px] mb-2 ${isMobile ? "text-amber" : "text-mint"}`}>{p.type.toLowerCase()}</p>
                <h3 className="font-serif text-2xl tracking-tight mb-2 group-hover:text-mint transition-colors">{p.title}</h3>
                <p className="text-sm text-mist leading-relaxed flex-1">{p.line}</p>
                <p className="mt-4 font-mono text-[11px] text-mist/80 truncate">{p.techStack.slice(0, 4).join(" · ")}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
