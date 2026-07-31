# Softjit Singh — Portfolio

A production Next.js 16 portfolio for Softjit Singh (Full-Stack Engineer at Pseudotek Solutions). Built to convert recruiters and freelance clients with case studies, deep-dive engineering articles, and a contact pipeline.

## Stack

- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **Runtime**: React 19.2.6
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **3D (hero)**: @react-three/fiber + three (degrades gracefully)
- **Email**: Nodemailer (SMTP via env vars)
- **Icons**: react-icons

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in SMTP_* if you want contact form to actually send
npm run dev
```

Open http://localhost:3000.

## Environment Variables

For the contact form (`POST /api/contact`) to actually deliver email, set:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password     # use an App Password, not your real password
CONTACT_EMAIL=where-to-receive@domain.com
```

If these are not set, the contact form returns a `503` with a clear "email me directly" message instead of silently failing.

## Scripts

```bash
npm run dev      # next dev --turbopack
npm run build    # next build --turbopack
npm run start    # next start
npm run lint     # eslint
```

## Project Structure

```
app/
  page.tsx                  # Homepage
  about/                    # About page
  portfolio/                # All 18 projects grid
  projects/[slug]/          # Case-study detail (with deep-dive link)
  mobile-work/              # Mobile-only archive
  web-work/                 # Web-only archive
  writing/                  # Technical deep-dive articles
  contact/                  # Contact form + info
  api/contact/              # POST /api/contact (Nodemailer)
  not-found.tsx             # 404
  error.tsx                 # Global error boundary
  layout.tsx                # Root layout + Person schema JSON-LD
  sitemap.ts                # Dynamic sitemap
  robots.ts                 # robots.txt
lib/
  data.ts                   # Projects data (18 entries)
  writing.ts                # Writing posts metadata
  constants.ts              # Site, contact, nav, page-meta constants
types/
  index.ts                  # Project type
public/
  projects/                 # Project screenshots
```

## Content

### Resume file

Place your 1-page resume PDF at `public/resume.pdf`. The download links (Navbar, Hero, Contact, About) will then serve it as `Softjit-Singh-Resume-2026.pdf`. If the file is missing, the `download` attribute still works — the browser will 404. Verify after deploy.

To add a new project:

1. Add an entry to `lib/data.ts` (slug, title, type, description, techStack, bulletPoints, image, link).
2. Add a screenshot to `public/projects/<slug>.png` (or leave `image: ""` for the "Assets Pending" fallback).
3. If you wrote a technical deep-dive, add the slug to `projectToBlog` in `app/projects/[slug]/page.tsx`.

To add a writing article:

1. Add a metadata entry to `lib/writing.ts`.
2. Create `app/writing/<slug>/page.tsx` with the full article.

## License

All rights reserved. The codebase is private; project screenshots and copy are property of Softjit Singh and Pseudotek Solutions.
