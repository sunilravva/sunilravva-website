# sunilravva.com

Personal portfolio website for **Sunil Ravva** — VP Product & Innovation Leader. A single-page, dark-themed site showcasing career history, certifications, awards, and thought leadership, with a grounded AI chat assistant visitors can ask questions to directly.

**Live site:** [sunilravva.com](https://sunilravva.com)

---

## What's in this repo

This is a **pnpm workspace monorepo**. The two parts that matter for the live site are:

| Package | What it is |
|---|---|
| `artifacts/sunil-ravva` | The React frontend — the actual portfolio page |
| `worker/` | A Cloudflare Worker that serves the site and powers the `/api/chat` chatbot endpoint |

A few other folders (`artifacts/api-server`, `artifacts/mockup-sandbox`, `lib/`) are scaffolding left over from the project's original setup and aren't part of the live deployment.

---

## Architecture at a glance

- **Frontend**: React 19 + TypeScript, built with Vite, styled with Tailwind CSS and shadcn/ui components, animated with Framer Motion
- **Hosting**: Cloudflare Workers — serves the built static site *and* runs a small backend, from a single deployment
- **Chatbot backend**: The Worker exposes `POST /api/chat`, which calls Anthropic's API (Claude Haiku) server-side with a system prompt grounded in Sunil's real CV, so the assistant can only answer from real facts, never invented ones
- **CI/CD**: GitHub Actions — every push to `main` installs dependencies, builds the frontend, and deploys the Worker to Cloudflare automatically, including securely re-uploading the Anthropic API key as a Cloudflare secret on every deploy

See `ARCHITECTURE.md` for a visual diagram and a deeper breakdown of each piece.

---

## Local development

```bash
# from the repo root
pnpm install

# run the frontend locally
pnpm --filter sunil-ravva run dev

# typecheck everything (frontend + worker + shared packages)
pnpm run typecheck
```

## Building & deploying manually

Deployment normally happens automatically via GitHub Actions on every push to `main`. To deploy by hand if needed:

```bash
cd artifacts/sunil-ravva
PORT=3000 BASE_PATH=/ pnpm run build
cd ../..
wrangler deploy
```

### Required secret

The chatbot needs an Anthropic API key available to the Worker at runtime, stored as a Cloudflare secret (never committed to the repo):

```bash
echo "your_key_here" | wrangler secret put ANTHROPIC_API_KEY
```

In CI, this is supplied via a GitHub Actions repository secret of the same name and re-uploaded automatically on every deploy.

### Required GitHub Actions secrets

For the automated deploy workflow (`.github/workflows/deploy.yml`) to work, these three repository secrets must be set under **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → any Workers overview page, or the dashboard URL itself |
| `ANTHROPIC_API_KEY` | platform.claude.com → Settings → API Keys (create under the **Default** workspace) |

---

## Important operational note

Cloudflare's native Git integration (dashboard-based auto-deploy on push) is **intentionally disconnected** for this project. It has a known issue where it silently wipes Worker secrets on every deploy. GitHub Actions is the sole deploy path — don't reconnect the native integration without re-checking that behavior first.

---

## Content

Career history, certifications, awards, and education shown on the site (and known to the chatbot) reflect Sunil's actual CV. The chatbot's knowledge is defined in `worker/index.ts` and only answers from that grounded context — it doesn't have general web access and won't invent facts about Sunil it wasn't given.
