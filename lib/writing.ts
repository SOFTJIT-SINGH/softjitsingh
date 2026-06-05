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
  }
];
