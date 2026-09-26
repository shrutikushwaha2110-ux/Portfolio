# CLAUDE.md

Guidance for Claude Code (or any AI agent) working in this repository.

## What this is

Shruti Kushwaha's personal developer portfolio: a React + TypeScript + Vite
frontend (plain CSS, no Tailwind) and a small Express backend that powers an
AI chat assistant using the Anthropic API. See [README.md](README.md) for the
full run/deploy instructions — this file is about how to work *in* the repo.

## Structure

```
client/     React + Vite + TypeScript frontend (see client's own file layout
            under src/components, src/sections, src/data, src/hooks, src/lib)
server/     Express + Anthropic SDK backend, one route: POST /api/chat
.github/workflows/deploy.yml   Builds client/ and deploys it to GitHub Pages
render.yaml                    Render blueprint for deploying server/
```

Two independent Node projects, each with its own `package.json` and
`node_modules` — always `cd client` or `cd server` before running `npm`
commands, there is no root-level install.

## Ground rules

1. **No fabricated content.** Every project on the site links to a real
   GitHub repo under `github.com/shrutikushwaha2110-ux`, and every claim in
   `client/src/data/projects.ts` and `server/src/data/portfolioKnowledge.ts`
   was written from actually reading that repo's code. If you add or edit a
   project, verify the claim against the real repo first — don't guess at
   tech stack or features.
2. **Keep the two data sources in sync.** `client/src/data/projects.ts` (what
   visitors see) and `server/src/data/portfolioKnowledge.ts` (what the AI
   chatbot is allowed to say) describe the same projects. Editing one without
   the other means the chatbot and the page can contradict each other.
3. **No secrets in the frontend.** `ANTHROPIC_API_KEY` lives only in
   `server/.env` (gitignored) or the hosting provider's env vars. The client
   never talks to Anthropic directly, only to `server`'s `/api/chat`.
4. **The site must work with the backend unavailable.** The chatbot has a
   keyword-based fallback (`server/src/services/fallbackResponder.ts`) for
   exactly this reason — don't add a feature that hard-fails without the API.
5. **Respect `prefers-reduced-motion`.** Every animation/interaction added so
   far (hero intro, avatar eye-tracking, card tilt/parallax) has a reduced-
   motion branch. New motion should too.
6. **Plain CSS, not Tailwind.** Each component/section has its own adjacent
   `.css` file, using the custom properties defined in
   `client/src/styles/variables.css`.

## Before committing

- `cd client && npx tsc --noEmit -p tsconfig.app.json` (or `npm run build`)
  — must be clean.
- `cd server && npm run typecheck` — must be clean.
- If you touched anything visual, actually look at it (dev server + browser),
  at both desktop and mobile widths, before calling it done.
