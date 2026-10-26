import type { Metadata } from "next";
import HireClient from "./HireClient";
import { SITE } from "@/lib/constants";
import { PERSON_ID, breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Website & App Developer in Amritsar",
    description:
      "Business websites in 5 days from ₹5,000, plus web and mobile apps for shops, restaurants, salons, clinics and wholesalers in Amritsar, Punjab and across India.",
    path: "/hire",
  }),
  keywords: [
    "website developer Amritsar",
    "web designer Amritsar",
    "app developer Amritsar",
    "website design Punjab",
    "business website India",
    "Next.js developer",
  ],
};

// Local-business record so Google can show these services for searches in and around Amritsar.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.domain}/hire#service`,
  name: `${SITE.name} — Websites & Apps`,
  description: "Business websites, web apps and mobile apps for local businesses, at fixed prices.",
  url: `${SITE.domain}/hire`,
  image: `${SITE.domain}/og-image.png`,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "₹5,000 – ₹20,000+",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amritsar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.634, longitude: 74.8723 },
  areaServed: [
    { "@type": "City", name: "Amritsar" },
    { "@type": "State", name: "Punjab" },
    { "@type": "Country", name: "India" },
  ],
  founder: { "@id": PERSON_ID },
  makesOffer: [
    { name: "Business Website", price: "5000", description: "5-page website, delivered in 5 days" },
    { name: "Web Application", price: "10000", description: "Custom web app, from ₹10,000, 2–4 weeks" },
    { name: "Mobile App", price: "20000", description: "Android and iOS app, from ₹20,000, 3–6 weeks" },
  ].map((o) => ({
    "@type": "Offer",
    priceCurrency: "INR",
    price: o.price,
    itemOffered: { "@type": "Service", name: o.name, description: o.description },
  })),
};

export default function HirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema,
            breadcrumbs([
              ["Home", "/"],
              ["Services", "/hire"],
            ]),
          ]),
        }}
      />
      <HireClient />
    </>
  );
}
