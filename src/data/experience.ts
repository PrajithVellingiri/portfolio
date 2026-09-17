// =============================================================
// EXPERIENCE TIMELINE — Prajith V's actual journey
// =============================================================

export interface TimelineEntry {
  id: string;
  date: string;         // Display date
  timestamp: string;    // System-log style timestamp
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  status: "COMPLETED" | "ACTIVE" | "ONGOING";
  logCode: string;      // Futuristic log code
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "TL-001",
    date: "AUG 2025",
    timestamp: "[2025.08.01]",
    title: "INITIATED — STARTED WEB DEVELOPMENT",
    subtitle: "Foundation Phase",
    description: "Started learning and building web development projects. Began exploring HTML, CSS, JavaScript, and modern frontend frameworks, laying the foundation for a career in software engineering.",
    tags: ["HTML", "CSS", "JavaScript", "Web Basics"],
    status: "COMPLETED",
    logCode: "INIT::WEB_DEV_PHASE_ONE",
  },
  {
    id: "TL-002",
    date: "OCT 2025",
    timestamp: "[2025.10.01]",
    title: "UPGRADE — ENTERED AI / ML",
    subtitle: "Intelligence Integration",
    description: "Expanded into artificial intelligence and machine learning. Began working with Python-based ML libraries, exploring supervised learning, data analysis, and model building.",
    tags: ["Python", "Machine Learning", "AI", "Data Analysis"],
    status: "COMPLETED",
    logCode: "UPGRADE::AI_ML_INTEGRATION",
  },
  {
    id: "TL-003",
    date: "JAN 2026",
    timestamp: "[2026.01.01]",
    title: "DEPLOY — FULL STACK + AI/ML PROJECT",
    subtitle: "Production Milestone",
    description: "Built and deployed a project combining full-stack web development with AI/ML capabilities. Marked the transition from learning to building real, production-grade applications.",
    tags: ["Full Stack", "AI/ML", "Deployment", "React", "Python"],
    status: "COMPLETED",
    logCode: "DEPLOY::FULLSTACK_AI_PRODUCTION",
  },
  {
    id: "TL-004",
    date: "AUG 2026",
    timestamp: "[2026.08.01]",
    title: "LAUNCH — ENTERED FREELANCING",
    subtitle: "Freelance Operations",
    description: "Started pursuing freelance development opportunities and client-oriented work. Began offering full-stack and AI development services to clients and building a professional reputation.",
    tags: ["Freelancing", "Client Work", "Web Dev", "AI Solutions"],
    status: "ACTIVE",
    logCode: "LAUNCH::FREELANCE_OPERATIONS",
  },
  {
    id: "TL-005",
    date: "NOW",
    timestamp: "[2026.09.17]",
    title: "ACTIVE — WORKING ON PROJECTS",
    subtitle: "Current Mission",
    description: "Currently building, improving, and experimenting with software, AI/ML, and web projects. Open to collaborations, freelance missions, and exciting opportunities in tech.",
    tags: ["Active", "Building", "AI/ML", "Web Dev", "Freelancing"],
    status: "ONGOING",
    logCode: "STATUS::CURRENT_MISSION_ACTIVE",
  },
];