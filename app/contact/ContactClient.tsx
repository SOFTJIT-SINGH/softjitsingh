"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  budget: "",
  timeline: "",
};

const services = [
  { title: "Business websites", body: "Corporate and marketing sites, delivered in 3–5 days.", examples: "pseudotek.in, dcdeducam.com" },
  { title: "Web applications", body: "E-commerce, POS, dashboards, CRM and booking platforms.", examples: "BhojPOS, OmSweets, SalonFlow" },
  { title: "Mobile apps", body: "Cross-platform React Native with real-time sync and AI.", examples: "CityGuard, BidNexus, AttendAuth" },
  { title: "AI features", body: "Gemini automation, forecasting, document and image analysis.", examples: "KSARTS AI, CityGuard, ExamAI" },
];

const whatsappUrl = `https://wa.me/918528473685?text=${encodeURIComponent(
  "Hi Softjit, I found your portfolio and I'm interested in discussing a project."
)}`;

const inputClass =
  "w-full rounded-md border border-line bg-night px-4 py-3 text-sm text-cream placeholder:text-mist/60 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint transition-colors";

export default function ContactClient() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please email me directly.");
        return;
      }
      setSubmitStatus("success");
      setFormData(initialForm);
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch {
      setSubmitStatus("error");
      setErrorMsg("Network error. Please email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-night text-cream">
      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-16">
        <p className="font-mono text-xs text-mint mb-6">
          contact · replies within {SITE.metrics.responseTime}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-4xl mb-8">
          Have a project, or a role? <em className="italic text-mint">Let&apos;s talk.</em>
        </h1>
        <p className="text-lg text-mist max-w-2xl leading-relaxed">
          A business website, a full-stack platform, a mobile app, or a full-time position. WhatsApp is fastest; the
          form below lands in my inbox.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-mint px-5 py-3 font-medium text-night hover:bg-cream transition-colors"
          >
            WhatsApp me
          </a>
          <a href={`mailto:${SITE.email}`} className="rounded-md border border-line px-5 py-3 hover:border-mist/50 transition-colors">
            Email directly
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="rounded-md border border-line px-5 py-3 hover:border-mist/50 transition-colors"
          >
            Call {SITE.phone}
          </a>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20 grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-10">
            <div>
              <p className="font-mono text-xs text-mint mb-4">what I build</p>
              <ul data-stagger>
                {services.map((s) => (
                  <li key={s.title} className="border-t border-line py-4 last:border-b">
                    <h3 className="font-serif text-xl tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-sm text-mist">{s.body}</p>
                    <p className="mt-2 font-mono text-[11px] text-mist/70">e.g. {s.examples}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-mono text-xs space-y-2 text-mist">
              <p>
                <span className="text-mist/60">email </span>
                <a href={`mailto:${SITE.email}`} className="text-cream hover:text-mint break-all">{SITE.email}</a>
              </p>
              <p>
                <span className="text-mist/60">based </span>
                <span className="text-cream">{SITE.location}</span>
              </p>
              <p className="flex gap-4 pt-2">
                <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cream">linkedin ↗</a>
                <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-cream">github ↗</a>
                <a href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">resume ↗</a>
              </p>
            </div>
          </aside>

          <section className="lg:col-span-8 rounded-lg border border-line bg-night-2/60 p-6 md:p-10">
            <h2 className="font-serif text-3xl tracking-tight mb-2">Send a message</h2>
            <p className="text-sm text-mist mb-8">Every field is checked on the server before it reaches me.</p>

            {submitStatus === "success" && (
              <div role="status" aria-live="polite" className="mb-6 rounded-md border border-mint/40 bg-mint/10 p-4 text-sm text-mint">
                Message sent. I&apos;ll reply within {SITE.metrics.responseTime}.
              </div>
            )}
            {submitStatus === "error" && errorMsg && (
              <div role="alert" className="mb-6 rounded-md border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required />
              </div>
              <Field
                label="Subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Business website, mobile app, full-time role…"
                required
              />
              <div className="grid md:grid-cols-2 gap-5">
                <SelectField
                  label="Budget (optional)"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select…" },
                    { value: "₹10k-25k", label: "₹10,000 – ₹25,000" },
                    { value: "₹25k-50k", label: "₹25,000 – ₹50,000" },
                    { value: "₹50k-1.5L", label: "₹50,000 – ₹1,50,000" },
                    { value: "₹1.5L+", label: "₹1,50,000+" },
                    { value: "$1k-5k", label: "$1,000 – $5,000 (international)" },
                    { value: "$5k+", label: "$5,000+ (international)" },
                    { value: "salary", label: "Full-time role" },
                  ]}
                />
                <SelectField
                  label="Timeline (optional)"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select…" },
                    { value: "asap", label: "ASAP, within a week" },
                    { value: "1-2 weeks", label: "1–2 weeks" },
                    { value: "1 month", label: "1 month" },
                    { value: "exploring", label: "Just exploring" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-[11px] text-mist">
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  minLength={10}
                  maxLength={5000}
                  className={`${inputClass} resize-none`}
                  placeholder="What does your business do, what do you need built, and by when?"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-mint py-3.5 text-sm font-medium text-night hover:bg-cream transition-colors disabled:opacity-60 min-h-11"
              >
                {isSubmitting ? "Sending…" : "Send message →"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[11px] text-mist">
        {label.toLowerCase()}
      </label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className={inputClass} />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[11px] text-mist">
        {label.toLowerCase()}
      </label>
      <select id={name} name={name} value={value} onChange={onChange} className={`${inputClass} min-h-11`}>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-night-2">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
