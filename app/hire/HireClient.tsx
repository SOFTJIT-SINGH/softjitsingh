import Link from "next/link";
import { SITE } from "@/lib/constants";

const whatsappMsg = encodeURIComponent(
  "Hi Softjit, I saw your work and I'm interested in getting a website/app built for my business."
);
const whatsappUrl = `https://wa.me/918528473685?text=${whatsappMsg}`;

const packages = [
  {
    name: "Business Website",
    price: "₹5,000",
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
    cta: "Get a website",
  },
  {
    name: "Web Application",
    price: "₹10,000+",
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
    cta: "Discuss your app",
  },
  {
    name: "Mobile App",
    price: "₹20,000+",
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
    cta: "Build my app",
  },
];

const portfolio = [
  { name: "Pseudotek Solutions", type: "Corporate website", url: "https://pseudotek.in", slug: "pseudotek", result: "Live corporate site with WhatsApp lead capture" },
  { name: "DCD Academy", type: "Education website", url: "https://dcdeducam.com", slug: "dcdacademy", result: "8-course catalog, franchise pipeline, contact forms" },
  { name: "BhojPOS", type: "Restaurant POS", url: null, slug: "bhojpos", result: "Serving multiple restaurants daily, 44% faster API" },
  { name: "OmSweets", type: "E-commerce", url: null, slug: "omsweets", result: "Online ordering and Razorpay payments for a sweet shop" },
  { name: "Mehar Foods", type: "Wholesale platform", url: null, slug: "meharfoods", result: "Real-time order tracking, PDF invoices, email alerts" },
  { name: "SalonFlow", type: "Salon management", url: null, slug: "salonflow", result: "Booking, staff scheduling, revenue analytics" },
];

const reasons = [
  { title: "Fast delivery", body: "Websites in 5 days. Apps in 2–6 weeks. No months of waiting." },
  { title: "Production quality", body: `${SITE.metrics.productionApps}+ apps shipped, serving real businesses with real customers.` },
  { title: "Free support", body: "1–3 months of free maintenance included. No hidden charges." },
];

const greenButton =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#25d366] px-6 py-3.5 text-sm font-medium text-[#062b14] hover:bg-[#3ee07a] transition-colors";

export default function HireClient() {
  return (
    <main className="min-h-screen bg-night text-cream">
      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-16">
        <p className="font-mono text-xs text-amber mb-6">for businesses · {SITE.location.toLowerCase()}</p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-4xl mb-8">
          Websites and apps <em className="italic text-mint">for your business.</em>
        </h1>
        <p className="text-lg text-mist max-w-2xl leading-relaxed">
          A professional business website in 5 days. Web and mobile apps for restaurants, shops, salons, clinics,
          wholesalers and factories. {SITE.metrics.productionApps}+ projects delivered.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={greenButton}>
            WhatsApp me now
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="rounded-md border border-line px-6 py-3.5 text-sm hover:border-mist/50 transition-colors"
          >
            Call {SITE.phone}
          </a>
        </div>
      </section>

      <section className="border-y border-line">
        <ul data-stagger className="max-w-6xl mx-auto px-5 md:px-10 grid sm:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="py-8 sm:px-6 first:sm:pl-0 border-b sm:border-b-0 sm:border-l first:sm:border-l-0 border-line last:border-b-0">
              <h2 className="font-serif text-xl tracking-tight mb-2">{r.title}</h2>
              <p className="text-sm text-mist leading-relaxed">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
        <p className="font-mono text-xs text-mint mb-3">pricing</p>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-3">Simple, fixed prices.</h2>
        <p className="text-mist mb-12 max-w-lg">No hourly billing. Fixed price, fixed timeline. You know exactly what you pay.</p>

        <div data-stagger className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-lg border p-7 ${
                pkg.best ? "border-mint/50 bg-night-2 shadow-[0_30px_80px_-40px_rgba(124,242,201,0.4)]" : "border-line bg-night-2/50"
              }`}
            >
              {pkg.best && (
                <span className="absolute -top-3 left-7 rounded bg-mint px-2 py-0.5 font-mono text-[11px] text-night">most popular</span>
              )}
              <h3 className="font-serif text-2xl tracking-tight">{pkg.name}</h3>
              <p className="mt-4 font-serif text-5xl tracking-tight">{pkg.price}</p>
              <p className="mt-2 font-mono text-[11px] text-mist">delivered in {pkg.timeline}</p>
              <ul className="mt-8 mb-8 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-cream/85">
                    <span className="text-mint" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`${whatsappUrl}${encodeURIComponent(` (Interested in: ${pkg.name})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-md py-3 text-center text-sm font-medium transition-colors ${
                  pkg.best ? "bg-mint text-night hover:bg-cream" : "border border-line hover:border-mist/50"
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-24">
          <p className="font-mono text-xs text-mint mb-3">past work</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-3">Businesses I&apos;ve built for.</h2>
          <p className="text-mist mb-12">Real projects for real businesses, in production right now.</p>
          <ul data-stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
            {portfolio.map((p) => (
              <li key={p.name} className="border-r border-b border-line p-6">
                <p className="font-mono text-[11px] text-mist mb-3">{p.type.toLowerCase()}</p>
                <h3 className="font-serif text-2xl tracking-tight mb-2">{p.name}</h3>
                <p className="text-sm text-mist mb-4">{p.result}</p>
                <p className="flex gap-4 font-mono text-[11px]">
                  <Link href={`/projects/${p.slug}`} className="text-mint hover:text-cream">case study →</Link>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-cream">
                      visit site ↗
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,#1a2550_0%,#0a0f1e_70%)]">
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-24 text-center">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-mist mb-10">
            WhatsApp me with what you need. I&apos;ll reply within a few hours with a plan and timeline, no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={greenButton}>
              WhatsApp now
            </a>
            <Link href="/contact" className="rounded-md border border-line px-6 py-3.5 text-sm hover:border-mist/50 transition-colors">
              Or fill in a form →
            </Link>
          </div>
          <p className="mt-8 font-mono text-[11px] text-mist">
            {SITE.email} · {SITE.phone}
          </p>
        </div>
      </section>
    </main>
  );
}
