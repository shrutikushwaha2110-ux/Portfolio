// Single source of truth for the AI portfolio assistant.
// Keep this in sync with client/src/data/{profile,projects,skills}.ts.
// The chatbot must never claim anything that isn't grounded here.

export const portfolioKnowledge = {
  profile: {
    name: "Shruti Kushwaha",
    location: "Bengaluru, Karnataka, India",
    education:
      "3rd-year B.Tech in Computer Science, specializing in Digital Transformation (AI/ML), at Atria University, Bengaluru.",
    goal: "Seeking a software engineering / AI-ML internship.",
    availability: "Open to internship opportunities.",
    email: "shrutikushwaha2110@gmail.com",
    phone: "+91 9880462478",
    github: "https://github.com/shrutikushwaha2110-ux",
    bio: "Shruti is a third-year B.Tech CS (AI/ML) student who learns primarily by building and shipping real projects: a real-time battery monitoring dashboard, a role-based campus events platform, a Retrieval-Augmented Generation feature built during a summer internship at IIT Ropar's Vicharanashala Lab, and REST APIs with authentication. She is comfortable across the stack — backend schemas, auth and data pipelines, and the frontend that presents them.",
  },

  experience: [
    {
      role: "Summer Intern, Vicharanashala Lab, IIT Ropar",
      period: "May – Jun 2025",
      details:
        "Extended a live production website with new features using JavaScript, Node.js and MongoDB. Designed and integrated a Retrieval-Augmented Generation (RAG) feature enabling context-aware responses grounded in the lab's existing content. Collaborated with the lab team to debug and deploy updates to a live codebase.",
    },
    {
      role: "Inter-college hackathons (AIT & BIT)",
      details:
        "Advanced to the second round in one inter-college hackathon; cleared the first round in several others. Built working prototypes under time constraints, contributing backend logic and UI integration as part of a team.",
    },
  ],

  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "SQL"],
    frontend: ["HTML", "CSS", "React", "Responsive web development"],
    backend: ["Node.js", "Express.js", "REST APIs"],
    databases_ai: ["MongoDB", "MySQL", "RAG fundamentals"],
    tools: ["Git", "GitHub", "VS Code"],
    core_concepts: ["OOP", "Data Structures & Algorithms", "REST API design"],
  },

  projects: [
    {
      name: "Battery Health Monitoring Dashboard",
      category: "Full-stack, IoT data",
      repo: "https://github.com/shrutikushwaha2110-ux/Battery-health-backend",
      summary:
        "A full-stack real-time battery monitoring system. An Express + MongoDB backend stores telemetry (voltage, temperature, charge cycles) in a MongoDB time-series collection, runs a rule-based anomaly detector on every incoming reading (thresholds: voltage below 2.8V or above 4.3V, temperature above 60°C or below -20°C), and exposes an aggregation endpoint that buckets readings into per-minute/per-hour trends. A React dashboard (Chart.js, Zustand) polls the API every 5 seconds for live voltage/temperature graphs, a colour-coded status table, and a recent-anomalies feed. JWT-protected routes; a simulator script generates demo telemetry via setInterval.",
      how_anomaly_detection_works:
        "It is a rule-based threshold checker (utils/anomalyDetector.js), not a trained ML model: it flags LOW_VOLTAGE (<2.8V), HIGH_VOLTAGE (>4.3V), HIGH_TEMPERATURE (>60°C) and LOW_TEMPERATURE (<-20°C) on each ingested reading. The code comments note it's 'expandable to ML models' — that expansion hasn't been built yet, so don't claim there's a trained anomaly-detection model.",
      tech: ["Node.js", "Express", "MongoDB", "Mongoose", "React", "Chart.js", "Zustand", "JWT"],
    },
    {
      name: "CampusConnect",
      category: "Full-stack, campus platform",
      repo: "https://github.com/shrutikushwaha2110-ux/CAMPUS-CONNECT",
      summary:
        "A multi-role events/clubs platform for a university with three separate logins and dashboards: Students browse events and join up to 2 clubs; Club Managers run exactly one club (Manage club + Events only); Faculty head one club and manage university-wide clubs, unit events and accounts. Built with React 19 + TypeScript + Vite, a Three.js hero animation, and an Express + SQLite backend. Every business rule (seat limits, club caps, who can edit what) lives as a pure function in src/lib and is imported by BOTH the browser and the server, so the server re-checks everything the client already checked. Covered by 100+ Vitest unit/API tests and dozens of Puppeteer end-to-end scenarios.",
      tech: ["React 19", "TypeScript", "Vite", "Three.js", "Express", "SQLite", "Vitest"],
    },
    {
      name: "Samagama FAQ Portal",
      category: "AI/ML, Retrieval-Augmented Generation",
      repo: "https://github.com/shrutikushwaha2110-ux/c37",
      summary:
        "An AI-powered FAQ portal built for the Vicharanashala Internship Programme at IIT Ropar. A Next.js + TypeScript frontend offers FAQ search (with fuzzy matching and voice input), an 'ask a question' flow with duplicate-question detection, and a community Q&A section with voting. A separate Python FastAPI service chunks source documents (sentence-aware, sized for the embedding model's token limit), embeds them with Gemini's embedding model, stores vectors in ChromaDB, and answers questions by retrieving the closest chunks and generating a grounded response. Shruti restructured the frontend's data layer onto React Query and Zustand, added several community/dashboard views, and optimized the RAG API integration.",
      tech: ["Next.js", "TypeScript", "React", "MongoDB", "Python", "FastAPI", "ChromaDB", "Gemini embeddings"],
    },
    {
      name: "ExpenseFlow",
      category: "Backend, REST API",
      repo: "https://github.com/shrutikushwaha2110-ux/BACKEND",
      summary:
        "A JWT-authenticated expense tracker REST API: register/login with hashed passwords, full CRUD on categorised expenses, monthly spend views, and an express-rate-limit layer configured via environment variables. Served with a vanilla JS/CSS single-page frontend. Built end-to-end — auth, models, controllers, middleware — by Shruti.",
      tech: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "express-rate-limit"],
    },
    {
      name: "Rogue Tower",
      category: "Frontend, game dev",
      repo: "https://github.com/shrutikushwaha2110-ux/Rogue-Tower",
      summary:
        "A browser tower-defense game built with plain HTML5 Canvas and vanilla JavaScript — no frameworks, no build step. Towers auto-target the nearest enemy in range; waves get progressively harder. Solo project practising real-time rendering-loop and collision/targeting logic.",
      tech: ["HTML5 Canvas", "JavaScript", "CSS"],
    },
  ],

  contact: {
    email: "shrutikushwaha2110@gmail.com",
    phone: "+91 9880462478",
    github: "https://github.com/shrutikushwaha2110-ux",
    availability: "Open to internship opportunities.",
  },
};

export type PortfolioKnowledge = typeof portfolioKnowledge;
