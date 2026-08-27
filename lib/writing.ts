export interface WritingPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const writingPosts: WritingPost[] = [
  {
    slug: "healchakra-row-level-locks",
    title: "How PostgreSQL Row-Level Locks Eliminated Payment Race Conditions in a Real-Time Consultation Platform",
    description: "How row-level locks in PostgreSQL eliminated double-charge race conditions in a production real-time wallet billing system handling 500+ concurrent users.",
    date: "June 2026",
    readTime: "5 min read",
    tags: ["PostgreSQL", "System Design", "Payment Systems", "Concurrency"]
  },
  {
    slug: "bhojpos-redis-caching",
    title: "How Redis Caching Cut API Latency by 44% in a Multi-Tenant Restaurant POS",
    description: "From 320ms to 180ms average response time on an Express.js catalog API handling 5K+ monthly requests across isolated restaurant tenants.",
    date: "June 2026",
    readTime: "5 min read",
    tags: ["Redis", "Caching", "Performance", "Node.js"]
  },
  {
    slug: "bidnexus-optimistic-ui",
    title: "Optimistic UI and Conflict Resolution in a Real-Time Auction Platform",
    description: "How BidNexus handles concurrent bids with instant UI feedback, WebSocket state synchronization, and conflict resolution without showing stale data.",
    date: "June 2026",
    readTime: "6 min read",
    tags: ["Real-Time", "WebSockets", "State Management", "React Native"]
  },
  {
    slug: "secretsoulmate-gemini-ai",
    title: "Building an AI-Powered Compatibility Engine with Google Gemini",
    description: "How SecretSoulmate uses Gemini for personality chemistry evaluation, structured prompt engineering for deterministic scoring, and Redis-cached match analytics.",
    date: "June 2026",
    readTime: "6 min read",
    tags: ["AI", "Gemini", "Prompt Engineering", "Caching"]
  },
  {
    slug: "cityguard-subsecond-sos-gemini",
    title: "Architecting Sub-Second SOS Broadcasts and Gemini Image Classification",
    description: "How I engineered a life-critical emergency system handling concurrent distress signals with zero dropped frames, backed by real-time WebSockets and Zod runtime validation.",
    date: "August 2026",
    readTime: "6 min read",
    tags: ["WebSockets", "Supabase", "Gemini", "Zod"]
  },
  {
    slug: "routesync-offline-first-sync",
    title: "Mastering Offline-First State Synchronization for Concurrent Group Travel",
    description: "How I solved the split-brain problem in RouteSync using optimistic UI updates and Supabase Realtime conflict resolution.",
    date: "August 2026",
    readTime: "5 min read",
    tags: ["Offline-First", "State Sync", "Supabase", "React Native"]
  },
  {
    slug: "ksarts-decoupled-ml-microservices",
    title: "Decoupling Python ML Microservices from Next.js 16",
    description: "Architecting a production pipeline for real-time textile demand forecasting without blocking the main web application thread.",
    date: "August 2026",
    readTime: "7 min read",
    tags: ["Next.js", "Python", "Microservices", "System Design"]
  },
  {
    slug: "fantasy-high-concurrency-presence",
    title: "Handling High-Concurrency Presence and Real-Time Matching on a Social Web Platform",
    description: "How Fantasy keeps thousands of active users, chat states, and daily login streaks perfectly synchronized without collapsing under load.",
    date: "August 2026",
    readTime: "6 min read",
    tags: ["Supabase", "WebSockets", "Concurrency", "Next.js"]
  },
  {
    slug: "meharfoods-socketio-async-pipelines",
    title: "Real-Time Order Tracking and Async PDF Pipelines in a Production Food Supply Platform",
    description: "How Mehar Foods handles live order status broadcasts, automated invoice generation, and rate-limited payment processing without blocking the main server thread.",
    date: "August 2026",
    readTime: "6 min read",
    tags: ["Socket.io", "Node.js", "Redis", "Express.js"]
  },
  {
    slug: "beheights-multitenant-mongodb-schema",
    title: "Designing Flexible Multi-Tenant MongoDB Schemas for Institutional SaaS",
    description: "How BeHeights models wildly different administrative workflows across tenants without separate databases or endless migration scripts.",
    date: "August 2026",
    readTime: "5 min read",
    tags: ["MongoDB", "Multi-Tenant", "SaaS", "RBAC"]
  }
];
