import { SITE } from "@/lib/constants";

const milestones = [
  {
    when: "Jun 2024",
    title: "Full-Stack Developer Intern @ Pseudotek Solutions",
    body: "Part-time and remote, while starting my MCA. Thrown straight into client work.",
  },
  {
    when: "2024",
    title: "First production ship",
    body: "BhojPOS went live for real restaurants. Learned multi-tenant isolation, Redis caching, and 3–5 day delivery cycles the hard way.",
  },
  {
    when: "2025",
    title: "Started freelancing",
    body: "OmSweets (sweet shop e-commerce), Mehar Foods (wholesale supply), SalonFlow (salon management), KSARTS AI (textile ML).",
  },
  {
    when: "Early 2026",
    title: "Software Engineer (SDE-1) & Teacher @ Pseudotek",
    body: "Promoted to SDE-1, building production platforms end to end, while teaching a 110-session live course on Next.js 16, React 19, Supabase Auth, Drizzle ORM and Zod 4.",
  },
  {
    when: "2026",
    title: "MCA @ Guru Nanak Dev University",
    body: "Finished with an 8.56 CGPA, after two years of shipping production software alongside the coursework.",
  },
  {
    when: "2026",
    title: `${SITE.employer.title} @ ${SITE.employer.name}`,
    body: "Software developer at an immigration consultancy in Amritsar, Punjab.",
  },
  ...(SITE.openToWork
    ? [
        {
          when: "Now",
          title: "Open to new roles",
          body: "Looking for a full-stack or mobile engineering role, and taking on freelance projects.",
        },
      ]
    : []),
];

export default function Journey() {
  return (
    <ol className="relative border-l border-line ml-1.5">
      {milestones.map((m, i) => {
        const latest = i === milestones.length - 1;
        return (
          <li key={m.title} className="relative pl-7 pb-9 last:pb-0">
            <span
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border ${
                latest ? "border-amber bg-amber" : "border-mint bg-night"
              }`}
              aria-hidden="true"
            />
            <p className={`font-mono text-[11px] mb-1.5 ${latest ? "text-amber" : "text-mint"}`}>{m.when}</p>
            <h3 className="font-serif text-xl tracking-tight mb-1.5">{m.title}</h3>
            <p className="text-sm text-mist leading-relaxed max-w-lg">{m.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
