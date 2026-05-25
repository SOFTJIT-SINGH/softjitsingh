import { Project } from "@/types";

export const mobileProjects: Project[] = [
  {
    slug: "routesync",
    title: "RouteSync",
    type: "Mobile App",
    description: "A mobile-first, real-time travel coordination platform synchronizing itineraries on the fly.",
    techStack: ["React Native", "Expo", "Supabase", "PostgreSQL"],
    bulletPoints: [
      "Architected a cross-platform mobile travel application using React Native and Expo, reducing state synchronization latency for group itineraries.",
      "Implemented a secure relational backend using Supabase and PostgreSQL to manage real-time location sharing and concurrent user updates."
    ],
    image: "/projects/routesync.png",
    link: "https://github.com/SOFTJIT-SINGH/RouteSync",
  },
  {
    slug: "cityguard",
    title: "CityGuard",
    type: "Mobile App",
    description: "A dual-role public safety application featuring instant SOS dispatch and AI crime prediction.",
    techStack: ["React Native", "Expo", "Supabase", "PostgreSQL", "Google Gemini AI"],
    bulletPoints: [
      "Engineered a dual-role mobile safety platform using React Native and Supabase, integrating real-time SOS geolocation tracking and automated SMS dispatch.",
      "Integrated Google Gemini AI to build an intelligent forensics scanner for document verification and a predictive risk analysis engine for identifying crime hotspots."
    ],
    image: "/projects/cityguard.png",
    link: "https://github.com/SOFTJIT-SINGH/CityGuard",
  },
  {
    slug: "agrotech",
    title: "AgroTech",
    type: "Mobile App",
    description: "A mobile AI platform providing farmers with crop disease detection and predictions.",
    techStack: ["React Native", "Expo", "Supabase", "Google Generative AI"],
    bulletPoints: [
      "Developed an AI-driven agricultural mobile application using React Native and Google Generative AI to automate crop disease detection and yield prediction.",
      "Architected a scalable backend with Supabase to manage offline-capable crop libraries, real-time weather advisories, and community forum data."
    ],
    image: "",
    link: "https://github.com/SOFTJIT-SINGH/AgroTech",
  },
  {
    slug: "attendauth",
    title: "AttendAuth",
    type: "Mobile App",
    description: "A secure, multi-tier attendance tracking and academic management application.",
    techStack: ["React Native", "Expo", "Supabase", "Zustand"],
    bulletPoints: [
      "Built a cross-platform attendance authentication application with React Native, implementing strict role-based access controls for students, staff, and administrators.",
      "Utilized Supabase to manage secure, concurrent attendance logging, real-time class scheduling, and automated academic reporting workflows."
    ],
    image: "",
    link: "https://github.com/SOFTJIT-SINGH/AttendAuth",
  },{
    slug: "bidnexus",
    title: "BidNexus",
    type: "Web Application",
    description: "A high-throughput AI auction marketplace utilizing intelligent automation.",
    techStack: ["Next.js", "Node.js", "Express.js", "PostgreSQL"],
    bulletPoints: [
      "Developed a full-stack real-time auction platform processing concurrent bids with low-latency data updates via optimized Node.js/Express.js APIs.",
      "Designed a relational database schema in PostgreSQL to maintain strict ledger integrity and prevent transactional race conditions during peak bidding windows."
    ],
    image: "/projects/bidnexus.png",
    link: "https://github.com/SOFTJIT-SINGH/BidNexus",
  },
  {
    slug: "examai",
    title: "ExamAi",
    type: "Web Application",
    description: "An automated AI-powered proctoring system detecting non-compliant behavior.",
    techStack: ["Next.js", "TypeScript", "AI Web APIs"],
    bulletPoints: [
      "Built an automated remote examination proctoring system using Next.js and TypeScript to evaluate user behavior via client-side processing.",
      "Optimized front-end performance to process concurrent media and data streams smoothly without degrading system responsiveness."
    ],
    image: "/projects/examai.png",
    link: "https://github.com/SOFTJIT-SINGH/ExamAi",
  }
];

export const webProjects: Project[] = [
  {
    slug: "healchakra",
    title: "HealChakra",
    type: "Web Application",
    description: "A real-time, wallet-based consultation platform matching users with verified experts.",
    techStack: ["Next.js", "Supabase", "WebRTC", "Sockets", "Payment Gateway"],
    bulletPoints: [
      "Architected a scalable consultation marketplace using Next.js, integrating low-latency real-time chat, voice, and video communication for seamless expert-client interactions.",
      "Engineered a high-throughput wallet and per-minute billing system backed by secure relational database transactions to handle live session deductions and concurrent connections."
    ],
    image: "/projects/healchakra.png",
    link: "https://github.com/SOFTJIT-SINGH/HealChakra",
  },
  {
    slug: "bhojpos",
    title: "BhojPOS",
    type: "Web Application",
    description: "A comprehensive digital menu and POS platform automating restaurant operations.",
    techStack: ["Next.js", "MongoDB", "React", "Node.js"],
    bulletPoints: [
      "Developed a multi-tenant Point-of-Sale (POS) and digital E-menu application using Next.js, streamlining daily restaurant operations and customer order flows.",
      "Integrated a flexible MongoDB document-store backend to process real-time inventory adjustments, secure transactions, and multi-role access controls for administrative staff."
    ],
    image: "/projects/bhojpos.png",
    link: "https://github.com/SOFTJIT-SINGH/BhojPOS",
  },
  
  // {
  //   slug: "beheights",
  //   title: "BeHeights",
  //   type: "Web Application",
  //   description: "A full-stack institute and library management administrative dashboard.",
  //   techStack: ["Next.js 16", "React 19", "MongoDB", "Mongoose", "NextAuth.js"],
  //   bulletPoints: [
  //     "Engineered a high-performance institutional management dashboard using Next.js and React 19, optimizing administrative workflows for resource issuance and staff tracking.",
  //     "Designed a flexible, schema-driven backend using MongoDB paired with NextAuth.js to secure complex multi-tenant administrative routing."
  //   ],
  //   image: "",
  //   link: "https://github.com/SOFTJIT-SINGH/BeHeights",
  // }
];