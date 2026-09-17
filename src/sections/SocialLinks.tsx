// =============================================================
// SocialLinks.tsx â€” External Connections Section
// =============================================================

import { useRef } from 'react';
import type React from 'react';

import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { socialLinks, DISPLAY_EMAIL } from '../data/socialLinks';

// â”€â”€ Connection card config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ConnectionCard {
  id:          string;
  platform:    string;
  status:      string;
  description: string;
  accent:      string;
  icon:        React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  buttonLabel: string;
  href:        string;
}

// â”€â”€ Signal bars component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SignalBars({ color, strength = 4 }: { color: string; strength?: number }) {
  return (
    <div className="flex items-end gap-0.5" aria-hidden>
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className="w-1 rounded-sm transition-all duration-300"
          style={{
            height:     `${bar * 4 + 4}px`,
            background: bar <= strength ? color : '#1A1A2E',
            boxShadow:  bar <= strength ? `0 0 4px ${color}88` : 'none',
          }}
        />
      ))}
    </div>
  );
}

// â”€â”€ ConnectionCard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface CardProps {
  card:         ConnectionCard;
  index:        number;
  inView:       boolean;
  reducedMotion: boolean | null;
}

function ConnectionCard({ card, index, inView, reducedMotion }: CardProps) {
  const c = card.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay:    reducedMotion ? 0 : index * 0.1,
        ease:     'easeOut',
      }}
      whileHover={reducedMotion ? {} : { scale: 1.03 }}
      className="cyber-panel relative flex flex-col p-6 border-l-4 border transition-all duration-300 overflow-hidden group"
      style={{
        borderLeftColor:  c,
        borderTopColor:   `${c}22`,
        borderRightColor: `${c}22`,
        borderBottomColor:`${c}22`,
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = `0 0 30px ${c}22, -4px 0 20px ${c}44`;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = '';
      }}
    >
      {/* HUD corners */}
      <span className="hud-corner hud-tr" style={{ borderColor: c }} />
      <span className="hud-corner hud-bl" style={{ borderColor: c }} />

      {/* Top row: icon + signal bars */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={reducedMotion ? {} : { scale: 1.15, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ color: c }}
        >
          <card.icon size={42} style={{ color: c, filter: `drop-shadow(0 0 8px ${c})` }} />
        </motion.div>
        <SignalBars color={c} strength={4} />
      </div>

      {/* Platform title */}
      <h3 className="font-orbitron font-bold text-lg mb-1" style={{ color: c }}>
        {card.platform}
      </h3>

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full animate-ping-slow"
          style={{ background: c, boxShadow: `0 0 6px ${c}` }}
        />
        <span className="font-mono text-[10px] tracking-widest" style={{ color: c }}>
          {card.status}
        </span>
      </div>

      {/* Description */}
      <p className="font-rajdhani text-cyber-dim text-sm mb-6 flex-grow">
        {card.description}
      </p>

      {/* Action button */}
      <motion.a
        href={card.href}
        target={card.href.startsWith('mailto') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        whileHover={reducedMotion ? {} : { scale: 1.02 }}
        whileTap={reducedMotion ? {} : { scale: 0.97 }}
        className="animated-border font-mono text-xs tracking-widest px-4 py-3 text-center transition-all duration-300 focus:outline-none"
        style={{ color: c }}
      >
        {card.buttonLabel}
      </motion.a>
    </motion.div>
  );
}

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function SocialLinks() {
  const reducedMotion = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-100px' });

  const cards: ConnectionCard[] = [
    {
      id:          'linkedin',
      platform:    'LINKEDIN',
      status:      'STATUS: CONNECTED',
      description: 'Professional network & career updates. Connect for opportunities, collaborations, and industry insights.',
      accent:      '#00FFFF',
      icon:        FaLinkedin,
      buttonLabel: '[CONNECT]',
      href:        socialLinks.linkedin,
    },
    {
      id:          'github',
      platform:    'GITHUB',
      status:      'STATUS: PUBLIC ACCESS',
      description: 'Open-source repositories, project source code, and contributions. Explore the codebase.',
      accent:      '#F5E642',
      icon:        FaGithub,
      buttonLabel: '[ACCESS REPOS]',
      href:        socialLinks.github,
    },
    {
      id:          'email',
      platform:    'EMAIL',
      status:      'STATUS: DIRECT CHANNEL',
      description: `Direct communication channel. ${DISPLAY_EMAIL} â€” fastest way to reach me for freelance missions.`,
      accent:      '#FF00AA',
      icon:        FaEnvelope,
      buttonLabel: '[SEND MESSAGE]',
      href:        `mailto:${socialLinks.email}`,
    },
    {
      id:          'resume',
      platform:    'RESUME / CV',
      status:      'STATUS: AVAILABLE FOR DOWNLOAD',
      description: 'Full technical resume with project history, skills, and experience. Updated regularly.',
      accent:      '#39FF14',
      icon:        FaFileAlt,
      buttonLabel: '[DOWNLOAD CV]',
      href:        socialLinks.resume,
    },
  ];

  return (
    <section
      id="social"
      ref={sectionRef}
      className="relative py-24 overflow-hidden cyber-grid"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-glow opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-magenta-glow opacity-15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* â”€â”€ Section heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="mb-3"
        >
          <p className="meta-text mb-2">SECTION_08 // EXTERNAL_LINKS</p>
          <h2 className="section-heading">// EXTERNAL CONNECTIONS</h2>
          <div className="mt-3 h-px w-56 bg-gradient-to-r from-neon-cyan to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
          className="meta-text mb-12 text-neon-cyan"
        >
          ESTABLISHING SECURE CHANNEL...
        </motion.p>

        {/* â”€â”€ Connection cards grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <ConnectionCard
              key={card.id}
              card={card}
              index={i}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialLinks;
