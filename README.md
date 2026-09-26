# Shruti Kushwaha — Portfolio

A personal developer portfolio: a React + TypeScript + Vite frontend (no Tailwind, plain CSS)
and a small Express backend that powers an AI portfolio assistant using the Anthropic Claude
API, with a keyword-based fallback so the site works even without an API key.

- **Live site:** `https://shrutikushwaha2110-ux.github.io/Portfolio/` (after you enable Pages — see below)
- **Frontend:** [`client/`](client) — React 19 + TypeScript + Vite, plain CSS
- **Backend:** [`server/`](server) — Express + the Anthropic TypeScript SDK

## What it does

- A single-page portfolio: hero, about, a project showcase (5 real GitHub projects with
  detail modals), skills, experience/achievements, and contact.
- A floating **AI assistant** (bottom-right) that answers visitor questions about Shruti's
  projects, skills and experience, grounded in [`server/src/data/portfolioKnowledge.ts`](server/src/data/portfolioKnowledge.ts)
  so it never invents claims. Falls back to keyword-based answers if the Anthropic API key
  isn't configured, so the chatbot is never fully broken.
- Fully responsive, keyboard-accessible, and respects `prefers-reduced-motion`.

## Project structure

```
client/               React + Vite + TypeScript frontend
  src/
    components/        Reusable UI (Navbar, Footer, Chatbot, ProjectCard, ProjectModal, icons/)
    sections/          Page sections (Hero, About, Projects, Skills, Experience, Contact)
    data/              Content: profile.ts, projects.ts, skills.ts
    hooks/             useReveal (scroll animations), useScrolled
    lib/               chatApi.ts (talks to the backend)
    styles/            Global CSS variables + base styles
server/                Express backend for the AI chatbot
  src/
    routes/chat.ts      POST /api/chat
    services/           Anthropic client, system prompt builder, keyword fallback
    data/               portfolioKnowledge.ts — single source of truth for the chatbot
.github/workflows/     GitHub Actions: builds & deploys client/ to GitHub Pages
render.yaml            Optional Render blueprint for the backend
```

## Run it locally

You need two terminals: one for the backend, one for the frontend.

```bash
# 1. Backend (AI chat API)
cd server
npm install
cp .env.example .env      # leave ANTHROPIC_API_KEY unset to use fallback mode
npm run dev                # http://localhost:5174

# 2. Frontend
cd client
npm install
cp .env.example .env       # defaults already point at http://localhost:5174
npm run dev                # http://localhost:5173
```

Open `http://localhost:5173`. The site works fully without the backend running (everything
except the chatbot); the chatbot works without an Anthropic key too, using fallback answers.

## Configuring the Anthropic API key (for real AI chat)

1. Get a key from the [Anthropic Console](https://console.anthropic.com/).
2. In `server/.env`, set:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ANTHROPIC_MODEL=claude-haiku-4-5-20251001
   ```
3. Restart `npm run dev` in `server/`. The health check at `http://localhost:5174/health`
   will report `"aiConfigured": true`.

The frontend never sees this key — it only talks to your backend's `/api/chat` endpoint.

## Adding or editing projects

Edit [`client/src/data/projects.ts`](client/src/data/projects.ts). Each project is one object
with `name`, `category`, `oneLiner`, `description`, `tech`, `github`, an optional `demo`, a
`size` (`"featured" | "large" | "medium" | "small"`, controls the grid layout) and a `details`
object (problem/solution/contribution/architecture/challenges) shown in the project modal.

If you add or change a project, also update
[`server/src/data/portfolioKnowledge.ts`](server/src/data/portfolioKnowledge.ts) so the AI
chatbot's answers stay accurate — it only knows what's written there.

## Deploying

### Frontend → GitHub Pages (automated)

This repo includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
`client/` and publishes it to GitHub Pages on every push to `main`.

**One-time setup (you need to do this in the GitHub UI):**

1. Push this repo to GitHub as `shrutikushwaha2110-ux/Portfolio` (or any name — see below).
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. (Optional, for a working live chatbot) Go to **Settings → Secrets and variables → Actions
   → Variables** and add `VITE_API_BASE_URL` with your deployed backend's URL (see below).
4. Push to `main` (or run the workflow manually from the **Actions** tab). After it finishes,
   your site is live at `https://shrutikushwaha2110-ux.github.io/Portfolio/`.

**If you rename the repository** (i.e. it's not called `Portfolio`), update the
`VITE_BASE_PATH` value in `.github/workflows/deploy.yml` to `/<your-repo-name>/` — it must
match exactly, including the leading/trailing slashes.

Push commands, once you've created the empty repo on GitHub:

```bash
git remote add origin https://github.com/shrutikushwaha2110-ux/Portfolio.git
git branch -M main
git push -u origin main
```

### Backend → Render (or any Node host)

GitHub Pages only serves static files, so the Express/Anthropic backend needs a separate host.
[`render.yaml`](render.yaml) is a ready-to-use Render blueprint.

1. On [Render](https://render.com), **New → Blueprint**, connect this GitHub repo, and it will
   read `render.yaml` (root dir `server`, build `npm install && npm run build`, start
   `npm start`). Or create a **Web Service** manually with those same settings.
2. In the Render service's **Environment** tab, set:
   - `ANTHROPIC_API_KEY` — your real key (**this is the only place it should ever live**)
   - `ANTHROPIC_MODEL` — e.g. `claude-haiku-4-5-20251001` (optional, has a default)
   - `CORS_ORIGIN` — `https://shrutikushwaha2110-ux.github.io` (your GitHub Pages origin)
3. Deploy. Copy the resulting URL (e.g. `https://shruti-portfolio-api.onrender.com`).
4. Back in your GitHub repo: **Settings → Secrets and variables → Actions → Variables → New
   repository variable**, name `VITE_API_BASE_URL`, value = that Render URL. Re-run the
   `Deploy frontend to GitHub Pages` workflow (Actions tab → select it → Run workflow) so the
   built frontend picks it up.

The site works without step 4 too — the chatbot just falls back to a "backend unavailable,
email me instead" message instead of live AI or keyword answers.

## Environment variables reference

| Variable | Where | Required | Purpose |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | `server/.env` (or Render env) | No | Enables real AI chat. Without it, chatbot uses keyword fallback. |
| `ANTHROPIC_MODEL` | `server/.env` (or Render env) | No | Overrides the Claude model (default: `claude-haiku-4-5-20251001`). |
| `PORT` | `server/.env` | No | Port the API listens on (default `5174`, or `10000` on Render). |
| `CORS_ORIGIN` | `server/.env` (or Render env) | Recommended in prod | Comma-separated list of allowed frontend origins. |
| `VITE_API_BASE_URL` | `client/.env` (or GH Actions variable) | No | Base URL the frontend calls for `/api/chat` (default `http://localhost:5174`). |
| `VITE_BASE_PATH` | Set by `deploy.yml` | Only for CI | Vite's `base` path for the GitHub Pages subfolder. |

## Notes on what's real

Every project on this site links to a real public repository under
[github.com/shrutikushwaha2110-ux](https://github.com/shrutikushwaha2110-ux), and the
descriptions were written from reading each repo's actual code, not invented. If you fork this
for yourself, update `client/src/data/*.ts` and `server/src/data/portfolioKnowledge.ts` with
your own verified information.

---
Built with React, TypeScript, Vite and the Anthropic Claude API.
