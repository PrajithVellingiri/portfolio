// =============================================================
// Services.tsx â€” Freelancing Services Section
// =============================================================

import { useRef } from 'react';
import type React from 'react';

import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { Globe, Brain, Code2, Zap, ArrowRight, Mail } from 'lucide-react';
import { services }    from '../data/services';
import { socialLinks, DISPLAY_EMAIL } from '../data/socialLinks';

// â”€â”€ Icon map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Globe,
  Brain,
  Code2,
  Zap,
};

// â”€â”€ Color map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const COLOR_MAP: Record<string, { hex: string; glow: string }> = {
  'neon-yellow':  { hex: '#F5E642', glow: '0 0 25px rgba(245,230,66,0.4)' },
  'neon-magenta': { hex: '#FF00AA', glow: '0 0 25px rgba(255,0,170,0.4)' },
  'neon-cyan':    { hex: '#00FFFF', glow: '0 0 25px rgba(0,255,255,0.4)' },
  'neon-green':   { hex: '#39FF14', glow: '0 0 25px rgba(57,255,20,0.4)' },
};

// â”€â”€ ServiceCard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface CardProps {
  service: typeof services[0];
  index: number;
  inView: boolean;
  reducedMotion: boolean | null;
}

function ServiceCard({ service, index, inView, reducedMotion }: CardProps) {
  const c    = COLOR_MAP[service.accent] ?? COLOR_MAP['neon-cyan'];
  const Icon = ICON_MAP[service.icon] ?? Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay:    reducedMotion ? 0 : index * 0.1,
        ease:     'easeOut',
      }}
      whileHover={reducedMotion ? {} : { y: -6, boxShadow: c.glow }}
      className="cyber-panel relative p-6 border transition-all duration-300 overflow-hidden group"
      style={{ borderColor: `${c.hex}25` }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${c.hex}55`;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${c.hex}25`;
      }}
    >
      {/* HUD corners */}
      <span className="hud-corner hud-tl" style={{ borderColor: c.hex }} />
      <span className="hud-corner hud-tr" style={{ borderColor: c.hex }} />
      <span className="hud-corner hud-bl" style={{ borderColor: c.hex }} />
      <span className="hud-corner hud-br" style={{ borderColor: c.hex }} />

      {/* Big faded number in background */}
      <div
        className="absolute -top-2 -right-2 font-bebas text-8xl leading-none select-none pointer-events-none transition-opacity duration-300 opacity-[0.06] group-hover:opacity-[0.1]"
        style={{ color: c.hex }}
      >
        {service.number}
      </div>

      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-12 h-12 mb-4 border"
        style={{
          borderColor: `${c.hex}55`,
          background:  `${c.hex}0F`,
          boxShadow:   `inset 0 0 12px ${c.hex}15`,
        }}
      >
        <Icon size={22} style={{ color: c.hex }} />
      </div>

      {/* Title */}
      <h3
        className="font-orbitron font-bold text-base mb-3"
        style={{ color: c.hex }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-rajdhani text-cyber-text text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Features list */}
      <ul className="space-y-2 mb-6">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 flex-shrink-0" style={{ color: c.hex }}>â€º</span>
            <span className="font-rajdhani text-cyber-text">{feat}</span>
          </li>
        ))}
      </ul>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.hex}, transparent)`,
          opacity:    0.4,
        }}
      />
    </motion.div>
  );
}

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Services() {
  const reducedMotion = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-100px' });
  const ctaInView     = useInView(ctaRef,     { once: true, margin: '-60px' });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 overflow-hidden cyber-grid"
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-yellow-glow opacity-15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* â”€â”€ Section heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="mb-6"
        >
          <p className="meta-text mb-2">SECTION_07 // SERVICE_OFFERINGS</p>
          <h2 className="section-heading">// AVAILABLE SERVICES</h2>
          <div className="mt-3 h-px w-52 bg-gradient-to-r from-neon-yellow to-transparent" />
        </motion.div>

        {/* â”€â”€ Status badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
          className="inline-flex items-center gap-3 mb-12 px-4 py-2 border border-neon-green border-opacity-30 bg-neon-green bg-opacity-5"
        >
          <span
            className="relative flex w-2 h-2"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-neon-green" />
          </span>
          <span className="font-mono text-neon-green text-xs tracking-widest">
            STATUS: AVAILABLE FOR FREELANCE MISSIONS
          </span>
        </motion.div>

        {/* â”€â”€ Service cards grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.id}
              service={svc}
              index={i}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* â”€â”€ CTA block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="cyber-panel relative p-8 md:p-12 border border-neon-yellow border-opacity-20 text-center overflow-hidden"
        >
          <span className="hud-corner hud-tl" />
          <span className="hud-corner hud-tr" />
          <span className="hud-corner hud-bl" />
          <span className="hud-corner hud-br" />

          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-yellow-glow opacity-10 pointer-events-none" />

          <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-neon-yellow text-glow-yellow mb-4">
            READY TO COLLABORATE?
          </h3>
          <p className="font-rajdhani text-cyber-text text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s build something exceptional together. Whether it&apos;s a web app, AI system,
            or automation pipeline â€” I&apos;m ready to deploy.
          </p>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-widest px-8 py-4 border border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-cyber-black transition-all duration-300 mb-4 mr-4"
            style={{ boxShadow: '0 0 20px rgba(245,230,66,0.2)' }}
          >
            [ INITIATE CONTACT ]
            <ArrowRight size={16} />
          </a>

          {/* Secondary: email */}
          <a
            href={`mailto:${socialLinks.email}`}
            className="inline-flex items-center gap-2 font-mono text-sm tracking-wider text-cyber-dim hover:text-neon-cyan transition-colors duration-300 px-4 py-4"
          >
            <Mail size={14} />
            {DISPLAY_EMAIL}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
