import { Project } from "@/types";

export const mobileProjects: Project[] = [

  {
    slug: "cityguard",
    title: "CityGuard",
    type: "Mobile App",
    description: "AI-powered mobile crime reporting system with Google Gemini image analysis, real-time crime heatmaps, and one-tap Emergency SOS location broadcasting.",
    techStack: ["React Native", "Expo", "Supabase", "Google Gemini AI", "Google Maps API"],
    bulletPoints: [
      "Integrated Google Gemini AI for automated crime severity classification and forensic document analysis via image recognition.",
      "Engineered a real-time crime heatmap on Google Maps API using crowdsourced geolocation data and Supabase Realtime synchronization.",
      "Implemented a one-tap Emergency SOS system broadcasting the user's real-time location to registered contacts and local authorities instantly."
    ],
    image: "/projects/cityguard.png",
    link: "https://github.com/SOFTJIT-SINGH/CityGuard",
  },
  {
    slug: "bidnexus",
    title: "BidNexus",
    type: "Mobile App",
    description: "Real-time mobile auction platform with concurrent bidding, optimistic UI updates, and PostgreSQL row-level security for tenant data isolation.",
    techStack: ["React Native", "Expo", "Supabase", "PostgreSQL", "WebSockets"],
    bulletPoints: [
      "Engineered a real-time bidding engine with optimistic UI updates and conflict resolution for concurrent bid handling.",
      "Implemented PostgreSQL row-level security (RLS) policies to ensure strict tenant data isolation.",
      "Architected WebSocket-based real-time synchronization, preventing stale bid states during peak auction activity (sub-100ms state synchronization)."
    ],
    image: "/projects/bidnexus.png",
    link: "https://github.com/SOFTJIT-SINGH/BidNexus",
  },
  {
    slug: "routesync",
    title: "RouteSync",
    type: "Mobile App",
    description: "Cross-platform mobile travel companion synchronizing group itineraries and real-time route updates with Supabase Realtime.",
    techStack: ["React Native", "Expo", "Supabase", "PostgreSQL"],
    bulletPoints: [
      "Architected a cross-platform mobile travel companion enabling real-time location sharing and concurrent user updates.",
      "Implemented low-latency state synchronization for group itineraries using Supabase Realtime.",
      "Designed a secure relational PostgreSQL backend to manage itinerary data, route updates, and user presence."
    ],
    image: "/projects/routesync.png",
    link: "https://github.com/SOFTJIT-SINGH/RouteSync",
  },
  {
    slug: "examai",
    title: "ExamAI",
    type: "Mobile App",
    description: "Automated AI-powered remote exam proctoring system with real-time behavior detection and concurrent media stream processing.",
    techStack: ["React Native", "Expo", "Supabase", "Google Generative AI"],
    bulletPoints: [
      "Engineered a client-side behavior evaluation system (camera monitoring, microphone analysis, and tab-switching detection) using AI Web APIs.",
      "Optimized front-end performance to process concurrent media and data streams smoothly without degrading UI responsiveness.",
      "Automated the flagging of non-compliant behavior during live remote examinations."
    ],
    image: "/projects/examai.png",
    link: "https://github.com/SOFTJIT-SINGH/ExamAI",
  },
  {
    slug: "agrotech",
    title: "AgroTech",
    type: "Mobile App",
    description: "AI-driven mobile agricultural assistant with crop disease detection, yield prediction, and real-time weather advisories via Google Generative AI.",
    techStack: ["React Native", "Expo", "Supabase", "Google Generative AI"],
    bulletPoints: [
      "Automated crop disease detection and yield prediction through AI image analysis utilizing Google Generative AI.",
      "Engineered an offline-capable crop library and community forum optimized for low-connectivity rural environments.",
      "Integrated real-time weather advisories via a scalable Supabase backend."
    ],
    image: "/projects/agrotech.jpg",
    link: "https://github.com/SOFTJIT-SINGH/AgroTech",
  },
  {
    slug: "attendauth",
    title: "AttendAuth",
    type: "Mobile App",
    description: "Cross-platform attendance authentication system with multi-tier RBAC, concurrent logging, and automated academic reporting.",
    techStack: ["React Native", "Expo", "Supabase", "Zustand"],
    bulletPoints: [
      "Implemented strict role-based access control (RBAC) for students, staff, and administrators within a cross-platform application.",
      "Engineered concurrent attendance logging, real-time class scheduling, and automated academic reporting workflows via Supabase.",
      "Managed client-side application state using Zustand for offline-capable attendance capture."
    ],
    image: "/projects/attendauth.jpg",
    link: "https://github.com/SOFTJIT-SINGH/AttendAuth",
  }
];

export const webProjects: Project[] = [
  {
    slug: "healchakra",
    title: "HealChakra",
    type: "Web Application",
    description: "Real-time mental wellness consultation platform with LiveKit WebRTC video/voice/chat, per-minute wallet billing, and multi-role access for 500+ concurrent users.",
    techStack: ["Next.js 16", "LiveKit WebRTC", "Supabase", "PostgreSQL", "Zod 4"],
    bulletPoints: [
      "Architected a production SaaS platform supporting 500+ concurrent users with <150ms p75 media latency via LiveKit WebRTC.",
      "Eliminated double-charge race conditions during concurrent sessions using PostgreSQL row-level locks and idempotent payment reconciliation.",
      "Developed 20+ API domains including wallet billing, crisis escalation, and push notifications, securing all endpoints with Zod 4 schema validation and RBAC.",
      "Reduced p95 API query execution time by 38% through targeted PostgreSQL indexing."
    ],
    image: "/projects/healchakra.png",
    link: "https://github.com/SOFTJIT-SINGH/HealChakra",
  },
  {
    slug: "secretsoulmate",
    title: "SecretSoulmate",
    type: "Web Application",
    description: "AI-powered compatibility platform with Google Gemini chemistry evaluation, real-time matching, and Redis-backed infrastructure.",
    techStack: ["Next.js 16", "Supabase", "PostgreSQL", "Drizzle ORM", "Google Gemini AI", "Redis", "Zod 4"],
    bulletPoints: [
      "Engineered a Gemini AI chemistry evaluation system analyzing user profiles for intelligent compatibility scoring and match recommendations.",
      "Implemented real-time presence and matching using Supabase Realtime with Redis-backed rate limiting via Upstash.",
      "Architected a secure PostgreSQL schema with Drizzle ORM, row-level security, and Zod 4 server-side validation.",
      "Built a mission-based interaction system driving meaningful conversations through AI-generated prompts."
    ],
    image: "/projects/secretsoulmate.png",
    link: "https://github.com/SOFTJIT-SINGH/SecretSoulmate",
  },
  {
    slug: "bhojpos",
    title: "BhojPOS",
    type: "Web Application",
    description: "Multi-tenant B2B Point-of-Sale and digital E-menu platform serving multiple restaurant clients with isolated data and real-time inventory management.",
    techStack: ["Next.js", "MongoDB", "Express.js", "Redis", "JWT"],
    bulletPoints: [
      "Architected a multi-tenant B2B SaaS platform with per-client data isolation and custom branding, serving multiple restaurant clients in daily production.",
      "Engineered an Express.js catalog API handling 5K+ monthly requests with a Redis caching layer, reducing average response time by 44% (320ms to 180ms).",
      "Secured 30+ API routes with JWT authentication and strict role-based access control (RBAC).",
      "Achieved 90%+ unit test coverage across backend services using Vitest."
    ],
    image: "/projects/bhojpos.png",
    link: "https://github.com/SOFTJIT-SINGH/BhojPOS",
  },
  
  {
    slug: "beheights",
    title: "BeHeights",
    type: "Web Application",
    description: "Full-stack institutional management dashboard with library tracking, resource issuance, and multi-tenant administrative routing.",
    techStack: ["Next.js 16", "React 19", "MongoDB", "NextAuth.js"],
    bulletPoints: [
      "Engineered a high-performance institutional management dashboard for resource issuance and staff tracking.",
      "Designed a flexible, schema-driven backend using MongoDB optimized for complex administrative workflows.",
      "Secured multi-tenant administrative routing and multi-role access control using NextAuth.js."
    ],
    image: "/projects/beheights.png",
    link: "https://github.com/SOFTJIT-SINGH/BeHeights",
  },
  {
    slug: "fantasy",
    title: "Fantasy",
    type: "Web Application",
    description: "High-concurrency social matching and creator subscription platform with real-time state synchronization.",
    techStack: ["Next.js 16", "React 19", "Supabase", "Framer Motion", "Tailwind CSS"],
    bulletPoints: [
      "Engineered a smart discovery matching engine utilizing PostgreSQL and Supabase.",
      "Implemented real-time state synchronization for active users, chat matches, and daily login streaks.",
      "Designed fluid, high-performance UI micro-interactions using Framer Motion.",
      "Developed a role-based gated content system for creator subscriptions."
    ],
    image: "/projects/fantasy.png",
    link: "Datekaro.vercel.app",
  }
];