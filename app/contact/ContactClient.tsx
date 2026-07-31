"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaClock, FaLinkedin, FaGithub, FaArrowRight, FaCheckCircle, FaDownload, FaFileAlt, FaWhatsapp, FaLaptopCode, FaMobileAlt, FaRobot, FaShoppingCart } from "react-icons/fa";
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
  {
    icon: <FaLaptopCode />,
    title: "Business Websites",
    description: "Corporate sites, landing pages, marketing sites. Delivered in 3–5 days.",
    examples: "pseudotek.in, dcdeducam.com",
  },
  {
    icon: <FaShoppingCart />,
    title: "Web Applications",
    description: "E-commerce, POS systems, dashboards, CRM, ERP, booking platforms.",
    examples: "BhojPOS, OmSweets, SalonFlow",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    description: "Cross-platform React Native apps with real-time sync and AI integration.",
    examples: "CityGuard, BidNexus, AttendAuth",
  },
  {
    icon: <FaRobot />,
    title: "AI Integration",
    description: "Gemini AI automation, inventory prediction, document analysis, chatbots.",
    examples: "KSARTS AI, HealChakra, ExamAI",
  },
];

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

  const whatsappMessage = encodeURIComponent(
    "Hi Softjit, I found your portfolio and I'm interested in discussing a project."
  );
  const whatsappUrl = `https://wa.me/918528473685?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 pt-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
            Have a project? Let&apos;s build it.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Whether you need a business website, a full-stack platform, or a mobile app — I deliver production-ready software in {SITE.metrics.deliveryCycle} cycles.
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-500 transition-all hover:scale-105 active:scale-95 min-h-11"
            >
              <FaWhatsapp size={16} /> WhatsApp Me
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 min-h-11"
            >
              <FaEnvelope size={14} /> Email Directly
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-bold rounded-full border border-white/10 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 min-h-11"
            >
              <FaPhone size={12} /> Call Now
            </a>
          </div>
        </motion.header>

        {/* What I Build Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-6 text-center">What I Build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm mb-3">
                  {service.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">{service.description}</p>
                <p className="text-xs text-gray-600 italic">e.g. {service.examples}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <ContactInfo icon={<FaEnvelope />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <ContactInfo icon={<FaWhatsapp />} label="WhatsApp" value={SITE.phone} href={whatsappUrl} />
            <ContactInfo icon={<FaClock />} label="Response" value={`Within ${SITE.metrics.responseTime}`} />

            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Quick stats</p>
              <div className="space-y-2 text-sm">
                <Stat label="Production apps" value={`${SITE.metrics.productionApps}+`} />
                <Stat label="Concurrent users" value={SITE.metrics.concurrentUsers} />
                <Stat label="Delivery cycle" value={SITE.metrics.deliveryCycle} />
                <Stat label="p95 latency reduced" value={SITE.metrics.p95Reduction} />
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaFileAlt className="text-blue-400" /> Resume
              </p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                1-page PDF. View the full version in your browser, or download a copy.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all min-h-11"
                >
                  View resume <FaArrowRight size={11} />
                </a>
                <a
                  href={SITE.resumePdfUrl}
                  download={SITE.resumeFilename}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-full border border-white/10 hover:bg-zinc-800 hover:border-white/30 transition-all min-h-11"
                >
                  <FaDownload size={12} /> Download PDF
                </a>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-4">Also find me on</p>
              <div className="flex gap-3">
                <SocialIcon href={SITE.social.linkedin} icon={<FaLinkedin size={16} />} label="LinkedIn" />
                <SocialIcon href={SITE.social.github} icon={<FaGithub size={16} />} label="GitHub" />
                <SocialIcon href={`mailto:${SITE.email}`} icon={<FaEnvelope size={16} />} label="Email" />
              </div>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Send a message</h2>
            <p className="text-sm text-gray-400 mb-8">
              Or WhatsApp me for a faster response. All fields validated server-side.
            </p>

            {submitStatus === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="bg-green-900/20 border border-green-500/20 text-green-400 p-4 rounded-lg mb-6 flex items-center gap-3"
              >
                <FaCheckCircle /> Message sent. I&apos;ll respond within {SITE.metrics.responseTime}.
              </div>
            )}
            {submitStatus === "error" && errorMsg && (
              <div
                role="alert"
                className="bg-red-900/20 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6"
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>

              <Field label="Subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="e.g. Business website, Mobile app, Full-time role" required />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField
                  label="Budget range (optional)"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select…" },
                    { value: "₹10k-25k", label: "₹10,000 – ₹25,000" },
                    { value: "₹25k-50k", label: "₹25,000 – ₹50,000" },
                    { value: "₹50k-1.5L", label: "₹50,000 – ₹1,50,000" },
                    { value: "₹1.5L+", label: "₹1,50,000+" },
                    { value: "$1k-5k", label: "$1,000 – $5,000 (International)" },
                    { value: "$5k+", label: "$5,000+ (International)" },
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
                    { value: "asap", label: "ASAP — within a week" },
                    { value: "1-2 weeks", label: "1–2 weeks" },
                    { value: "1 month", label: "1 month" },
                    { value: "exploring", label: "Just exploring options" },
                  ]}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Message
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
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors text-sm resize-none"
                  placeholder="Tell me about your project — what does your business do, what do you need built, and when do you need it?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center disabled:opacity-50 text-sm min-h-11"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send message <FaArrowRight className="ml-2" size={12} />
                  </>
                )}
              </button>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{label}</p>
        <p className="text-sm text-white break-all">{value}</p>
      </div>
    </>
  );
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-center gap-4">{inner}</a>
      ) : (
        <div className="flex items-center gap-4">{inner}</div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition-all min-h-11 min-w-11"
    >
      {icon}
    </a>
  );
}

function Field({ label, name, type, value, onChange, placeholder, required }: { label: string; name: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-colors text-sm min-h-11"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
