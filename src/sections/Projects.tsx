// =============================================================
// Projects.tsx Ã¢â‚¬â€ Project Database Section
// =============================================================

import { useRef, useState } from 'react';
import type React from 'react';

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { ExternalLink, BookOpen, Zap } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

// -- Filter config ---------------------------------------------------
type FilterKey = 'ALL' | 'AI/ML' | 'WEB DEV' | 'SOFTWARE' | 'AUTOMATION';

const FILTERS: FilterKey[] = ['ALL', 'AI/ML', 'WEB DEV', 'SOFTWARE', 'AUTOMATION'];

const CATEGORY_MAP: Record<string, FilterKey> = {
  'AI / MACHINE LEARNING':  'AI/ML',
  'AI-BASED WEB':           'AI/ML',
  'WEB DEVELOPMENT':        'WEB DEV',
  'SOFTWARE DEVELOPMENT':   'SOFTWARE',
  'AUTOMATION':             'AUTOMATION',
};

// -- Color per category -----------------------------------------------
const CATEGORY_COLOR: Record<string, string> = {
  'AI / MACHINE LEARNING':  '#FF00AA',
  'AI-BASED WEB':           '#FF00AA',
  'WEB DEVELOPMENT':        '#00FFFF',
  'SOFTWARE DEVELOPMENT':   '#F5E642',
  'AUTOMATION':             '#39FF14',
};

// Ã¢â€â‚¬Ã¢â€â‚¬ Status config Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const STATUS_CONFIG: Record<string, { label: string; color: string; pulse: boolean; dim: boolean }> = {
  COMPLETED:      { label: 'COMPLETED',      color: '#39FF14', pulse: false, dim: false },
  'IN DEVELOPMENT': { label: 'IN DEVELOPMENT', color: '#F5E642', pulse: true,  dim: false },
  ARCHIVED:       { label: 'ARCHIVED',       color: '#6B6B8A', pulse: false, dim: true  },
  'WEBSITE DOWN, DOING UPDATES / ON PRODUCTION': {
    label: 'WEBSITE DOWN, DOING UPDATES / ON PRODUCTION',
    color: '#FF3131',
    pulse: true,
    dim: false,
  },
};

// Ã¢â€â‚¬Ã¢â€â‚¬ Grid coordinates decoration Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const GRID_COORDS = [
  '[24.5, -73.9]', '[12.8, 45.2]', '[67.3, -120.1]',
  '[33.9, 18.4]',  '[-15.7, 22.6]', '[48.2, -96.7]',
];

// Ã¢â€â‚¬Ã¢â€â‚¬ ProjectCard Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
interface CardProps {
  project: Project;
  index: number;
  reducedMotion: boolean | null;
}

function ProjectCard({ project, index, reducedMotion }: CardProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-60px' });
  const accentColor = CATEGORY_COLOR[project.category] ?? '#00FFFF';
  const statusCfg   = STATUS_CONFIG[project.status] ?? {
    label: project.status,
    color: '#FF3131',
    pulse: true,
    dim: false,
  };
  const coord       = GRID_COORDS[index % GRID_COORDS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay:    reducedMotion ? 0 : (index % 2) * 0.15,
        ease:     'easeOut',
      }}
      whileHover={reducedMotion ? {} : { y: -8 }}
      className="clip-card cyber-panel relative group flex flex-col overflow-hidden transition-all duration-300 cursor-default"
      style={{ border: `1px solid ${accentColor}22` }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}55`;
        (e.currentTarget as HTMLDivElement).style.boxShadow   = `0 0 30px ${accentColor}22, 0 8px 32px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}22`;
        (e.currentTarget as HTMLDivElement).style.boxShadow   = '';
      }}
    >
      {/* Subtle animated grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none cyber-grid transition-opacity duration-300 group-hover:opacity-40"
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
        style={{
          background:  `linear-gradient(to bottom, ${accentColor}, transparent)`,
          boxShadow:   `2px 0 12px ${accentColor}66`,
        }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Top metadata bar */}
        <div className="flex items-center justify-between mb-3">
          <span className="meta-text" style={{ color: accentColor }}>
            PROJECT_ID: {project.id}
          </span>
          <span className="meta-text">{project.year}</span>
        </div>

        {/* Project name */}
        <h3
          className="font-orbitron font-bold text-lg mb-2 transition-colors duration-300 group-hover:brightness-125"
          style={{ color: accentColor }}
        >
          {project.name}
        </h3>

        {/* Category badge + Status badge */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{ border: `1px solid ${accentColor}55`, color: accentColor, background: `${accentColor}14` }}
          >
            {project.category}
          </span>
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{
              border:     `1px solid ${statusCfg.color}55`,
              color:      statusCfg.color,
              background: `${statusCfg.color}14`,
              opacity:    statusCfg.dim ? 0.6 : 1,
            }}
          >
            {statusCfg.pulse && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-blink"
                style={{ background: statusCfg.color }}
              />
            )}
            {statusCfg.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-cyber-text text-sm font-rajdhani leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 text-cyber-dim border border-cyber-border bg-cyber-dark hover:text-cyber-text transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border transition-all duration-200 hover:bg-neon-yellow hover:text-cyber-black hover:border-neon-yellow"
              style={{ borderColor: `${accentColor}55`, color: accentColor }}
            >
              <Zap size={10} />
              [LIVE SYSTEM]
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-cyber-border text-cyber-dim hover:border-neon-cyan hover:text-neon-cyan transition-all duration-200"
            >
              <Github size={10} />
              [SOURCE CODE]
            </a>
          )}
          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 border border-cyber-border text-cyber-dim hover:border-neon-magenta hover:text-neon-magenta transition-all duration-200"
            >
              <BookOpen size={10} />
              [CASE STUDY]
            </a>
          )}
        </div>

        {/* Grid coordinates decoration */}
        <span className="absolute bottom-3 right-4 meta-text opacity-30 text-[9px]">
          {coord}
        </span>
      </div>
    </motion.div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬ Main Component Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export function Projects() {
  const reducedMotion = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-100px' });

  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => CATEGORY_MAP[p.category] === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-magenta-glow opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-glow opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Section heading Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="mb-3"
        >
          <p className="meta-text mb-2">SECTION_05 // PROJECT_DATABASE</p>
          <h2 className="section-heading">// PROJECT DATABASE</h2>
          <div className="mt-3 h-px w-56 bg-gradient-to-r from-neon-yellow to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
          className="meta-text mb-10 text-neon-cyan"
        >
          ACCESSING ENCRYPTED PROJECT ARCHIVES...
        </motion.p>

        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Filter bar Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => {
            const isActive = f === activeFilter;
            return (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-mono text-xs tracking-widest px-4 py-2 border transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: isActive ? '#F5E642' : '#1A1A2E',
                  color:       isActive ? '#F5E642' : '#6B6B8A',
                  background:  isActive ? 'rgba(245,230,66,0.08)' : 'transparent',
                  boxShadow:   isActive ? '0 0 15px rgba(245,230,66,0.3)' : 'none',
                  textShadow:  isActive ? '0 0 8px rgba(245,230,66,0.8)' : 'none',
                }}
                whileHover={reducedMotion ? {} : { scale: 1.04 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
              >
                {f}
              </motion.button>
            );
          })}

          <span className="ml-auto meta-text self-center">
            {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''} FOUND
          </span>
        </motion.div>

        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Project grid with AnimatePresence Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="meta-text text-cyber-dim">NO PROJECTS FOUND IN THIS CATEGORY.</p>
          </div>
        )}

        {/* External link note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.8 }}
          className="mt-8 flex items-center gap-2 text-cyber-dim"
        >
          <ExternalLink size={12} />
          <span className="meta-text">ALL PROJECT LINKS OPEN IN NEW TAB</span>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;

