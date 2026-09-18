// =============================================================
// PROJECTS DATA — 7 real projects in display order
// =============================================================

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  status: "COMPLETED" | "IN DEVELOPMENT" | "ARCHIVED";
  category: string;
  liveUrl: string;     // Empty string = button hidden
  repoUrl: string;     // Empty string = button hidden
  caseStudyUrl: string;// Empty string = button hidden
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "ENERGY INTELLIGENCE SYSTEM",
    description: "An AI-powered energy intelligence platform for forecasting energy consumption and detecting abnormal usage patterns.",
    longDescription: "Combines machine learning forecasting models with anomaly detection algorithms to provide actionable insights on energy usage. Built to help identify inefficiencies and flag abnormal consumption in real time.",
    techStack: ["Python", "Machine Learning", "Data Analysis", "Anomaly Detection", "Forecasting"],
    status: "COMPLETED",
    category: "AI / MACHINE LEARNING",
    liveUrl: "https://energy-intelligence-system.vercel.app/",
    repoUrl: "https://github.com/PrajithVellingiri/energy-intelligence-system",
    caseStudyUrl: "",
    featured: true,
    year: 2026,
  },
  {
    id: "PRJ-002",
    name: "INVENTORY MANAGEMENT SYSTEM",
    description: "A full-stack inventory management system for managing products, stock, and business inventory workflows.",
    longDescription: "Full-stack web application designed to manage products, track stock levels, and streamline business inventory operations with a clean, functional interface.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    status: "COMPLETED",
    category: "WEB DEVELOPMENT",
    liveUrl: "https://webify-xi.vercel.app/",
    repoUrl: "https://github.com/PrajithVellingiri/webify",
    caseStudyUrl: "",
    featured: true,
    year: 2026,
  },
  {
    id: "PRJ-003",
    name: "BIZ CLEAR",
    description: "A government-focused AI Compliance Assistant designed to help users understand and navigate regulatory and compliance requirements.",
    longDescription: "Built for YHACK26, Biz Clear is an AI-powered compliance assistant that helps businesses and users navigate government regulations. Features intelligent Q&A, regulatory summarization, and compliance workflow guidance.",
    techStack: ["React", "TypeScript", "AI", "NLP", "Vercel"],
    status: "COMPLETED",
    category: "AI-BASED WEB",
    liveUrl: "https://yhack-26-ys-623-straw-hats.vercel.app/",
    repoUrl: "https://github.com/PrajithVellingiri/YHACK26_YS623_STRAW-HATS",
    caseStudyUrl: "",
    featured: true,
    year: 2026,
  },
  {
    id: "PRJ-004",
    name: "INSIGHTGOV AI PETITIONING SYSTEM",
    description: "An AI-powered petitioning platform designed to help users create, structure, and process civic petitions more intelligently.",
    longDescription: "An intelligent civic platform that leverages AI to guide users through petitioning processes. Helps structure petition content, identify relevant authorities, and improve the quality and reach of civic submissions.",
    techStack: ["React", "TypeScript", "AI", "Python", "FastAPI"],
    status: "COMPLETED",
    category: "AI-BASED WEB",
    liveUrl: "https://insight-gov-delta.vercel.app/",
    repoUrl: "https://github.com/PrajithVellingiri/insight-gov",
    caseStudyUrl: "",
    featured: false,
    year: 2026,
  },
  {
    id: "PRJ-005",
    name: "MY PORTFOLIO",
    description: "A responsive cyberpunk-themed personal portfolio platform presenting professional services, projects, experience, and contact information.",
    longDescription: "A modern, immersive portfolio web platform designed with a cyberpunk aesthetic to showcase full-stack projects, artificial intelligence solutions, technical capabilities, and freelance services.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "COMPLETED",
    category: "WEB DEVELOPMENT",
    liveUrl: "https://portfolio-sigma-plum-94.vercel.app/",
    repoUrl: "https://github.com/PrajithVellingiri/portfolio",
    caseStudyUrl: "",
    featured: false,
    year: 2026,
  },
  {
    id: "PRJ-006",
    name: "EXPENSE ANALYTICS DASHBOARD",
    description: "A responsive analytics dashboard for tracking personal expenses, categories, spending trends, and financial summaries.",
    longDescription: "A concept-stage personal finance dashboard that visualizes spending data across categories, tracks trends over time, and provides monthly financial summaries. Designed for clarity and ease of use.",
    techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
    status: "IN DEVELOPMENT",
    category: "WEB DEVELOPMENT",
    liveUrl: "",
    repoUrl: "",
    caseStudyUrl: "",
    featured: false,
    year: 2026,
  },
  {
    id: "PRJ-007",
    name: "EVENT MANAGEMENT PORTAL",
    description: "A modern event management web application concept for discovering events, managing registrations, and organizing event information.",
    longDescription: "A concept-stage event management platform enabling organizers to publish events and attendees to register, manage tickets, and explore upcoming events. Focused on simplicity and modern UX.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "IN DEVELOPMENT",
    category: "WEB DEVELOPMENT",
    liveUrl: "",
    repoUrl: "",
    caseStudyUrl: "",
    featured: false,
    year: 2026,
  },
];

// Featured projects (shown in hero/spotlight)
export const featuredProjects = projects.filter(p => p.featured);