export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Programming", items: ["JavaScript", "TypeScript", "Python", "SQL"] },
  { label: "Frontend", items: ["HTML", "CSS", "React", "Responsive Web Development"] },
  { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases & AI", items: ["MongoDB", "MySQL", "RAG Fundamentals"] },
  { label: "Tools", items: ["Git", "GitHub", "VS Code"] },
  { label: "Core Concepts", items: ["OOP", "Data Structures & Algorithms", "REST API Design"] },
];

export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    period: "May – Jun 2025",
    title: "Summer Intern",
    place: "Vicharanashala Lab, IIT Ropar",
    description:
      "Extended a live production website with new features in JavaScript, Node.js and MongoDB, and designed a Retrieval-Augmented Generation feature that grounds the platform's answers in its own content. Collaborated with the lab team to debug and deploy updates to a live codebase.",
  },
  {
    period: "Inter-College",
    title: "Hackathon Competitions",
    place: "AIT & BIT",
    description:
      "Advanced to the second round of an inter-college hackathon and cleared the first round in several others, building working prototypes under strict time constraints and contributing backend logic and UI integration alongside a team.",
  },
  {
    period: "Ongoing",
    title: "Independent Projects",
    place: "Self-directed",
    description:
      "Shipped several end-to-end projects — a real-time monitoring dashboard, a role-based campus platform, REST APIs with authentication — to build hands-on depth in full-stack development and system design outside of coursework.",
  },
];
