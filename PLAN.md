# Project Plan / Spec

## What I'm building

A personal developer portfolio for internship applications: a single-page
React site (hero, about, projects, skills, experience, contact) backed by a
small Express API that powers an AI assistant visitors can ask about my
projects, skills, and experience.

## Core features

| Feature | Status |
|---|---|
| Hero section with animated intro (portrait → name → page opens up) | Done |
| Illustrated avatar with cursor-tracking eyes, blink, 3D tilt | Done |
| About section with bio + info card | Done |
| Project showcase (5 real projects, each with a real screenshot, tech tags, and a detail modal) | Done |
| Skills section, grouped by category | Done |
| Experience / achievements timeline | Done |
| Contact section (email/phone/GitHub, with copy-to-clipboard fallback + a toast confirming the action) | Done |
| AI chatbot (floating widget, suggested questions, typing indicator, error/reset states) | Done |
| Chatbot backend: Express + Anthropic API, with a keyword-based fallback when no API key is set | Done |
| Responsive layout (mobile nav, mobile-safe project grid, mobile chatbot) | Done |
| Scroll-triggered reveals, project card tilt/parallax on scroll | Done |
| GitHub Pages deploy workflow for the frontend | Done |
| Render blueprint for the backend | Done |
| SEO metadata (title, description, OG tags, favicon) | Done |
| Live deploy verified end-to-end on GitHub Pages + Render | Pending — needs the repo owner to connect the GitHub Pages and Render dashboards (see README) |
| Automated tests (unit/e2e) | Pending — not started; the project is currently verified by manual browser testing during development |

## Architecture

- `client/` — React 19 + TypeScript + Vite, plain CSS. Content lives in
  `client/src/data/*.ts`, not hardcoded in components.
- `server/` — Express + the Anthropic TypeScript SDK, one route
  (`POST /api/chat`). Its knowledge of "me" is a single JSON-shaped file
  (`portfolioKnowledge.ts`) injected into the system prompt, so the model
  can't invent claims beyond what's verified there.
- No database — the site has no user-generated content to persist.

## What's explicitly out of scope (for now)

- A CMS or admin UI for editing project content (content is edited directly
  in `client/src/data/projects.ts`).
- User accounts / authentication (nothing on the site requires them).
- Automated test coverage (see table above).
