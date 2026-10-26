# Softjit Singh — Portfolio

The portfolio of Softjit Singh, full-stack engineer in Amritsar. Live at **https://softjitsingh.vercel.app**.

It is built around one idea, the **Astral Observatory**: every project Softjit has shipped is a star on a live chart, drawn over a slowly turning gold astrolabe. The homepage shows all 20 projects within a few scrolls; case studies, code sketches and technical write-ups sit one tap deeper.

Design system: [`DESIGN.md`](DESIGN.md) · Product brief: [`PRODUCT.md`](PRODUCT.md)

## Stack

- **Framework:** Next.js 16.2 (App Router, Turbopack) · React 19.2 · TypeScript 6
- **Styling:** Tailwind CSS 4 (tokens in `app/globals.css` → `@theme inline`)
- **Type:** Fraunces (display), Geist (body), Geist Mono (labels) via `next/font`
- **Motion:** framer-motion (tilt, parallax, page transitions) + hand-written canvas/CSS (constellation, cursor glow, reveals)
- **Email:** Nodemailer over SMTP (`/api/contact`)
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

Type-check (should be clean):

```bash
npx tsc --noEmit
```

Production build (stop the dev server first; both use `.next`):

```bash
pnpm build
```

> `pnpm lint` currently fails because of a pre-existing ESLint config error (`eslint.config.mjs`). Known issue.

## Environment variables

For the contact form to deliver email:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password      # an App Password, not your account password
CONTACT_EMAIL=where-to-receive@domain.com
```

Without them, `/api/contact` returns `503` with an "email me directly" message instead of failing silently. The email includes name, email, subject, message, budget and timeline.

## Project structure

```
app/
  page.tsx                 Homepage: constellation hero, mobile shelf, web showcase, numbers,
                           industries, stack, notes, about, journey
  layout.tsx               Fonts, Person JSON-LD, nav, footer, scroll progress, reveals, cursor glow
  template.tsx             Page transition
  projects/[slug]/         Case study for every project
  portfolio/ web-work/ mobile-work/   One filterable archive, three entry points
  writing/                 Index + 10 technical posts (each wrapped in PostShell)
  about/ contact/ hire/    About, contact form, services and pricing
  api/contact/             POST /api/contact
  components/              Navbar, Footer, PhoneFrame, MagicPortrait, RevealOnScroll, archive
    home/                  Constellation, Astrolabe, MobileShelf, WebShowcase, NumbersBoard, …
    motion/                Tilt, Parallax, ScrollProgress, Typewriter, MagicCursor
lib/
  data.ts                  All projects (14 web, 6 mobile)
  featured.ts              Ordering, featured stories + code sketches, one-line hooks
  metrics.ts               Metrics extracted from bullets; safe hostname helper
  imageSizes.ts            Natural sizes of screenshots (generated)
  constants.ts             Site identity, employer status, nav, page metadata
  writing.ts               Post metadata
public/projects/           Screenshots (1920×1080 web, 9:20 mobile)
```

## Adding a project

1. Add an entry to `lib/data.ts` with facts you can verify from the project itself.
2. Add a one-line hook in `lib/featured.ts → hooks`.
3. Add a screenshot to `public/projects/` (web 1920×1080; mobile portrait 9:20).
4. Regenerate `lib/imageSizes.ts` (natural `[width, height]` of every screenshot).
5. For web projects, add the slug to `ORDER` in `app/components/home/WebShowcase.tsx`.
6. Update `SITE.metrics.productionApps` and the counts in `PAGE_META` (`lib/constants.ts`).

Metrics on cards and case studies appear automatically when a bullet point matches a pattern in `lib/metrics.ts`. A matching write-up is linked automatically when its slug starts with the project slug.

## Adding a write-up

1. Add metadata to `lib/writing.ts`.
2. Create `app/writing/<slug>/page.tsx`, wrap the body in `<PostShell slug="<slug>">`, and export its `metadata`.

## Employment status

`lib/constants.ts` → `SITE.employer` and `SITE.openToWork` control the hero line, About copy, journey and the Person JSON-LD (`worksFor` is only emitted when `employer.current` is true).

## Content still to add

- `public/resume.pdf` (download buttons were removed until it exists).

## License

All rights reserved. Project screenshots and copy belong to Softjit Singh and the respective clients.
