import { Project } from "@/types";

export const mobileProjects: Project[] = [
  {
    slug: "cityguard",
    title: "CityGuard",
    type: "AI Mobile App",
    description: "AI-powered real-time crime reporting system. Features an emergency SOS, crowd-sourced heatmaps, and AI image analysis to automatically categorize incident severity.",
    tech: ["React Native", "NativeWind", "Supabase", "Gemini API"],
    image: "/projects/cityguard.png",
    link: "https://github.com/SOFTJIT-SINGH",
  },
  {
    slug: "bidnexus",
    title: "BidNexus",
    type: "Real-Time Mobile App",
    description: "Real-time AI auction platform handling concurrent users with zero latency. Features dynamic bidding logic and real-time state management via WebSockets.",
    tech: ["React Native", "WebSockets", "AI Integration"],
    image: "/projects/bidnexus.png",
    link: "https://github.com/SOFTJIT-SINGH",
  },
  {
    slug: "routesync",
    title: "RouteSync",
    type: "Travel Mobile App",
    description: "A comprehensive travel companion app designed to seamlessly synchronize travel plans, itineraries, and real-time route updates for users on the go.",
    tech: ["React Native", "Tailwind CSS", "Node.js"],
    image: "/projects/routesync.png",
    link: "https://github.com/SOFTJIT-SINGH",
  },
  {
    slug: "exam-ai",
    title: "Exam AI",
    type: "EdTech Mobile App",
    description: "An intelligent study companion app leveraging AI to generate practice questions, track progress, and provide personalized learning insights.",
    tech: ["React Native", "AI API", "TypeScript"],
    image: "/projects/exam-ai.png",
    link: "https://github.com/SOFTJIT-SINGH",
  },
  {
    slug: "pulsesync",
    title: "PulseSync",
    type: "Health Mobile App",
    description: "A lifestyle tracking mobile app that synchronizes vital metrics and daily activities into a unified, easy-to-read dashboard.",
    tech: ["React Native", "HealthKit", "Tailwind CSS"],
    image: "/projects/pulsesync.png",
    link: "https://github.com/SOFTJIT-SINGH",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    type: "Utility Mobile App",
    description: "A sleek, location-aware weather application delivering highly accurate, real-time forecasts, animated conditions, and severe alerts.",
    tech: ["React Native", "OpenWeather", "Framer Motion"],
    image: "/projects/weather.png",
    link: "https://github.com/SOFTJIT-SINGH",
  }
];

export const webProjects: Project[] = [
  {
    slug: "alphatodo",
    title: "AlphaTodo",
    type: "AI Web Application",
    description: "Smart task management platform integrating the Gemini Pro API to generate contextual task suggestions, improving user completion efficiency by 20%.",
    tech: ["Next.js 15", "TypeScript", "Shadcn/ui", "Tailwind CSS"],
    image: "/projects/alphatodo.png",
    link: "https://github.com/SOFTJIT-SINGH/alphatodo.git",
  },
  {
    slug: "bealphax",
    title: "bealphax",
    type: "Full-Stack E-Commerce",
    description: "High-performance apparel store with user authentication, real-time cart management, and a scalable Express.js admin dashboard. Improved checkout latency by 30%.",
    tech: ["Next.js 15", "Supabase", "Prisma ORM", "Express.js"],
    image: "/projects/bealphax.png",
    link: "https://github.com/SOFTJIT-SINGH/bealphax.git",
  }
];