export type ProjectSize = "featured" | "large" | "medium" | "small";

export interface Project {
  id: string;
  name: string;
  category: string;
  oneLiner: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  size: ProjectSize;
  accent: "lime" | "dark" | "cream";
  details: {
    problem: string;
    solution: string;
    contribution: string;
    architecture: string;
    challenges: string;
  };
}

export const projects: Project[] = [
  {
    id: "battery-health",
    name: "Battery Health Monitoring Dashboard",
    category: "Full-Stack · IoT Data",
    oneLiner: "Real-time visibility into battery voltage, temperature and anomalies before they become failures.",
    description:
      "A full-stack monitoring system that ingests live battery telemetry, stores it in a MongoDB time-series collection, and surfaces it as live voltage/temperature graphs with threshold-based anomaly alerts and an auto-refreshing dashboard.",
    tech: ["Node.js", "Express", "MongoDB", "Mongoose", "React", "Chart.js", "Zustand", "JWT Auth"],
    github: "https://github.com/shrutikushwaha2110-ux/Battery-health-backend",
    size: "featured",
    accent: "lime",
    details: {
      problem:
        "Battery packs fail quietly — a voltage drop or a temperature spike is only useful information if someone sees it before the cell degrades. Raw sensor logs don't make that visible in real time.",
      solution:
        "A REST API ingests per-cell telemetry (voltage, temperature, charge cycles) into a MongoDB time-series collection, runs it through a rule-based anomaly detector on every write (low/high voltage, high/low temperature thresholds), and exposes aggregation endpoints that bucket readings into per-minute/per-hour trends. A React dashboard polls the API every 5 seconds and renders live Chart.js graphs, a colour-coded voltage/temperature status table, and a recent-anomalies feed, with JWT-protected routes and a small simulator script for generating realistic demo telemetry.",
      contribution:
        "Designed and built both the Express/MongoDB backend (schema, auth, aggregation pipeline, anomaly rules) and the React frontend (live graphs, status tables, polling/state management with Zustand).",
      architecture:
        "Express + Mongoose backend with a dedicated MongoDB time-series collection for telemetry, JWT authentication middleware, Joi request validation, and a Winston request logger. The frontend is a Create React App project using Chart.js for live graphs and Zustand for client state, polling `/api/telemetry` endpoints on a 5-second interval.",
      challenges:
        "Modelling telemetry as a true time-series collection (rather than a plain document store) so the aggregation pipeline could bucket by time window efficiently, and keeping the anomaly rules simple and inspectable rather than a black box — they're deliberately basic threshold checks, documented as a starting point rather than a finished ML model.",
    },
  },
  {
    id: "campusconnect",
    name: "CampusConnect",
    category: "Full-Stack · Campus Platform",
    oneLiner: "A role-based events & clubs platform for a university, with three separate dashboards and a tested SQLite backend.",
    description:
      "A multi-role campus platform for events, clubs and units: students browse and register for events and join clubs, club managers run their own club and events, and faculty/admin manage clubs, unit events and accounts — each with its own login, dashboard and permission rules enforced on both the client and the API.",
    tech: ["React 19", "TypeScript", "Vite", "Three.js", "Express", "SQLite", "Vitest"],
    github: "https://github.com/shrutikushwaha2110-ux/CAMPUS-CONNECT",
    size: "large",
    accent: "dark",
    details: {
      problem:
        "A university's events and clubs need three genuinely different experiences — a student registering for an event, a club manager running their club's announcements, and faculty approving new clubs and accounts — without three separate codebases or a permission model that can be bypassed from the browser.",
      solution:
        "A single React + TypeScript app with role-aware routing (`RequireRole` guards) and a shared library of pure permission/validation functions (`src/lib`) that both the UI and the Express API import, so every rule — seat limits, club membership caps, who can edit what — is checked identically in two places. Data lives in SQLite behind a small Express API; the browser never talks to the database directly and never sees another student's private data. A Three.js hero animation runs on the public home page, lazy-loaded so it doesn't block the rest of the app.",
      contribution:
        "Built end-to-end: the data model and SQLite schema, the shared rules library and its test suite, the three role-specific dashboards, the Express API and session auth, and the Three.js hero scene.",
      architecture:
        "React 19 + Vite 7 + TypeScript frontend using a hash router; Express 5 API with `node:sqlite`, scrypt password hashing and httpOnly session cookies; a shared `lib/` layer of pure functions (seats, memberships, permissions, validation) imported by both browser and server and covered by Vitest; end-to-end scenarios driven with Puppeteer against a real temporary database.",
      challenges:
        "Keeping business rules from leaking into components as one-off checks (a hard-coded role comparison in a page, a seat-count computed inline) instead of the shared `lib` functions — and re-verifying every write server-side, since anything checked only in the browser can be bypassed by calling the API directly.",
    },
  },
  {
    id: "samagama-faq",
    name: "Samagama FAQ Portal",
    category: "AI/ML · RAG",
    oneLiner: "An AI-powered FAQ portal that answers programme questions using Retrieval-Augmented Generation over real institutional content.",
    description:
      "A FAQ and Q&A portal built for the Vicharanashala Internship Programme at IIT Ropar, combining a Next.js frontend (search, voice input, a community Q&A flow) with a Python RAG service that chunks and embeds source documents into ChromaDB and answers questions grounded in that content instead of a general-purpose model's guesses.",
    tech: ["Next.js", "TypeScript", "React", "MongoDB", "Python", "FastAPI", "ChromaDB", "Gemini Embeddings"],
    github: "https://github.com/shrutikushwaha2110-ux/c37",
    size: "large",
    accent: "cream",
    details: {
      problem:
        "Programme participants ask the same practical questions repeatedly (registration, deadlines, requirements), and a support team can't answer everyone instantly — but a plain chatbot without grounding will confidently make things up.",
      solution:
        "Source documents are parsed and split into overlapping, sentence-aware chunks sized for the embedding model's token limit, embedded with Gemini's embedding model, and persisted in a local ChromaDB vector store. A FastAPI service exposes `/query` (embed the question, retrieve the closest chunks, generate a cited answer) and `/search` (retrieval only). The Next.js frontend layers a searchable FAQ page, fuzzy client-side search, a duplicate-question detector on the ask flow, and a community Q&A section with voting and admin review on top of that service.",
      contribution:
        "Restructured the FAQ web app's data layer onto React Query and Zustand, added several of the community and dashboard views, and optimised the RAG API integration between the Next.js app and the Python retrieval service.",
      architecture:
        "Next.js 16 (App Router) + React 19 + TypeScript frontend with MongoDB for FAQ/community data, talking to a separate FastAPI + ChromaDB retrieval service that handles chunking, embedding and grounded answer generation.",
      challenges:
        "Chunking documents so each piece stays under the embedding model's hard token limit without cutting a sentence in half, and keeping retrieval answers grounded in the indexed content rather than letting the model fall back on general knowledge when the retrieved context is thin.",
    },
  },
  {
    id: "expenseflow",
    name: "ExpenseFlow",
    category: "Backend · REST API",
    oneLiner: "A JWT-authenticated expense tracker API with categorised spending, monthly views and rate-limited endpoints.",
    description:
      "A RESTful backend for a personal expense tracker: register/login with hashed passwords and JWT sessions, full CRUD on categorised expenses, and monthly spend summaries, backed by MongoDB and protected with request rate limiting — served alongside a lightweight vanilla-JS single-page frontend.",
    tech: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "express-rate-limit"],
    github: "https://github.com/shrutikushwaha2110-ux/BACKEND",
    size: "medium",
    accent: "dark",
    details: {
      problem:
        "Most tutorial expense trackers skip the parts that make an API production-shaped: authentication, input validation, and protection against abuse.",
      solution:
        "An Express + MongoDB REST API with a dedicated auth flow (JWT issuing/verification middleware), Mongoose schemas for users and expenses, category-based filtering, and an `express-rate-limit` layer configured through environment variables so limits can be tuned per deployment without a code change.",
      contribution:
        "Built the complete backend — auth, models, controllers, rate limiting, error handling — and the vanilla JS/CSS frontend that consumes it.",
      architecture:
        "Express REST API (`controllers/`, `routes/`, `middleware/`, `models/`) over MongoDB via Mongoose, JWT bearer auth, a centralised error-handling middleware, and a static frontend (HTML/CSS/vanilla JS) calling the API directly.",
      challenges:
        "Structuring auth and validation as reusable middleware rather than duplicating checks in every controller, and tuning rate-limit windows so they stop abuse without throttling normal use.",
    },
  },
  {
    id: "rogue-tower",
    name: "Rogue Tower",
    category: "Frontend · Game Dev",
    oneLiner: "A dependency-free tower-defense game built on raw Canvas and vanilla JavaScript.",
    description:
      "A browser tower-defense game — place towers, they auto-target the nearest enemy in range, survive escalating waves — built with no frameworks or build step, just HTML5 Canvas and vanilla JS handling rendering, spawning, combat and input.",
    tech: ["HTML5 Canvas", "JavaScript", "CSS"],
    github: "https://github.com/shrutikushwaha2110-ux/Rogue-Tower",
    size: "small",
    accent: "lime",
    details: {
      problem:
        "Wanted to practise real-time game logic — collision, targeting, spawning — without a framework doing the work.",
      solution:
        "A `<canvas>` render loop drives enemy movement along a fixed path, tower range/targeting (nearest enemy in radius), projectile collision, coin economy, and progressively harder waves, entirely in one `script.js` with no external libraries.",
      contribution:
        "Designed and implemented the entire game solo: rendering loop, combat/targeting logic, wave difficulty curve and UI/HUD.",
      architecture:
        "Static site — `index.html` + `style.css` + a single `script.js` handling the canvas render loop, game state and input, with no build tooling required.",
      challenges:
        "Keeping the targeting and collision checks cheap enough to run every frame as the number of towers and enemies grows, and tuning the wave difficulty curve so it ramps up without spiking unfairly.",
    },
  },
];
