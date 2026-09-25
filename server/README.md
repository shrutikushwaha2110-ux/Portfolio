# Portfolio API (backend)

Small Express + TypeScript backend that powers the AI portfolio assistant on Shruti's
portfolio site. It exposes one route, `POST /api/chat`, backed by the Anthropic Claude API,
with a keyword-based fallback when no API key is configured.

## Run locally

```bash
npm install
cp .env.example .env   # see below for what to fill in
npm run dev             # http://localhost:5174, auto-restarts on change
```

Check `http://localhost:5174/health` — it returns `{ "status": "ok", "aiConfigured": bool }`.

## Environment variables

See `.env.example`. Nothing is required to run — without `ANTHROPIC_API_KEY` the `/api/chat`
route still works, using keyword-based fallback answers from
[`src/data/portfolioKnowledge.ts`](src/data/portfolioKnowledge.ts).

| Variable | Required | Default | Notes |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | No | — | Real key enables AI-generated answers. |
| `ANTHROPIC_MODEL` | No | `claude-haiku-4-5-20251001` | Any current Claude model id. |
| `PORT` | No | `5174` | |
| `CORS_ORIGIN` | No (default allows local dev) | `http://localhost:5173` | Comma-separated list of allowed origins. |

## API

### `GET /health`
Returns `{ status: "ok", aiConfigured: boolean }`. No auth, used for uptime checks.

### `POST /api/chat`
```json
{ "message": "What technologies does Shruti use?", "history": [{ "role": "user", "content": "..." }] }
```
- `message`: required, non-empty string, max 1000 characters.
- `history`: optional array of prior turns (`role`: `"user" | "assistant"`), max 20 kept.
- Rate limited to 15 requests/minute per IP.

Response:
```json
{ "reply": "...", "mode": "ai" | "fallback", "degraded": true }
```
`mode` is `"fallback"` when no API key is configured, or `"ai"` when Claude answered.
`degraded: true` appears if the Anthropic API call failed and the response fell back to
keyword answers for that one message.

## Build & deploy

```bash
npm run build   # tsc -> dist/
npm start        # node dist/index.js
```

See the root [README](../README.md#backend--render-or-any-node-host) for full deployment
instructions to Render, and [`render.yaml`](../render.yaml) for a ready blueprint.

**Never commit `.env`.** `ANTHROPIC_API_KEY` should only ever live in your local `.env` (which
is gitignored) or your hosting provider's environment variable settings.
