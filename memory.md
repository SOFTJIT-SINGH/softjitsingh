# Memory — Softjit Singh Portfolio

Last updated: 2026-07-31

## What was built this session
- `app/hire/page.tsx` & `HireClient.tsx` — Added dedicated services & pricing page for client pitches
- `app/components/ProjectVisualFallback.tsx` — Created dynamic glowing SaaS UI mockups for projects missing screenshots
- `app/components/about.tsx` — Rewrote the engineering timeline to a credible 3-step chronological progression
- `lib/constants.ts` & `sitemap.ts` — Added `/hire` to navigation links and SEO sitemap
- `docs/` — Added comprehensive career and outreach assets:
  - `client_outreach_kit.md` (WhatsApp scripts, IG DMs)
  - `upwork_profile_and_proposals.md` (10 proposal templates)
  - `linkedin_30_posts.md` (30 days of technical posts)
  - `gumroad_product_listings.md` (5 template listings)
  - `90_day_escape_plan.md` (Weekly roadmap, remote jobs, Fiverr)
- `app/components/MobileAppCard.tsx`, `WebAppCard.tsx`, `app/projects/[slug]/page.tsx` — Integrated `ProjectVisualFallback`

## Decisions made
- Instead of finding/making generic placeholder images, we built `ProjectVisualFallback` to render high-end CSS/Framer Motion dashboard mockups.
- Timeline restricted to 3 main points to avoid looking unrealistic to recruiters.
- Focused outreach on local Indian market (Amritsar) using WhatsApp rather than email, with transparent INR pricing.

## Current state
- **What works:** The entire portfolio, including `/hire`, is successfully building with zero errors (`next build --turbopack` completed successfully). All projects display either a screenshot or a polished visual fallback.
- **What is partial:** None
- **What is known to be broken:** None

## Next session starts with
- Ready for user to deploy to Vercel and begin executing the 90-day escape plan.

## Open questions
- None at this time. Project is ready for production deployment.
