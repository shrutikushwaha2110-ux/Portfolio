import { portfolioKnowledge } from "../data/portfolioKnowledge.js";

// Keyword-based fallback used when ANTHROPIC_API_KEY is not configured,
// so the chat widget still gives useful answers without the AI backend.

interface Rule {
  keywords: string[];
  answer: () => string;
}

const k = portfolioKnowledge;

const rules: Rule[] = [
  {
    keywords: ["battery", "voltage", "anomaly", "telemetry"],
    answer: () => {
      const p = k.projects.find((pr) => pr.name.includes("Battery"))!;
      return `${p.summary}\n\nRepo: ${p.repo}`;
    },
  },
  {
    keywords: ["campusconnect", "campus connect", "clubs", "events platform"],
    answer: () => {
      const p = k.projects.find((pr) => pr.name.includes("CampusConnect"))!;
      return `${p.summary}\n\nRepo: ${p.repo}`;
    },
  },
  {
    keywords: ["faq", "rag", "samagama", "retrieval"],
    answer: () => {
      const p = k.projects.find((pr) => pr.name.includes("Samagama"))!;
      return `${p.summary}\n\nRepo: ${p.repo}`;
    },
  },
  {
    keywords: ["expenseflow", "expense", "spendsmart"],
    answer: () => {
      const p = k.projects.find((pr) => pr.name.includes("ExpenseFlow"))!;
      return `${p.summary}\n\nRepo: ${p.repo}`;
    },
  },
  {
    keywords: ["rogue tower", "game", "canvas"],
    answer: () => {
      const p = k.projects.find((pr) => pr.name.includes("Rogue"))!;
      return `${p.summary}\n\nRepo: ${p.repo}`;
    },
  },
  {
    keywords: ["project", "projects", "work", "built", "portfolio"],
    answer: () =>
      `Shruti has built ${k.projects.length} main projects: ${k.projects
        .map((p) => p.name)
        .join(", ")}. Ask me about any one of them by name for details.`,
  },
  {
    keywords: ["technology", "technologies", "tech stack", "language", "skills", "stack"],
    answer: () =>
      `Shruti works with: Programming — ${k.skills.programming.join(", ")}. Frontend — ${k.skills.frontend.join(
        ", "
      )}. Backend — ${k.skills.backend.join(", ")}. Databases/AI — ${k.skills.databases_ai.join(
        ", "
      )}. Tools — ${k.skills.tools.join(", ")}.`,
  },
  {
    keywords: ["hackathon", "role", "achievement", "competition"],
    answer: () => k.experience.map((e) => `${e.role}: ${e.details}`).join("\n\n"),
  },
  {
    keywords: ["intern", "internship", "available", "availability", "hire", "job"],
    answer: () =>
      `Yes — ${k.profile.availability.toLowerCase()} Best way to reach out is email: ${k.contact.email}.`,
  },
  {
    keywords: ["contact", "email", "phone", "reach", "connect"],
    answer: () =>
      `You can reach Shruti at ${k.contact.email} or ${k.contact.phone}. GitHub: ${k.contact.github}`,
  },
  {
    keywords: ["education", "college", "university", "degree", "study", "atria"],
    answer: () => `${k.profile.education} She's based in ${k.profile.location}.`,
  },
  {
    keywords: ["who is shruti", "about shruti", "who are you", "tell me about her"],
    answer: () => k.profile.bio,
  },
];

export function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.answer();
    }
  }
  return `I don't have advanced AI chat available right now (the assistant is running in limited fallback mode), but here's what I can tell you: Shruti is a 3rd-year B.Tech CS (AI/ML) student at Atria University, Bengaluru, ${k.profile.availability.toLowerCase()} Try asking about a specific project (e.g. "battery dashboard", "CampusConnect", "FAQ portal"), her skills, or how to contact her — or email her directly at ${k.contact.email}.`;
}
