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
Personal "About Me" landing page for Sunil Ravva — VP Product & Innovation Leader.
- Single-page, mobile-first, dark midnight navy + amber/gold theme
- Sections: Hero, Social Proof Bar, About, Core Expertise, Featured Insights, CTA, Footer
- All links point to real LinkedIn/email/newsletter URLs
- AI-generated images in `public/images/` (architecture-data.png, ai-banking.png)
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
