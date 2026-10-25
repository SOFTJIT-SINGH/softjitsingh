import { mobileProjects, webProjects } from "./data";

// Ordered the way the site presents work: web first, then mobile.
export const allProjects = [...webProjects, ...mobileProjects];
export const projectFor = (slug: string) => allProjects.find((p) => p.slug === slug);

export type Featured = { slug: string; story: string; post: string; file: string; code: string };

export const featured: Featured[] = [
  {
    slug: "healchakra",
    story:
      "A mental-wellness platform where people talk to therapists over video, voice and chat, billed by the minute from a wallet. Two session-end events firing at once used to charge people twice, so I moved the deduction behind PostgreSQL row-level locks. It now holds 500+ concurrent users at under 150ms media latency.",
    post: "healchakra-row-level-locks",
    file: "wallet/deduct.sql",
    code: `begin;
select balance from wallets
  where user_id = $1
  for update;  -- a second session-end waits here
update wallets set balance = balance - $2
  where user_id = $1;
commit;`,
  },
  {
    slug: "bhojpos",
    story:
      "A point-of-sale system for restaurants. Every client gets their own isolated data and branding, and it runs through daily service. Putting Redis in front of the catalog API took average response time from 320ms to 180ms.",
    post: "bhojpos-redis-caching",
    file: "catalog/menu.ts",
    code: `const key = \`menu:\${tenantId}\`;
const hit = await redis.get(key);
if (hit) return JSON.parse(hit);  // the fast path
const menu = await Menu.find({ tenantId });
await redis.set(key, JSON.stringify(menu), "EX", TTL);
return menu;`,
  },
  {
    slug: "cityguard",
    story:
      "A crime-reporting app I built in eight weeks. Snap a photo and Gemini grades how serious it is. The SOS button sends your live location to your contacts and local authorities in under a second.",
    post: "cityguard-subsecond-sos-gemini",
    file: "sos/broadcast.ts",
    code: `const { coords } = await Location.getCurrentPositionAsync();
await supabase
  .channel(\`sos:\${userId}\`)
  .send({ type: "broadcast", event: "sos", payload: coords });
// contacts are already subscribed, no polling`,
  },
];

// One-line hook per project: what it does for a person, in plain words. Shown on every homepage card.
export const hooks: Record<string, string> = {
  healchakra: "Therapy over video, billed by the minute",
  secretsoulmate: "Gemini scores how well two people match",
  bhojpos: "Runs real restaurants through the dinner rush",
  beheights: "Library and resource tracking for institutes",
  fantasy: "Real-time matching, chat and daily streaks",
  pseudotek: "Corporate site with zero-backend WhatsApp leads",
  omsweets: "Online orders for an Amritsar sweet shop",
  ksarts: "Forecasts sales for a textile business",
  cryptosher: "Live crypto and gold prices, with watchlists",
  meharfoods: "Wholesale orders tracked live, invoices automatic",
  salonflow: "Bookings, staff and revenue for salons",
  dcdacademy: "Course catalog and franchise leads for an institute",
  cityguard: "Photo to AI severity grade, SOS in under a second",
  bidnexus: "Live auctions without a single stale bid",
  routesync: "Group trips that stay in sync on every phone",
  examai: "Flags cheating during remote exams, live",
  agrotech: "Diagnoses crop disease from one photo",
  attendauth: "Attendance with role-based access, works offline",
};
