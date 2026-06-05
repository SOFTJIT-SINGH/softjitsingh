"use client";

import { motion } from "framer-motion";
import { FaDatabase, FaCode, FaRocket, FaShieldAlt } from "react-icons/fa";

const steps = [
  {
    icon: <FaCode className="text-blue-400" />,
    number: "01",
    title: "Architect",
    description: "Design with TypeScript strict mode, Zod schema validation, and RBAC from line one. Every endpoint declares who can call it."
  },
  {
    icon: <FaDatabase className="text-blue-400" />,
    number: "02",
    title: "Engineer",
    description: "Build with race-condition-proof transactions, row-level locks for payment integrity, and multi-tenant data isolation."
  },
  {
    icon: <FaRocket className="text-blue-400" />,
    number: "03",
    title: "Ship",
    description: "Deploy in 3-5 day cycles. Production SaaS serving real users. CI/CD, monitoring, and rollback procedures in place."
  },
  {
    icon: <FaShieldAlt className="text-blue-400" />,
    number: "04",
    title: "Validate",
    description: "Server-side validation on every input. Webhook idempotency. Rate limiting. Audit logging. No client trust."
  }
];

export default function MethodologySection() {
  return (
    <section className="w-full bg-[#050505] py-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-4">Engineering Philosophy</h2>
          <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl">Production-grade by default. Every project ships with the same discipline.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 rounded-2xl p-8 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="text-3xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                  {step.number}
                </div>
                <div>
                  <div className="text-2xl mb-3">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
