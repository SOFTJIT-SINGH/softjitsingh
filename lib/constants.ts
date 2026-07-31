export const SITE = {
  name: "Softjit Singh",
  role: "Full-Stack Engineer",
  shortRole: "Full-Stack Engineer",
  tagline: "Production real-time platforms · 500+ concurrent users · <150ms media latency",
  domain: "https://softjitsingh.vercel.app",
  email: "softjitsingh@gmail.com",
  phone: "+91 85284 73685",
  location: "Amritsar, Punjab, India",
  resumeUrl:
    "https://docs.google.com/document/d/e/2PACX-1vTvZEgr02yfoKIHADvMFrqMSNhiBVLBjWPBzeKhMs8RdqmAbX7Cq47SUjlvQZ525fNBEL2s4BXThuTC/pub",
  resumePdfUrl: "/resume.pdf",
  resumeFilename: "Softjit-Singh-Resume-2026.pdf",
  // To enable PDF download, drop your 1-page resume PDF at public/resume.pdf
  social: {
    github: "https://github.com/SOFTJIT-SINGH",
    linkedin: "https://linkedin.com/in/softjit-singh",
    x: "https://x.com/softjit_singh",
  },
  socialSameAs: [
    "https://linkedin.com/in/softjit-singh",
    "https://github.com/SOFTJIT-SINGH",
    "https://x.com/softjit_singh",
  ],
  employer: {
    name: "Pseudotek Solutions Pvt. Ltd.",
    shortName: "Pseudotek Solutions",
    location: "Amritsar, India",
  },
  education: {
    degree: "Master of Computer Applications (MCA)",
    cgpa: "8.56",
    school: "Guru Nanak Dev University",
    years: "2024–2026",
    graduated: true,
  },
  metrics: {
    productionApps: 18,
    concurrentUsers: "500+",
    mediaLatency: "<150ms",
    p95Reduction: "38%",
    responseReduction: "44%",
    deliveryCycle: "3–5 day",
    responseTime: "24 hours",
  },
} as const;

export const NAV_LINKS = [
  { href: "/#projects", label: "Work" },
  { href: "/portfolio", label: "Projects" },
  { href: "/hire", label: "Services" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const PAGE_META = {
  home: {
    title: "Softjit Singh — Full-Stack Engineer · Real-Time Platforms & Mobile Apps",
    description:
      "Production real-time platforms, Next.js web apps, and React Native mobile apps engineered by Softjit Singh. 18+ deployed applications · 500+ concurrent users · <150ms media latency.",
  },
  about: {
    title: "About — Softjit Singh",
    description:
      "Full-Stack Engineer at Pseudotek Solutions. Architected HealChakra, BhojPOS, CityGuard, and 15+ other production applications — contributing across the full stack. Next.js 16, React Native, LiveKit WebRTC.",
  },
  portfolio: {
    title: "Projects — Softjit Singh",
    description:
      "A complete archive of 18 production web and mobile applications: HealChakra, BhojPOS, CityGuard, SecretSoulmate, Fantasy, Om Sweets, Mehar Foods, KS Arts, and more.",
  },
  contact: {
    title: "Contact — Softjit Singh",
    description:
      "Have a project, a role, or a technical question? Reach out and I'll respond within 24 hours.",
  },
  hire: {
    title: "Services & Pricing — Softjit Singh",
    description:
      "Professional business websites delivered in 5 days. Web apps, mobile apps, and AI automation for businesses in Amritsar and across India.",
  },
  mobileWork: {
    title: "Mobile Apps — Softjit Singh",
    description:
      "Cross-platform React Native applications: CityGuard, BidNexus, RouteSync, ExamAI, AgroTech, AttendAuth.",
  },
  webWork: {
    title: "Web Platforms — Softjit Singh",
    description:
      "Production Next.js and full-stack platforms: HealChakra, BhojPOS, OmSweets, KSARTS AI, CryptoSher, Mehar Foods, SalonFlow, SecretSoulmate, Fantasy, BeHeights, Pseudotek Solutions, DCD Academy.",
  },
  writing: {
    title: "Writing — Softjit Singh",
    description:
      "Technical deep-dives on production engineering: PostgreSQL row-level locks, Redis caching, optimistic UI, and Gemini AI integration.",
  },
} as const;
