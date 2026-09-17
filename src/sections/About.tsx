// =============================================================
// About.tsx — Identity Database Section
// =============================================================

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';

// -- Animation helpers ------------------------------------------
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

const fadeLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

// -- Corner bracket helper --------------------------------------
function CornerBrackets({ color = 'cyan' }: { color?: 'cyan' | 'yellow' | 'magenta' }) {
  const cls = {
    cyan:    'border-neon-cyan',
    yellow:  'border-neon-yellow',
    magenta: 'border-neon-magenta',
  }[color];
  return (
    <>
      <span className={`hud-corner hud-tl ${cls}`} style={{ borderColor: undefined, borderTopColor: 'currentColor', borderLeftColor: 'currentColor' }} />
      <span className={`hud-corner hud-tr ${cls}`} style={{ borderColor: undefined, borderTopColor: 'currentColor', borderRightColor: 'currentColor' }} />
      <span className={`hud-corner hud-bl ${cls}`} style={{ borderColor: undefined, borderBottomColor: 'currentColor', borderLeftColor: 'currentColor' }} />
      <span className={`hud-corner hud-br ${cls}`} style={{ borderColor: undefined, borderBottomColor: 'currentColor', borderRightColor: 'currentColor' }} />
    </>
  );
}

// -- Geometric Avatar -------------------------------------------
function GeometricAvatar() {
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
      {/* Outer hexagon ring */}
      <div
        className="absolute inset-0 animate-spin-slow opacity-30"
        style={{
          background: 'conic-gradient(from 0deg, #00FFFF, #F5E642, #FF00AA, #00FFFF)',
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
        }}
      />
      {/* Inner hexagon */}
      <div
        className="absolute inset-3"
        style={{
          background: 'linear-gradient(135deg, #0D0D1A 0%, #0A0A1F 100%)',
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          border: '1px solid rgba(0,255,255,0.2)',
        }}
      />
      {/* Circuit nodes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          className="absolute h-1.5 w-1.5 rounded-full bg-neon-cyan"
          style={{
            top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 56}px - 3px)`,
            left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 56}px - 3px)`,
            boxShadow: '0 0 6px #00FFFF',
          }}
        />
      ))}
      {/* Center ID text */}
      <div className="relative z-10 text-center">
        <p className="font-orbitron text-xs font-black text-neon-yellow text-glow-yellow" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          DEV
        </p>
        <p className="font-mono text-[10px] text-neon-cyan">2026</p>
      </div>
    </div>
  );
}

// -- Meta Row --------------------------------------------------
function MetaRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-2 border-b border-neon-cyan/5 py-1.5 last:border-0">
      <span className="min-w-[100px] font-mono text-[10px] uppercase text-cyber-dim">{label}:</span>
      <span className={`font-mono text-[11px] font-semibold ${highlight ? 'text-neon-yellow' : 'text-cyber-text'}`}>
        {value}
      </span>
    </div>
  );
}

// -- Main Component ---------------------------------------------
export function About() {
  const prefersReduced = useReducedMotion();
  const sectionRef     = useRef<HTMLElement>(null);
  const inView         = useInView(sectionRef, { once: true, margin: '-80px' });
  const animate        = inView && !prefersReduced ? 'visible' : inView ? 'visible' : 'hidden';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-black py-24"
    >
      {/* Subtle flowing data lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        {[15, 35, 55, 72, 88].map((top, i) => (
          <motion.div
            key={i}
            className="absolute left-0 h-px w-full"
            style={{ top: `${top}%`, background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent)' }}
            animate={prefersReduced ? {} : { x: ['-100%', '100%'] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.8 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* -- Section Heading -- */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={animate}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-8 w-1 bg-neon-cyan shadow-neon-cyan" />
          <h2 className="section-heading">// USER PROFILE</h2>
          <div className="ml-4 flex-1 border-t border-neon-cyan/10" />
          <span className="font-mono text-[10px] text-cyber-dim">[0024.0099]</span>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* -- LEFT COLUMN -- */}
          <motion.div
            variants={fadeLeft(0.1)}
            initial="hidden"
            animate={animate}
            className="lg:col-span-2"
          >
            {/* ID Card panel */}
            <div className="cyber-panel animated-border relative mb-6 p-6">
              <CornerBrackets color="cyan" />

              {/* Geometric avatar */}
              <GeometricAvatar />

              {/* ID badge */}
              <div className="mt-4 text-center">
                <p className="font-mono text-xs tracking-[0.3em] text-cyber-dim">ID: {personalInfo.devId}</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="status-dot" />
                  <span className="status-online">SYSTEM ACTIVE</span>
                </div>
              </div>

              {/* Clearance badge */}
              <div className="absolute -right-px top-6">
                <div className="clip-card bg-neon-cyan/10 px-3 py-1 text-right">
                  <p className="font-mono text-[9px] text-neon-cyan">CLEARANCE</p>
                  <p className="font-mono text-[10px] font-bold text-neon-yellow">FULL STACK</p>
                </div>
              </div>
            </div>

            {/* Biometric metadata */}
            <div className="cyber-panel relative p-4">
              <CornerBrackets color="yellow" />
              <p className="meta-text mb-3 border-b border-neon-yellow/10 pb-2">BIOMETRIC DATA</p>
              <MetaRow label="NAME"        value={personalInfo.name} highlight />
              <MetaRow label="DESIGNATION" value="Computer Science Engineer" />
              <MetaRow label="STATUS"      value={personalInfo.status} highlight />
              <MetaRow label="CLEARANCE"   value={personalInfo.clearance} />
              <MetaRow label="LOCATION"    value={personalInfo.location} />
            </div>
          </motion.div>

          {/* -- RIGHT COLUMN -- */}
          <motion.div
            variants={fadeRight(0.2)}
            initial="hidden"
            animate={animate}
            className="flex flex-col gap-6 lg:col-span-3"
          >
            {/* Bio panel */}
            <div className="cyber-panel relative p-5 sm:p-6">
              <CornerBrackets color="cyan" />
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[10px] text-neon-cyan/60">{'{'}</span>
                <p className="meta-text">BIO RECORD</p>
                <span className="font-mono text-[10px] text-neon-cyan/60">{'}'}</span>
              </div>
              <p
                className="leading-relaxed text-cyber-text"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem' }}
              >
                {personalInfo.bio}
              </p>
            </div>

            {/* Interests panel */}
            <div className="cyber-panel relative p-5 sm:p-6">
              <CornerBrackets color="yellow" />
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono text-[10px] text-neon-yellow/60">{'{'}</span>
                <p className="meta-text text-neon-yellow">PRIMARY INTERESTS</p>
                <span className="font-mono text-[10px] text-neon-yellow/60">{'}'}</span>
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {personalInfo.primaryInterests.map((interest, i) => (
                  <motion.li
                    key={interest}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-yellow shadow-neon-yellow" />
                    <span className="font-rajdhani text-sm text-cyber-text" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {interest}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom coordinate row */}
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] text-cyber-dim">[LAT: 20.5937° N]</span>
              <span className="font-mono text-[9px] text-cyber-dim">[LON: 78.9629° E]</span>
              <span className="font-mono text-[9px] text-neon-cyan/30">INDIA // EARTH</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
