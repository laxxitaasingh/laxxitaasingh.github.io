export type Skill = {
  id: string;
  name: string;
  short: string;
  detail: string;
  accent: string;
  orbit: number;
  speed: number;
  icon: string;
};

export type Project = {
  id: string;
  title: string;
  category: "Frontend" | "Full-stack" | "AI";
  description: string;
  stack: string[];
  href: string;
  accent: string;
  metrics: string;
};

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    short: "UI systems",
    detail: "Composable interfaces, stateful product flows, animation layers, and polished interaction states.",
    accent: "#61dafb",
    orbit: 1.08,
    speed: 0.24,
    icon: "⚛",
  },
  {
    id: "next",
    name: "Next.js",
    short: "Static + app router",
    detail: "Production-ready App Router builds, static export pipelines, metadata, routing, and performance budgets.",
    accent: "#f8fafc",
    orbit: 1.22,
    speed: 0.19,
    icon: "N",
  },
  {
    id: "typescript",
    name: "TypeScript",
    short: "Typed product code",
    detail: "Strict component contracts, safer API edges, reusable domain types, and maintainable project structure.",
    accent: "#7dd3fc",
    orbit: 1.36,
    speed: 0.16,
    icon: "TS",
  },
  {
    id: "node",
    name: "Node.js",
    short: "APIs + services",
    detail: "Backend services, real-time sockets, authentication surfaces, and clean data handoffs.",
    accent: "#86efac",
    orbit: 1.16,
    speed: 0.21,
    icon: "⬢",
  },
  {
    id: "angular",
    name: "Angular",
    short: "Structured apps",
    detail: "Feature modules, reactive forms, services, and operational interfaces for repeated workflows.",
    accent: "#ff6b6b",
    orbit: 1.28,
    speed: 0.17,
    icon: "A",
  },
  {
    id: "aws",
    name: "AWS",
    short: "Cloud foundations",
    detail: "Deployment-aware architecture, static hosting, storage, and pragmatic cloud integration patterns.",
    accent: "#fbbf24",
    orbit: 1.42,
    speed: 0.14,
    icon: "AWS",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    short: "Relational data",
    detail: "Schema-aware data models, query design, and durable foundations for product backends.",
    accent: "#93c5fd",
    orbit: 1.34,
    speed: 0.18,
    icon: "PG",
  },
  {
    id: "golang",
    name: "Golang",
    short: "Fast services",
    detail: "Simple, reliable service logic and backend tooling where performance and clarity matter.",
    accent: "#22d3ee",
    orbit: 1.12,
    speed: 0.23,
    icon: "Go",
  },
];

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Immersive Portfolio",
    category: "Frontend",
    description: "A cinematic static-export Next.js portfolio with glass UI, motion systems, and a WebGL-inspired scene.",
    stack: ["Next.js", "TypeScript", "R3F", "Framer Motion"],
    href: "https://github.com/laxxitaasingh/laxxitaasingh.github.io",
    accent: "#36f5c7",
    metrics: "Static export ready",
  },
  {
    id: "wordle",
    title: "Wordle 2.0",
    category: "Full-stack",
    description: "A real-time word game experiment built with React, Node.js, JavaScript, and Socket.io.",
    stack: ["React", "Node.js", "Socket.io"],
    href: "https://github.com/laxxitaasingh/Wordle-2.0",
    accent: "#a78bfa",
    metrics: "Realtime gameplay",
  },
  {
    id: "todo",
    title: "To-Do App",
    category: "Full-stack",
    description: "A CRUD task management app with Angular, Node.js, and MySQL-backed workflow management.",
    stack: ["Angular", "Node.js", "MySQL"],
    href: "https://github.com/laxxitaasingh/To-Do-App",
    accent: "#60a5fa",
    metrics: "Database-backed",
  },
  {
    id: "har",
    title: "Analytics-SaaS-Platform",
    category: "Full-stack",
    description: "Real-Time Collaborative Analytics Platform.",
    stack: ["Golang", "Next.js", "PostgreSQL","Data", "UX", "Analytics"],
    href: "https://github.com/laxxitaasingh/Analytics-SaaS-Platform/tree/master",
    accent: "#f59e0b",
    metrics: "Database-backed",
  },
  {
    id: "emp-man",
    title: "Employee-management",
    category: "Full-stack",
    description: "Track employee lifecycle.",
    stack: ["Data", "UX", "Analytics","Angular", "Node.js", "MySQL"],
    href: "https://github.com/laxxitaasingh/Employee-management",
    accent: "#34d399",
    metrics: "Employee tech",
  },
];

export const stats = [
  { label: "Years Learning", value: "4+" },
  { label: "Projects Built", value: "10+" },
  { label: "Technologies Used", value: "14+" },
  { label: "Open Source Contributions", value: "∞" },
];

export const commands = [
  { label: "View projects", href: "#projects" },
  { label: "Explore skills", href: "#skills" },
  { label: "Open GitHub", href: "https://github.com/laxxitaasingh" },
  { label: "Email Laxita", href: "mailto:laxitasingh2112@gmail.com" },
  { label: "Open LinkedIn", href: "https://www.linkedin.com/in/laxita-singh-b72299213/" },
];
