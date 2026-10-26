import Link from "next/link";

const industries = [
  { name: "Healthcare", what: "Therapy sessions over video, billed by the minute", projects: [["HealChakra", "healchakra"]] },
  {
    name: "Food and restaurants",
    what: "POS, online ordering, wholesale order tracking",
    projects: [["BhojPOS", "bhojpos"], ["OmSweets", "omsweets"], ["Mehar Foods", "meharfoods"]],
  },
  { name: "Public safety", what: "Crime reports graded by AI, one-tap SOS", projects: [["CityGuard", "cityguard"]] },
  {
    name: "Education",
    what: "Attendance, proctoring, institute dashboards",
    projects: [["AttendAuth", "attendauth"], ["ExamAI", "examai"], ["BeHeights", "beheights"], ["DCD Academy", "dcdacademy"]],
  },
  {
    name: "Retail",
    what: "A jewellery storefront, textile sales forecasts",
    projects: [["Shree Radhe Jewellers", "shreejewellers"], ["KSARTS AI", "ksarts"]],
  },
  { name: "Social", what: "AI compatibility scoring, real-time presence", projects: [["SecretSoulmate", "secretsoulmate"], ["Fantasy", "fantasy"]] },
  { name: "Travel and marketplaces", what: "Group itineraries, live auctions", projects: [["RouteSync", "routesync"], ["BidNexus", "bidnexus"]] },
  {
    name: "Local services",
    what: "Salon bookings, crop advice, ad-agency leads",
    projects: [["SalonFlow", "salonflow"], ["AgroTech", "agrotech"], ["DCD Marketing", "dcdmarketing"]],
  },
] as const;

export default function Industries() {
  return (
    <ul data-stagger className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
      {industries.map((ind, i) => (
        <li key={ind.name} className="border-r border-b border-line p-6 hover:bg-night-2/60 transition-colors">
          <p className="font-mono text-[11px] text-mist mb-4">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="font-serif text-xl tracking-tight mb-2">{ind.name}</h3>
          <p className="text-sm text-mist leading-relaxed mb-4">{ind.what}</p>
          <p className="font-mono text-[11px] leading-relaxed">
            {ind.projects.map(([title, slug], j) => (
              <span key={slug}>
                {j > 0 && <span className="text-mist/50"> · </span>}
                <Link href={`/projects/${slug}`} className="text-mint/90 hover:text-cream">
                  {title}
                </Link>
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
