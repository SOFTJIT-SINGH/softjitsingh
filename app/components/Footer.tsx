import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-10">
        <p className="text-sm text-ink-soft mb-6">Have a project, or a role in mind?</p>
        <a
          href={`mailto:${SITE.email}`}
          className="font-serif text-[2rem] sm:text-5xl md:text-7xl tracking-tight break-all hover:text-accent transition-colors"
        >
          {SITE.email}
        </a>
        <p className="mt-6 text-ink-soft max-w-md">
          I reply within {SITE.metrics.responseTime}. You can also use the{" "}
          <Link href="/contact" className="text-ink underline underline-offset-4 decoration-accent decoration-2">
            contact form
          </Link>
          .
        </p>

        <div className="mt-20 pt-6 border-t border-rule flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-ink-soft">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.location}
          </p>
          <div className="flex gap-6">
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              GitHub
            </a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={SITE.social.x} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
