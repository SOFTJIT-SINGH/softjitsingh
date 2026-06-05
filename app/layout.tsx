import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softjit Singh — Full-Stack Engineer Portfolio",
  description: "Production real-time platforms, Next.js web applications, and React Native mobile apps engineered by Softjit Singh. View projects and case studies.",
  openGraph: {
    title: "Softjit Singh — Full-Stack Engineer",
    description: "Production real-time platforms, Next.js web applications, and React Native mobile apps engineered by Softjit Singh.",
    type: "website",
    url: "https://softjitsingh.vercel.app",
    siteName: "Softjit Singh Portfolio",
  },
  alternates: {
    canonical: "https://softjitsingh.vercel.app",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/icon.png",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Softjit Singh",
  url: "https://softjitsingh.vercel.app",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Pseudotek Solutions Pvt. Ltd.",
  },
  sameAs: [
    "https://linkedin.com/in/softjit-singh",
    "https://github.com/SOFTJIT-SINGH"
  ],
};

import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
