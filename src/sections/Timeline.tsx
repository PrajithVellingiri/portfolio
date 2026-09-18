// =============================================================
// Timeline.tsx — System Timeline / Journey Section
// =============================================================

import { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { CheckCircle2, Loader2, Activity } from 'lucide-react';
import { timelineEntries } from '../data/experience';
import type { TimelineEntry } from '../data/experience';

// -- Status configs --------------------------------------------
const STATUS_CONFIG = {
  COMPLETED: {
    color: '#39FF14',
    icon:  CheckCircle2,
    label: 'COMPLETED',
    dotClass: '',
  },
  ACTIVE: {
    color: '#F5E642',
    icon:  Activity,
    label: 'ACTIVE',
    dotClass: 'animate-ping-slow',
  },
  ONGOING: {
    color: '#00FFFF',
    icon:  Loader2,
    label: 'ONGOING',
    dotClass: 'animate-spin-slow',
  },
};

// -- TimelineItem ----------------------------------------------
interface ItemProps {
  entry: TimelineEntry;
  index: number;
  isLeft: boolean;
  reducedMotion: boolean | null;
}

function TimelineItem({ entry, index, isLeft, reducedMotion }: ItemProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cfg   = STATUS_CONFIG[entry.status] ?? STATUS_CONFIG.COMPLETED;
  const Icon  = cfg.icon;
  const delay = reducedMotion ? 0 : index * 0.15;

  return (
    <div
      ref={ref}
      className={`relative flex w-full mb-12 ${
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      } flex-col`}
    >
      {/* -- Card (50% width on md+) ------------------------- */}
      <motion.div
        initial={{ opacity: 0, x: reducedMotion ? 0 : (isLeft ? 40 : -40) }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reducedMotion ? 0 : 0.55, delay, ease: 'easeOut' as const }}
        className="md:w-[calc(50%-2rem)] w-full"
      >
        <div
          className="cyber-panel relative p-5 border transition-all duration-300 hover:border-opacity-60"
          style={{ borderColor: `${cfg.color}33` }}
        >
          {/* HUD corners */}
          <span className="hud-corner hud-tl" style={{ borderColor: cfg.color }} />
          <span className="hud-corner hud-tr" style={{ borderColor: cfg.color }} />
          <span className="hud-corner hud-bl" style={{ borderColor: cfg.color }} />
          <span className="hud-corner hud-br" style={{ borderColor: cfg.color }} />

          {/* Timestamp & log code */}
          <p className="meta-text mb-0.5" style={{ color: cfg.color }}>
            {entry.timestamp}
          </p>
          <p className="font-mono text-[10px] text-neon-green mb-3 tracking-wider">
            {entry.logCode}
          </p>

          {/* Title */}
          <h3 className="font-orbitron font-bold text-sm text-cyber-text mb-1 leading-snug">
            {entry.title}
          </h3>

          {/* Subtitle */}
          {entry.subtitle && (
            <p className="font-rajdhani italic text-cyber-dim text-sm mb-3">
              {entry.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="font-rajdhani text-cyber-text text-sm leading-relaxed mb-4">
            {entry.description}
          </p>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 border border-cyber-border text-cyber-dim bg-cyber-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <Icon size={12} style={{ color: cfg.color }} />
            <span className="font-mono text-[10px] tracking-wider" style={{ color: cfg.color }}>
              {cfg.label}
            </span>
          </div>
        </div>
      </motion.div>

      {/* -- Central connector (hidden on mobile) ----------- */}
      <div className="hidden md:flex flex-col items-center w-16 flex-shrink-0 mx-0">
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: delay + 0.1 }}
          className="w-full h-px mt-8 origin-center"
          style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }}
        />
        {/* Center dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: delay + 0.05 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: cfg.color,
            background:  'var(--cyber-black)',
            boxShadow:   `0 0 12px ${cfg.color}, 0 0 24px ${cfg.color}55`,
          }}
        >
          <div
            className={`w-2 h-2 rounded-full ${cfg.dotClass}`}
            style={{ background: cfg.color }}
          />
        </motion.div>
      </div>

      {/* -- Mobile left timeline dot & connector -- */}
      <div
        className="md:hidden absolute -left-6 top-9 w-6 h-px"
        style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }}
      />
      <div
        className="md:hidden absolute -left-8 top-7 w-4 h-4 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: cfg.color,
          background:  '#050508',
          boxShadow:   `0 0 10px ${cfg.color}, 0 0 20px ${cfg.color}44`,
        }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`}
          style={{ background: cfg.color }}
        />
      </div>
    </div>
  );
}

// -- Main Component --------------------------------------------
export function Timeline() {
  const reducedMotion = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-glow opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -- Section heading ------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="mb-3"
        >
          <p className="meta-text mb-2">SECTION_06 // DEVELOPMENT_LOG</p>
          <h2 className="section-heading">// SYSTEM TIMELINE</h2>
          <div className="mt-3 h-px w-52 bg-gradient-to-r from-neon-cyan to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
          className="meta-text mb-16 text-neon-cyan"
        >
          ACCESSING DEVELOPMENT LOG ARCHIVE...
        </motion.p>

        {/* -- Timeline wrapper ------------------------------- */}
        <div className="relative">
          {/* Central vertical line (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: reducedMotion ? 0 : 1.5, ease: 'easeOut' as const }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background: 'linear-gradient(to bottom, #00FFFF, rgba(0,255,255,0.1))',
              boxShadow:  '0 0 8px rgba(0,255,255,0.5)',
            }}
          />

          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, #00FFFF, rgba(0,255,255,0.05))',
              boxShadow:  '0 0 6px rgba(0,255,255,0.4)',
            }}
          />

          {/* Entries */}
          <div className="pl-10 md:pl-0">
            {timelineEntries.map((entry, i) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                index={i}
                isLeft={i % 2 === 0}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* -- Blinking cursor end ---------------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 1.2 }}
          className="flex items-center justify-center mt-8"
        >
          <span className="font-mono text-neon-cyan text-sm terminal-cursor">
            {'> STORY CONTINUES...'}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Timeline;
