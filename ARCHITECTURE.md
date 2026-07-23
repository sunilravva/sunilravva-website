# Architecture

A high-level breakdown of how sunilravva.com is built and deployed, for anyone (including future-me) who needs the full picture quickly.

## Runtime request flow

```
Visitor's browser
        |
        v
Cloudflare Worker (sunilravva-portfolio)
        |
        +--> Static assets  ......  serves the built React site for normal page loads
        |
        +--> /api/chat handler  ..  worker/index.ts, only for chat requests
                    |
                    v
             Anthropic API (Claude Haiku 4.5)
```

A single Cloudflare Worker does both jobs, there's no separate backend server. For a normal page visit, Cloudflare matches the request to a static file and serves it directly, the Worker's own code never even runs. For `POST /api/chat` specifically, no static file matches, so it falls through to the Worker's `fetch` handler, which validates the request, calls Anthropic's API with a system prompt built from Sunil's real CV data, and returns the reply.

The Anthropic API key lives only as a Cloudflare secret, injected into the Worker's runtime environment. It's never present in the frontend bundle, never sent to the browser, and never committed to the repo.

## Key components

| Component | Location | Responsibility |
|---|---|---|
| Frontend | `artifacts/sunil-ravva/` | React + Vite site: hero, background, awards, expertise, chat widget UI |
| Worker | `worker/index.ts` | Serves assets + handles `/api/chat`; the only place the Anthropic key is used |
| Chat widget | `artifacts/sunil-ravva/src/components/ChatWidget.tsx` | Floating chat UI, calls `/api/chat` from the browser |
| Deploy config | `wrangler.jsonc` | Tells Cloudflare which Worker name to deploy to, and where the built assets live |
| CI/CD | `.github/workflows/deploy.yml` | Builds and deploys on every push to `main` |

## CI/CD deploy pipeline

```
Push to main (GitHub)
        |
        v
GitHub Actions: install deps, typecheck, build
        |
        +--> wrangler deploy  (ships the Worker + built site)
        |
        +--> Upload ANTHROPIC_API_KEY as a Cloudflare secret
                    |
                    v
        Live on sunilravva.com
```

Every push to `main` triggers a fresh, from-scratch build and deploy. The workflow re-uploads the Anthropic API key as a Cloudflare secret on every run, so credentials never drift out of sync with what's actually deployed.

**Deliberately not used:** Cloudflare's native Git integration (dashboard-based auto-deploy). It has a known bug where it silently wipes Worker secrets on subsequent deploys. GitHub Actions is the only deploy path for this project — see the note in `README.md`.

## Why the Worker name matters

`wrangler.jsonc`'s `"name"` field determines which Cloudflare Worker resource a deploy actually targets. This project's live domain (`sunilravva.com`) is attached to a Worker called `sunilravva-portfolio` — not `sunilravva-website`, despite the repo itself being named `sunilravva-website`. If you ever rename or recreate the Worker, double-check the domain binding under Cloudflare dashboard → Workers & Pages → *(worker name)* → Domains before assuming a deploy will reach the live site.
