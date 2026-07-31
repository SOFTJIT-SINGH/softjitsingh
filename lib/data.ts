import { Project } from "@/types";

export const mobileProjects: Project[] = [

  {
    slug: "cityguard",
    title: "CityGuard",
    type: "Mobile App",
    description: "Built an AI crime-reporting mobile app in 8 weeks — Gemini classifies severity from a single photo, SOS broadcasts live GPS to contacts and authorities in under 1 second.",
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
    description: "Built a real-time auction mobile app that handled concurrent bids without stale state — sub-100ms sync via WebSockets, RLS-enforced tenant isolation between competing platforms.",
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
    description: "Built a group travel companion that syncs itineraries across devices in real time — every group member sees the same route updates within milliseconds, even on flaky networks.",
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
    description: "Built an AI proctoring system that flags suspicious behavior in real time — runs camera, mic, and tab-switch detection simultaneously without UI lag.",
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
    description: "Built an AI crop assistant for low-connectivity rural areas — Gemini diagnoses plant disease from a photo, weather advisories work offline-first.",
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
    description: "Built an attendance system with multi-tier RBAC for students, staff, and admins — offline-capable logging that syncs when connectivity returns.",
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
    description: "Shipped a real-time mental wellness platform serving 500+ concurrent users in 90 days — fixed a payment double-charge race condition within 2 weeks of launch. <150ms p75 media latency via LiveKit WebRTC.",
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
    description: "Built an AI compatibility platform that scores match chemistry with Gemini — Redis rate limiting keeps abuse out, RLS keeps user data private.",
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
    description: "Shipped a B2B POS in daily production for multiple restaurant clients — 44% response time cut via Redis caching (320ms → 180ms), 90%+ test coverage, 30+ secured API routes.",
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
    description: "Built a multi-tenant institutional dashboard for library tracking and resource issuance — flexible MongoDB schema handles varying admin workflows per tenant.",
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
    description: "Built a high-concurrency social matching platform — real-time presence, chat, and daily login streaks stay consistent across thousands of active users.",
    techStack: ["Next.js 16", "React 19", "Supabase", "Framer Motion", "Tailwind CSS"],
    bulletPoints: [
      "Engineered a smart discovery matching engine utilizing PostgreSQL and Supabase.",
      "Implemented real-time state synchronization for active users, chat matches, and daily login streaks.",
      "Designed fluid, high-performance UI micro-interactions using Framer Motion.",
      "Developed a role-based gated content system for creator subscriptions."
    ],
    image: "/projects/fantasy.png",
    link: "https://github.com/SOFTJIT-SINGH/Fantasy",
  },
  {
    slug: "pseudotek",
    title: "Pseudotek Solutions",
    type: "Web Application",
    description: "Built the corporate site for Pseudotek Solutions — 5-page Next.js 16 site, zero-backend WhatsApp lead capture, theme persistence across sessions.",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    bulletPoints: [
      "Built the complete site architecture using Next.js 16 App Router with server/client component separation and dark/light theme persistence.",
      "Implemented scroll-triggered animated counters and reveal-on-scroll micro-interactions using IntersectionObserver for performance.",
      "Designed a zero-backend lead capture system via WhatsApp deep links with structured form-to-message encoding, eliminating server-side infrastructure."
    ],
    image: "/projects/pseudotek.png",
    link: "https://pseudotek.in",
  },
  {
    slug: "omsweets",
    title: "OmSweets BYOB",
    type: "Web Application",
    description: "Full-stack sweet shop e-commerce for a premium Amritsar sweet shop — Razorpay payments, Cloudinary imagery, and a complete ordering pipeline. Also used as a 12-session teaching build-along.",
    techStack: ["Next.js 16", "MongoDB", "Mongoose", "Razorpay", "Cloudinary", "Zustand", "Zod 4"],
    bulletPoints: [
      "Built a complete e-commerce platform with product catalog, order management, and customer tracking for a real sweet shop business.",
      "Integrated Razorpay payment gateway for secure online transactions with Zod 4 validation on all inputs.",
      "Developed a 12-session teaching build-along curriculum from the project, used in full-stack web development course."
    ],
    image: "/projects/omsweets.png",
    link: "",
  },
  {
    slug: "ksarts",
    title: "KSARTS AI",
    type: "Web Application",
    description: "AI-driven textile decision support system — Random Forest sales prediction, TimeSeries demand forecasting, K-Means customer segmentation, and Apriori bundle recommendations via a decoupled Python Flask ML microservice.",
    techStack: ["Next.js 16", "Python", "Flask", "MongoDB Atlas", "Scikit-Learn", "Cloudinary"],
    bulletPoints: [
      "Architected a decoupled DSS with Next.js 16 frontend and Python Flask ML microservice for a textile wholesale business.",
      "Implemented 4 ML modules: Random Forest sales prediction, TimeSeries demand forecasting, K-Means customer segmentation, and Apriori association mining.",
      "Built interactive dashboard with real-time AI insights, inventory alerts, and customer segmentation visualizations."
    ],
    image: "/projects/ksarts.png",
    link: "",
  },
  {
    slug: "cryptosher",
    title: "CryptoSher",
    type: "Web Application",
    description: "Real-time cryptocurrency market dashboard — live CoinGecko prices, gold/silver rates, JWT-authenticated watchlists, 2-level referral network, and Razorpay checkout.",
    techStack: ["Next.js 16", "MongoDB", "Mongoose", "JWT", "Razorpay", "shadcn/ui"],
    bulletPoints: [
      "Integrated live crypto prices from CoinGecko API and precious metal rates from Aurumrates API with interactive Recharts price charts.",
      "Built a 2-level referral network with commission tracking and JWT-based authentication using httpOnly cookies and bcryptjs.",
      "Implemented Razorpay payment checkout with personalized watchlists, order history, and mobile-first responsive design."
    ],
    image: "/projects/cryptosher.png",
    link: "",
  },
  {
    slug: "meharfoods",
    title: "Mehar Foods",
    type: "Web Application",
    description: "Production wholesale food supply platform for an Amritsar distributor — real-time order tracking via Socket.io, automated PDF invoices, email notifications, and Razorpay payments.",
    techStack: ["Next.js 16", "Express.js", "Socket.io", "MongoDB", "Razorpay", "PDFKit", "Nodemailer"],
    bulletPoints: [
      "Built a full-stack food supply platform with Express.js REST API and Socket.io real-time order tracking for a wholesale distributor.",
      "Implemented automated PDF invoice generation via PDFKit and email notifications through Nodemailer/Resend integration.",
      "Integrated Razorpay payments, Upstash Redis rate limiting, and TanStack Query for production-grade server state management."
    ],
    image: "/projects/meharfoods.png",
    link: "",
  },
  {
    slug: "salonflow",
    title: "SalonFlow",
    type: "Web Application",
    description: "Complete salon management platform — appointment booking, staff scheduling, client management, Chart.js analytics, and Cloudinary portfolio storage.",
    techStack: ["Next.js 16", "MongoDB", "Mongoose", "Cloudinary", "Chart.js", "shadcn/ui"],
    bulletPoints: [
      "Developed a full salon management system with appointment booking, staff scheduling, and client management features.",
      "Integrated Chart.js analytics dashboard for revenue tracking, performance metrics, and business insights.",
      "Implemented Cloudinary image storage for portfolio photos, dark/light theme via next-themes, and Zod 4 form validation with React Hook Form."
    ],
    image: "/projects/salonflow.png",
    link: "",
  },
  {
    slug: "dcdacademy",
    title: "DCD Academy",
    type: "Web Application",
    description: "Built the marketing site for a technology education institute — 8-course catalog, franchise inquiry pipeline, Nodemailer lead form with HTML sanitization.",
    techStack: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "Nodemailer"],
    bulletPoints: [
      "Designed and built the complete 5-page marketing site with course catalog, franchise inquiry pipeline, and FAQ system for a technology education institute.",
      "Integrated Nodemailer SMTP for contact form submissions with HTML sanitization and server-side validation for production reliability.",
      "Set up GitHub Actions CI pipeline for automated lint and build verification on every push and pull request."
    ],
    image: "/projects/dcdacademy.png",
    link: "https://dcdeducam.com",
  }
];