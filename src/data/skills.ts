// =============================================================
// SKILLS DATA — Edit categories and percentages as needed
// =============================================================

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;  // Tailwind color class
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "PROGRAMMING",
    color: "neon-yellow",
    skills: [
      { name: "Python",      level: 90 },
      { name: "Java",        level: 80 },
      { name: "C / C++",     level: 75 },
      { name: "JavaScript",  level: 85 },
      { name: "TypeScript",  level: 78 },
    ],
  },
  {
    id: "web",
    label: "WEB DEVELOPMENT",
    color: "neon-cyan",
    skills: [
      { name: "React",                level: 88 },
      { name: "Node.js",              level: 82 },
      { name: "HTML / CSS",           level: 92 },
      { name: "Tailwind CSS",         level: 85 },
      { name: "Frontend Development", level: 87 },
      { name: "REST APIs",            level: 83 },
    ],
  },
  {
    id: "ai",
    label: "AI / MACHINE LEARNING",
    color: "neon-magenta",
    skills: [
      { name: "Machine Learning",  level: 82 },
      { name: "Deep Learning",     level: 78 },
      { name: "Computer Vision",   level: 75 },
      { name: "Neural Networks",   level: 80 },
      { name: "NLP",               level: 72 },
      { name: "PyTorch",           level: 76 },
    ],
  },
  {
    id: "tools",
    label: "TOOLS & TECHNOLOGIES",
    color: "neon-green",
    skills: [
      { name: "Git / GitHub",  level: 90 },
      { name: "Docker",        level: 73 },
      { name: "Databases",     level: 80 },
      { name: "Linux",         level: 75 },
      { name: "VS Code",       level: 95 },
      { name: "APIs",          level: 85 },
    ],
  },
];
