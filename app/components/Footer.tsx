import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-24 md:pt-32 pb-10">
        <p className="font-mono text-xs text-mint mb-6">// have a project, or a role in mind?</p>
        <a
          href={`mailto:${SITE.email}`}
          className="font-serif text-[2rem] sm:text-5xl md:text-7xl tracking-tight break-all text-cream hover:text-mint transition-colors"
        >
          {SITE.email}
        </a>
        <p className="mt-6 text-mist max-w-md">
          I reply within {SITE.metrics.responseTime}. Prefer a form?{" "}
          <Link href="/contact" className="text-cream underline underline-offset-4 decoration-mint/60 hover:decoration-mint">
            Use the contact page
          </Link>
          .
        </p>

        <div className="mt-24 pt-6 border-t border-line flex flex-col md:flex-row gap-4 md:items-center md:justify-between font-mono text-xs text-mist">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.location}
          </p>
          <div className="flex gap-6">
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              github
            </a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              linkedin
            </a>
            <a href={SITE.social.x} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              x
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
