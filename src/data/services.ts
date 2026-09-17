// =============================================================
// SERVICES DATA — Freelancing services offered
// =============================================================

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  accent: string;        // Tailwind color class
  icon: string;          // Lucide icon name
}

export const services: Service[] = [
  {
    id: "SVC-01",
    number: "01",
    title: "WEB DEVELOPMENT",
    description: "Modern, responsive websites and full-stack web applications built with cutting-edge technologies.",
    features: [
      "Custom React/Next.js Applications",
      "Full-Stack Development",
      "Responsive UI/UX Design",
      "API Integration & Development",
      "Performance Optimization",
    ],
    accent: "neon-yellow",
    icon: "Globe",
  },
  {
    id: "SVC-02",
    number: "02",
    title: "AI / MACHINE LEARNING",
    description: "Intelligent solutions and ML-powered applications tailored to solve real business problems.",
    features: [
      "Custom ML Model Development",
      "Computer Vision Systems",
      "NLP & Text Analysis",
      "Data Pipeline Engineering",
      "Model Deployment & APIs",
    ],
    accent: "neon-magenta",
    icon: "Brain",
  },
  {
    id: "SVC-03",
    number: "03",
    title: "SOFTWARE DEVELOPMENT",
    description: "Custom software applications and technical solutions engineered for performance and scalability.",
    features: [
      "Desktop & CLI Applications",
      "Microservices Architecture",
      "Database Design & Optimization",
      "System Integration",
      "Technical Consulting",
    ],
    accent: "neon-cyan",
    icon: "Code2",
  },
  {
    id: "SVC-04",
    number: "04",
    title: "AUTOMATION & INTEGRATION",
    description: "Automating repetitive workflows and seamlessly connecting your digital systems and platforms.",
    features: [
      "Workflow Automation Scripts",
      "API & Webhook Integration",
      "Data Scraping & Processing",
      "CI/CD Pipeline Setup",
      "Bot Development",
    ],
    accent: "neon-green",
    icon: "Zap",
  },
];
