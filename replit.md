# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### sunil-ravva (React + Vite, previewPath: `/`)
Personal "About Me" landing page for Sunil Ravva — VP Product Owner & Innovation Leader.
- Single-page, mobile-first, dark midnight navy + amber/gold theme
- Sections: Hero (with View My Work / Download Resume / Email Me CTAs), Social Proof Bar (logos via Google favicon API + company names + stats), About + Recognition (4 awards: HSBC Shine Award 2019, 1st Architect of the Year HSBC 2019, Rising Fintech Star, Certificate of Recognition Lloyds Technology Centre 2026), Background (Education / Certifications with category tags + LinkedIn link / Where I've worked timeline / Fun Facts), Core Expertise, Featured Insights, Speaking & Mentorship (70+ architects trained across Hyderabad/Pune/UK + 1500+ newsletter + 50+ innovation initiatives), "Let's Build Something That Matters" CTA (newsletter signup), Contact (email/LinkedIn/phone + mailto contact form), Footer
- Top nav: About · Background · Expertise · Insights · Mentorship · Contact
- Animations: hero-rise stagger entry (CSS keyframes), animate-float on profile photo (8s breathing), animate-drift-a/b on background ambient orbs (20-24s), AnimatedStat counters with IntersectionObserver (count-up on scroll-into-view)
- All links point to real LinkedIn/email/newsletter URLs
- AI-generated images in `public/images/`
- Resume PDF served from `public/sunil-ravva-resume.pdf`
- SEO: JSON-LD Person schema, canonical URL, robots.txt, sitemap.xml in index.html / public
- No backend required — fully static

### api-server (Express 5, previewPath: `/api`)
Shared backend API server (currently only health check endpoint).

### mockup-sandbox (Vite, previewPath: `/__mockup`)
Design sandbox with the original landing page mockup at `src/components/mockups/sunil-landing/LandingPage.tsx`.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/sunil-ravva run dev` — run landing page locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
