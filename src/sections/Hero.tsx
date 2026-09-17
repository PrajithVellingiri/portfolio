// =============================================================
// Hero.tsx â€” Cinematic Full-Screen Hero Section
// =============================================================

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { socialLinks } from '../data/socialLinks';

// â”€â”€ Animation Variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

// â”€â”€ Role Ticker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function RoleTicker({ roles }: { roles: string[] }) {
  const prefersReduced = useReducedMotion();
  const items = [...roles, ...roles]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden border-y border-neon-yellow/20 py-2">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={prefersReduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        {items.map((role, i) => (
          <span key={i} className="font-mono text-xs tracking-widest text-neon-yellow/70">
            {role}
            <span className="mx-4 text-neon-cyan/40">//</span>
          </span>
        ))}
      </motion.div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cyber-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cyber-black to-transparent" />
    </div>
  );
}

// â”€â”€ CTA Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface BtnProps {
  label: string;
  href: string;
  variant: 'yellow' | 'cyan' | 'magenta';
  external?: boolean;
}

function CyberButton({ label, href, variant, external }: BtnProps) {
  const colorMap = {
    yellow:  { bar: 'bg-neon-yellow', text: 'text-neon-yellow', shadow: 'hover:shadow-neon-yellow', border: 'border-neon-yellow/40' },
    cyan:    { bar: 'bg-neon-cyan',   text: 'text-neon-cyan',   shadow: 'hover:shadow-neon-cyan',   border: 'border-neon-cyan/40'   },
    magenta: { bar: 'bg-neon-magenta',text: 'text-neon-magenta',shadow: 'hover:shadow-neon-magenta',border: 'border-neon-magenta/40'},
  };
  const c = colorMap[variant];

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`clip-card relative flex items-center gap-2 border ${c.border} bg-cyber-panel/80 px-4 py-2.5 font-mono text-xs font-bold tracking-widest uppercase ${c.text} transition-all duration-300 ${c.shadow} hover:border-current`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className={`h-full w-0.5 absolute left-0 inset-y-0 ${c.bar}`} />
      <span className="ml-2">{label}</span>
      {external && <ExternalLink className="h-3 w-3 opacity-60" />}
    </motion.a>
  );
}

// â”€â”€ Current Date â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function currentDate(): string {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Hero() {
  const prefersReduced = useReducedMotion();
  const [glitchActive, setGlitch] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Periodic glitch on the name
  useEffect(() => {
    if (prefersReduced) return;
    const scheduleGlitch = () => {
      const jitter = 3000 + Math.random() * 4000;
      tickRef.current = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => { setGlitch(false); scheduleGlitch(); }, 400);
      }, jitter);
    };
    scheduleGlitch();
    return () => { if (tickRef.current) clearTimeout(tickRef.current); };
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      className="cyber-grid relative flex min-h-screen flex-col overflow-hidden bg-cyber-black"
    >
      {/* Perspective grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 60%, rgba(5,5,8,0.95) 100%), ' +
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* â”€â”€ TOP-RIGHT HUD â”€â”€ */}
      <motion.div
        className="cyber-panel absolute right-4 top-20 z-10 hidden min-w-[180px] p-3 lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />
        <p className="meta-text mb-2 border-b border-neon-cyan/10 pb-1.5">SYS STATUS</p>
        {[
          ['STATUS',   'ONLINE'],
          ['LOCATION', personalInfo.location],
          ['DATE',     currentDate()],
          ['UPTIME',   '100%'],
        ].map(([k, v]) => (
          <div key={k} className="mb-1 flex justify-between gap-3">
            <span className="font-mono text-[10px] text-cyber-dim">{k}:</span>
            <span className={`font-mono text-[10px] font-bold ${k === 'STATUS' ? 'text-neon-green' : 'text-neon-yellow'}`}>{v}</span>
          </div>
        ))}
      </motion.div>

      {/* â”€â”€ LEFT SIDE HUD â”€â”€ */}
      <motion.div
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-1 xl:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <p className="meta-text mb-2 writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          SPECIALIZATION
        </p>
        {personalInfo.specializations.slice(0, 3).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-neon-cyan/50">â€º</span>
            <span className="font-mono text-[10px] text-cyber-dim">{s}</span>
          </div>
        ))}
      </motion.div>

      {/* â”€â”€ MAIN CONTENT â”€â”€ */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-28 sm:px-8 md:px-16">
        <motion.div
          className="w-full max-w-5xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Pre-heading */}
          <motion.p
            variants={itemVariants}
            className="mb-4 font-mono text-xs tracking-[0.3em] text-neon-cyan text-glow-cyan sm:text-sm"
          >
            // DEVELOPER IDENTITY ESTABLISHED
          </motion.p>

          {/* NAME â€” Giant glitch display */}
          <motion.div variants={itemVariants} className="mb-4 overflow-hidden">
            <h1
              className={`glitch-wrapper select-none leading-none text-white ${glitchActive ? '' : '[&::before]:opacity-0 [&::after]:opacity-0'}`}
              data-text={personalInfo.name}
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(3rem, 10vw, 9rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textShadow: '0 0 40px rgba(255,255,255,0.1)',
              }}
            >
              {personalInfo.name}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-3 font-orbitron text-sm font-bold tracking-[0.35em] text-neon-cyan/80 sm:text-base"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            COMPUTER SCIENCE ENGINEER
          </motion.p>

          {/* Role ticker */}
          <motion.div variants={itemVariants} className="mb-6">
            <RoleTicker roles={personalInfo.roles} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl font-rajdhani text-base text-cyber-text sm:text-lg"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <CyberButton label="[ VIEW PROJECTS ]"     href="#projects" variant="yellow" />
            <CyberButton label="[ ACCESS CV ]"         href={socialLinks.resume} variant="cyan" external />
            <CyberButton label="[ CONNECT WITH ME ]"   href="#contact"  variant="magenta" />
          </motion.div>
        </motion.div>
      </div>

      {/* â”€â”€ BOTTOM STATUS BAR â”€â”€ */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 z-10 border-y border-neon-yellow/10 bg-cyber-black/80 py-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-center justify-center gap-4 overflow-hidden px-4 sm:gap-8">
          {[
            ['STATUS',      'ONLINE',    'text-neon-green'],
            ['UPTIME',      '99.9%',     'text-neon-yellow'],
            ['COMMITS',     'âˆž',         'text-neon-cyan'],
            ['COFFEE',      'CRITICAL',  'text-neon-red'],
          ].map(([k, v, cls]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] text-cyber-dim">[{k}:</span>
              <span className={`font-mono text-[9px] font-bold ${cls}`}>{v}]</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* â”€â”€ SCROLL INDICATOR â”€â”€ */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="meta-text text-[9px]">SCROLL TO EXPLORE</span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-neon-yellow opacity-60" />
        </motion.div>
      </motion.div>

      {/* Corner decorators */}
      <span className="hud-corner hud-tl" style={{ top: '5rem' }} />
      <span className="hud-corner hud-tr" style={{ top: '5rem' }} />
    </section>
  );
}

export default Hero;
