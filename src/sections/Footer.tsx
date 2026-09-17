// =============================================================
// Footer.tsx â€” Futuristic Cyberpunk Footer
// =============================================================

import { useRef } from 'react';
import type React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';
import { socialLinks, DISPLAY_EMAIL } from '../data/socialLinks';

// â”€â”€ Social link data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface SocialItem {
  label: string;
  Icon: React.ElementType;
  color: string;
  shadow: string;
  href: (s: typeof socialLinks) => string;
  noExternal?: boolean;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    label: 'LINKEDIN',
    Icon: Linkedin,
    color: 'text-neon-cyan   hover:text-neon-cyan',
    shadow: 'hover:shadow-neon-cyan',
    href: (s) => s.linkedin,
  },
  {
    label: 'GITHUB',
    Icon: Github,
    color: 'text-cyber-text hover:text-neon-yellow',
    shadow: 'hover:shadow-neon-yellow',
    href: (s) => s.github,
  },
  {
    label: 'EMAIL',
    Icon: Mail,
    color: 'text-neon-magenta hover:text-neon-magenta',
    shadow: 'hover:shadow-neon-magenta',
    href: (s) => `mailto:${s.email}`,
    noExternal: true,
  },
];

// â”€â”€ Nav quick-links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const NAV_LINKS = ['#hero','#about','#skills','#projects','#experience','#contact'];
const NAV_LABELS = ['HOME','ABOUT','SKILLS','PROJECTS','EXPERIENCE','CONTACT'];

// â”€â”€ Section divider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NeonDivider({ color = 'yellow' }: { color?: 'yellow' | 'cyan' }) {
  return (
    <div
      className="h-px w-full"
      style={{
        background: color === 'yellow'
          ? 'linear-gradient(90deg, transparent, #F5E642 30%, #F5E642 70%, transparent)'
          : 'linear-gradient(90deg, transparent, #00FFFF 30%, #00FFFF 70%, transparent)',
        boxShadow: color === 'yellow'
          ? '0 0 10px rgba(245,230,66,0.4)'
          : '0 0 10px rgba(0,255,255,0.4)',
      }}
    />
  );
}

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Footer() {
  const prefersReduced = useReducedMotion();
  const ref            = useRef<HTMLElement>(null);
  const inView         = useInView(ref, { once: true, margin: '-40px' });

  const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: 'easeOut' as const } },
  });

  const animate = inView && !prefersReduced ? 'visible' : inView ? 'visible' : 'hidden';

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to top, #050508 0%, #0A0A0F 40%, #050508 100%)',
      }}
    >
      {/* Scanline effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />

      {/* Top neon border */}
      <NeonDivider color="yellow" />

      {/* â”€â”€ System status bar â”€â”€ */}
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={animate}
        className="border-b border-neon-yellow/10 bg-neon-yellow/5 py-2"
      >
        <div className="flex items-center justify-center gap-2 px-4">
          <span className="status-dot" style={{ background: '#39FF14', boxShadow: '0 0 8px #39FF14' }} />
          <p className="text-center font-mono text-[10px] tracking-widest text-neon-green">
            SYSTEM STATUS: ONLINE
            <span className="mx-2 text-cyber-dim">|</span>
            ALL SYSTEMS OPERATIONAL
            <span className="mx-2 text-cyber-dim">|</span>
            UPTIME: 99.9%
          </p>
        </div>
      </motion.div>

      {/* â”€â”€ Main footer content â”€â”€ */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">

          {/* â”€â”€ Left: Name & tagline â”€â”€ */}
          <motion.div
            variants={fadeUp(0.05)}
            initial="hidden"
            animate={animate}
            className="flex flex-col gap-4"
          >
            <div>
              <h2
                className="font-orbitron text-2xl font-black text-neon-yellow text-glow-yellow sm:text-3xl"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {personalInfo.name}
              </h2>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-cyber-dim">
                COMPUTER SCIENCE ENGINEER // DEVELOPER // AI &amp; ML ENTHUSIAST
              </p>
            </div>
            <p className="font-rajdhani text-sm text-cyber-dim" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              {personalInfo.tagline}
            </p>
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="status-online">AVAILABLE FOR COLLABORATION</span>
            </div>
          </motion.div>

          {/* â”€â”€ Center: Nav links â”€â”€ */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={animate}
            className="flex flex-col items-start gap-2 md:items-center"
          >
            <p className="meta-text mb-2">NAVIGATION</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {NAV_LINKS.map((href, i) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-1 font-mono text-[11px] text-cyber-dim transition-colors hover:text-neon-yellow"
                >
                  <span className="text-neon-cyan/30 transition-colors group-hover:text-neon-cyan">â€º</span>
                  {NAV_LABELS[i]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* â”€â”€ Right: Social links â”€â”€ */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={animate}
            className="flex flex-col gap-3"
          >
            <p className="meta-text mb-1">CONNECT</p>
            {SOCIAL_ITEMS.map(({ label, Icon, color, shadow, href, noExternal }) => (
              <motion.a
                key={label}
                href={href(socialLinks)}
                target={noExternal ? undefined : '_blank'}
                rel={noExternal ? undefined : 'noopener noreferrer'}
                className={`clip-card group flex items-center gap-3 border border-neon-cyan/10 bg-cyber-panel/60 px-4 py-2.5 transition-all duration-300 ${color} ${shadow} hover:border-current`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-widest">{label}</span>
                {!noExternal && (
                  <ExternalLink className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-40" />
                )}
              </motion.a>
            ))}
            <a
              href={`mailto:${socialLinks.email}`}
              className="mt-1 font-mono text-[10px] text-cyber-dim transition-colors hover:text-neon-cyan"
            >
              {DISPLAY_EMAIL}
            </a>
          </motion.div>
        </div>

        {/* â”€â”€ Divider â”€â”€ */}
        <div className="my-10">
          <NeonDivider color="cyan" />
        </div>

        {/* â”€â”€ Bottom row â”€â”€ */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={animate}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="font-mono text-[10px] text-cyber-dim">
            Â© 2026 {personalInfo.name} â€” ALL RIGHTS RESERVED
          </p>
          <p className="font-mono text-[9px] tracking-wider text-cyber-dim/60">
            DESIGNED &amp; ENGINEERED BY {personalInfo.name.toUpperCase()}
          </p>
        </motion.div>
      </div>

      {/* â”€â”€ Bottom system log bar â”€â”€ */}
      <NeonDivider color="yellow" />
      <motion.div
        variants={fadeUp(0.25)}
        initial="hidden"
        animate={animate}
        className="bg-cyber-black py-2"
      >
        <div className="overflow-hidden px-4">
          <motion.p
            className="whitespace-nowrap text-center font-mono text-[9px] tracking-widest text-neon-cyan/30"
            animate={prefersReduced ? {} : { x: ['0%', '-30%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            [SYS] PORTFOLIO_OS v2.0 â€” RUNNING STABLE â€” POWERED BY HUMAN INTELLIGENCE + MACHINE PRECISION &nbsp;â€¢&nbsp;
            BUILD: {new Date().toISOString().slice(0, 10)} &nbsp;â€¢&nbsp;
            STATUS: ALL GREEN &nbsp;â€¢&nbsp;
            NODE: 0x4F2A &nbsp;â€¢&nbsp;
            [SYS] PORTFOLIO_OS v2.0 â€” RUNNING STABLE â€” POWERED BY HUMAN INTELLIGENCE + MACHINE PRECISION
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;

