// =============================================================
// Skills.tsx — Interactive Tech Arsenal Section
// =============================================================

import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { skillCategories } from '../data/skills';
import type { SkillCategory } from '../data/skills';

// -- Color maps ------------------------------------------------
const colorMap: Record<string, { hex: string; border: string; bg: string; text: string; glow: string }> = {
  'neon-yellow':  {
    hex:    '#F5E642',
    border: 'border-neon-yellow',
    bg:     'bg-neon-yellow',
    text:   'text-neon-yellow text-glow-yellow',
    glow:   '0 0 20px rgba(245,230,66,0.5), 0 0 40px rgba(245,230,66,0.2)',
  },
  'neon-cyan':    {
    hex:    '#00FFFF',
    border: 'border-neon-cyan',
    bg:     'bg-neon-cyan',
    text:   'text-neon-cyan text-glow-cyan',
    glow:   '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.2)',
  },
  'neon-magenta': {
    hex:    '#FF00AA',
    border: 'border-neon-magenta',
    bg:     'bg-neon-magenta',
    text:   'text-neon-magenta',
    glow:   '0 0 20px rgba(255,0,170,0.5), 0 0 40px rgba(255,0,170,0.2)',
  },
  'neon-green':   {
    hex:    '#39FF14',
    border: 'border-neon-green',
    bg:     'bg-neon-green',
    text:   'text-neon-green',
    glow:   '0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.2)',
  },
};

// -- SkillCard -------------------------------------------------
interface SkillCardProps {
  name: string;
  level: number;
  color: string;
  index: number;
  inView: boolean;
  reducedMotion: boolean | null;
}

function SkillCard({ name, level, color, index, inView, reducedMotion }: SkillCardProps) {
  const c = colorMap[color] ?? colorMap['neon-cyan'];

  const cardVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.07 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={reducedMotion ? {} : { scale: 1.02, boxShadow: c.glow }}
      className="cyber-panel relative p-4 transition-all duration-300 cursor-default"
      style={{ border: `1px solid ${c.hex}33` }}
    >
      {/* HUD corners */}
      <span className="hud-corner hud-tl" style={{ borderColor: c.hex }} />
      <span className="hud-corner hud-br" style={{ borderColor: c.hex }} />

      {/* Name & percentage */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-rajdhani font-bold text-cyber-text text-sm uppercase tracking-wider">
          {name}
        </span>
        <span className="font-mono text-xs font-bold" style={{ color: c.hex }}>
          {level}%
        </span>
      </div>

      {/* Progress bar track */}
      <div className="skill-bar-track w-full">
        <motion.div
          className="h-full"
          style={{ backgroundColor: c.hex, boxShadow: `0 0 8px ${c.hex}` }}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${level}%` } : { width: '0%' }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 1.2, delay: index * 0.07 + 0.3, ease: 'easeOut' as const }
          }
        />
      </div>
    </motion.div>
  );
}

// -- Main Component --------------------------------------------
export function Skills() {
  const reducedMotion = useReducedMotion();
  const sectionRef   = useRef<HTMLElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const inView       = useInView(sectionRef, { once: true, margin: '-100px' });
  const gridInView   = useInView(gridRef,    { once: true, margin: '-80px' });

  const [activeId, setActiveId] = useState<string>(skillCategories[0].id);
  const activeCategory: SkillCategory =
    skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  // Collect ALL skill names for tag cloud
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ name: s.name, color: cat.color }))
  );

  // -- Animation variants --------------------------------------
  const headingVariants = {
    hidden:  { opacity: 0, x: -40 },
    visible: {
      opacity: 1, x: 0,
      transition: { duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' as const },
    },
  };

  const tabVariants = {
    hidden:  { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : i * 0.08 },
    }),
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 overflow-hidden cyber-grid"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-glow opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -- Section heading ------------------------------- */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <p className="meta-text mb-2">SECTION_04 // CAPABILITY_SCAN</p>
          <h2 className="section-heading">// TECH ARSENAL</h2>
          <div className="mt-3 h-px w-48 bg-gradient-to-r from-neon-yellow to-transparent" />
        </motion.div>

        {/* -- Category tab switcher ------------------------- */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skillCategories.map((cat, i) => {
            const c        = colorMap[cat.color] ?? colorMap['neon-cyan'];
            const isActive = cat.id === activeId;
            return (
              <motion.button
                key={cat.id}
                custom={i}
                variants={tabVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                onClick={() => setActiveId(cat.id)}
                className="relative font-mono text-xs tracking-widest px-4 py-2 border transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: isActive ? c.hex : '#1A1A2E',
                  color:       isActive ? c.hex : '#6B6B8A',
                  background:  isActive ? `${c.hex}14` : 'transparent',
                  boxShadow:   isActive ? c.glow   : 'none',
                  textShadow:  isActive ? `0 0 10px ${c.hex}` : 'none',
                }}
                whileHover={reducedMotion ? {} : { scale: 1.04 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* -- Skill grid ------------------------------------ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            ref={gridRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          >
            {activeCategory.skills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={activeCategory.color}
                index={i}
                inView={gridInView}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* -- Tag cloud ------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5 }}
          className="cyber-panel p-6 border border-cyber-border relative"
        >
          <span className="hud-corner hud-tl" />
          <span className="hud-corner hud-tr" />
          <span className="hud-corner hud-bl" />
          <span className="hud-corner hud-br" />

          <p className="meta-text mb-4">ALL_SKILLS // TAG_CLOUD</p>
          <div className="flex flex-wrap gap-2">
            {allSkills.map(({ name, color }, i) => {
              const c = colorMap[color] ?? colorMap['neon-cyan'];
              return (
                <motion.span
                  key={`${name}-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    delay:    reducedMotion ? 0 : i * 0.03,
                  }}
                  className="font-mono text-xs px-2 py-1 border transition-colors duration-200 cursor-default hover:brightness-125"
                  style={{
                    borderColor: `${c.hex}40`,
                    color:       c.hex,
                    background:  `${c.hex}0D`,
                  }}
                >
                  {name}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* -- Corner decoration ----------------------------- */}
        <motion.p
          className="meta-text mt-6 text-right"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.8 }}
        >
          SKILL_MATRIX v1.0 LOADED
        </motion.p>
      </div>
    </section>
  );
}

export default Skills;
