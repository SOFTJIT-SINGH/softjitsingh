import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const OG_IMAGE = `${SITE.domain}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${SITE.shortRole}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "Softjit Singh",
    "Full-Stack Engineer",
    "Next.js 16",
    "React Native",
    "LiveKit WebRTC",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Real-time systems",
    "Production SaaS",
  ],
  authors: [{ name: SITE.name, url: SITE.domain }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.domain,
    siteName: `${SITE.name} Portfolio`,
    title: `${SITE.name} — ${SITE.shortRole}`,
    description: SITE.tagline,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.shortRole}`,
    description: SITE.tagline,
    images: [OG_IMAGE],
    creator: "@softjit_singh",
  },
  alternates: {
    canonical: SITE.domain,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "j-RazLeq16fk5aKPDBU5jryhtGw_Qa6wONX5B2Z8VqY",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.domain,
  jobTitle: SITE.role,
  description: SITE.tagline,
  image: `${SITE.domain}/icon.png`,
  email: `mailto:${SITE.email}`,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amritsar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: SITE.employer.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amritsar",
      addressCountry: "IN",
    },
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: SITE.education.school,
  },
  knowsAbout: [
    "Next.js",
    "React Native",
    "TypeScript",
    "LiveKit WebRTC",
    "PostgreSQL",
    "Supabase",
    "MongoDB",
    "Redis",
    "System Design",
    "Multi-tenant architecture",
    "Real-time systems",
  ],
  sameAs: SITE.socialSameAs,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#050505" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
