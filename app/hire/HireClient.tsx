"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaCheckCircle, FaClock, FaRocket, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { SITE } from "@/lib/constants";

const whatsappMsg = encodeURIComponent(
  "Hi Softjit, I saw your work and I'm interested in getting a website/app built for my business."
);
const whatsappUrl = `https://wa.me/918528473685?text=${whatsappMsg}`;

const packages = [
  {
    name: "Business Website",
    price: "₹15,000",
    timeline: "5 days",
    features: [
      "5-page professional website",
      "Mobile-responsive design",
      "WhatsApp integration for leads",
      "Google Maps listing",
      "Contact form with email alerts",
      "1 month free support",
    ],
    best: false,
    cta: "Get a Website",
  },
  {
    name: "Web Application",
    price: "₹40,000+",
    timeline: "2–4 weeks",
    features: [
      "Custom dashboard / admin panel",
      "Payment gateway (Razorpay)",
      "User authentication & roles",
      "Database + cloud hosting setup",
      "Real-time features if needed",
      "3 months free support",
    ],
    best: true,
    cta: "Discuss Your App",
  },
  {
    name: "Mobile App",
    price: "₹60,000+",
    timeline: "3–6 weeks",
    features: [
      "Android + iOS from one codebase",
      "Push notifications",
      "Offline capability",
      "AI integration available",
      "App Store submission help",
      "3 months free support",
    ],
    best: false,
    cta: "Build My App",
  },
];

const portfolio = [
  {
    name: "Pseudotek Solutions",
    type: "Corporate Website",
    url: "https://pseudotek.in",
    result: "Live corporate site with WhatsApp lead capture",
  },
  {
    name: "DCD Academy",
    type: "Education Website",
    url: "https://dcdeducam.com",
    result: "8-course catalog, franchise pipeline, contact forms",
  },
  {
    name: "BhojPOS",
    type: "Restaurant POS System",
    url: null,
    result: "Serving multiple restaurants daily, 44% faster API",
  },
  {
    name: "OmSweets BYOB",
    type: "E-Commerce Platform",
    url: null,
    result: "Online ordering + Razorpay payments for sweet shop",
  },
  {
    name: "Mehar Foods",
    type: "Wholesale Platform",
    url: null,
    result: "Real-time order tracking, PDF invoices, email alerts",
  },
  {
    name: "SalonFlow",
    type: "Salon Management",
    url: null,
    result: "Booking, staff scheduling, revenue analytics",
  },
];

export default function HireClient() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 overflow-hidden">
      {/* Hero */}
      <section className="relative w-full py-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/15 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl"
        >
          <p className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-4">
            Amritsar-Based Software Engineer
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-6 leading-tight">
            I build websites & apps
            <br />
            <span className="text-gray-400">for your business.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Professional business website in 5 days. Web apps and mobile apps for restaurants, shops, salons, clinics, wholesalers, and factories. {SITE.metrics.productionApps}+ projects delivered.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-500 transition-all hover:scale-105 active:scale-95"
            >
              <FaWhatsapp size={18} /> WhatsApp Me Now
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white text-sm font-bold rounded-full border border-white/10 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
            >
              Call: {SITE.phone}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Why Me */}
      <section className="w-full py-16 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <FaRocket className="text-blue-400 text-2xl mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Fast Delivery</p>
            <p className="text-sm text-gray-400">Websites in 5 days. Apps in 2-6 weeks. No months of waiting.</p>
          </div>
          <div>
            <FaShieldAlt className="text-blue-400 text-2xl mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Production Quality</p>
            <p className="text-sm text-gray-400">{SITE.metrics.productionApps}+ apps shipped. Serving real businesses with real users.</p>
          </div>
          <div>
            <FaClock className="text-blue-400 text-2xl mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Free Support</p>
            <p className="text-sm text-gray-400">1-3 months free maintenance included. No hidden charges.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">No hourly billing. Fixed price, fixed timeline. You know exactly what you pay.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-zinc-900/40 border rounded-2xl p-8 flex flex-col ${
                  pkg.best ? "border-blue-500/50 ring-1 ring-blue-500/20" : "border-white/5"
                }`}
              >
                {pkg.best && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-3xl font-extrabold text-white mb-1">{pkg.price}</p>
                <p className="text-sm text-gray-500 mb-6">Delivered in {pkg.timeline}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${whatsappUrl} — interested in: ${pkg.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-full text-sm font-bold text-center transition-all hover:scale-105 active:scale-95 block ${
                    pkg.best
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-zinc-800 text-white border border-white/10 hover:bg-zinc-700"
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Work */}
      <section className="w-full py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">Businesses I&apos;ve Built For</h2>
          <p className="text-gray-400 text-center mb-12">Real projects. Real businesses. In production right now.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.map((p) => (
              <div key={p.name} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <span className="text-xs text-gray-500 font-mono">{p.type}</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{p.result}</p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Visit site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-10">
            WhatsApp me with what you need. I&apos;ll reply within a few hours with a plan and timeline — no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 transition-all hover:scale-105 active:scale-95 text-base"
            >
              <FaWhatsapp size={20} /> WhatsApp Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-zinc-900 text-white font-bold rounded-full border border-white/10 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              Or fill a form <FaArrowRight size={12} />
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-6">
            {SITE.email} · {SITE.phone} · {SITE.location}
          </p>
        </div>
      </section>
    </main>
  );
}
