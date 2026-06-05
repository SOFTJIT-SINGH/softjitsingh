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
  }
];
