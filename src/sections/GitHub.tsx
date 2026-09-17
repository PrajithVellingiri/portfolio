// =============================================================
// GitHub.tsx - Code Network / Contribution Graph Section
// =============================================================

import { useRef, useState, useCallback } from 'react';
import type React from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ExternalLink, GitCommit, BookOpen, Code2, Globe } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import { socialLinks, GITHUB_USERNAME } from '../data/socialLinks';

// -- Seeded RNG (Mulberry32) ------------------------------------------
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// -- Contribution heatmap data ----------------------------------------
const WEEKS  = 52;
const DAYS   = 7;
const SEED   = 0xDEADBEEF;

function generateHeatmap() {
  const rand = mulberry32(SEED);
  return Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: DAYS }, (_, d) => {
      const base    = rand();
      const weekend = d === 0 || d === 6 ? 0.4 : 1;
      const streak  = Math.sin((w / WEEKS) * Math.PI * 2) * 0.3 + 0.7;
      const val = base * weekend * streak;
      return Math.floor(val * 12);
    })
  );
}

const HEATMAP_DATA = generateHeatmap();

// -- Color for commit count -------------------------------------------
function heatColor(count: number): string {
  if (count === 0) return 'rgba(0,255,255,0.04)';
  if (count <= 2)  return 'rgba(57,255,20,0.25)';
  if (count <= 5)  return 'rgba(57,255,20,0.5)';
  if (count <= 8)  return 'rgba(57,255,20,0.75)';
  return '#39FF14';
}

// -- Generate date for tooltip ----------------------------------------
function dateLabel(week: number, day: number): string {
  const d = new Date();
  d.setDate(d.getDate() - (WEEKS - week) * 7 - (DAYS - 1 - day));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// -- Stat Card (with mobile tap interaction) --------------------------
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div
      className="clip-card cyber-panel flex flex-col items-center gap-1.5 p-4 text-center cursor-pointer"
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="text-neon-cyan">{icon}</div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-cyber-dim">{label}</p>
      <p className="font-orbitron text-lg font-bold text-neon-yellow text-glow-yellow" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        {value}
      </p>
    </motion.div>
  );
}

// -- Tooltip state ----------------------------------------------------
interface TooltipState { week: number; day: number; x: number; y: number; }

// -- Main Component ---------------------------------------------------
export function GitHub() {
  const prefersReduced = useReducedMotion();
  const sectionRef     = useRef<HTMLElement>(null);
  const heatmapRef     = useRef<HTMLDivElement>(null);
  const inView         = useInView(sectionRef, { once: true, margin: '-80px' });

  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const animateVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: (d: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.55, delay: d, ease: 'easeOut' as const },
    }),
  };

  // Shared tooltip setter: clamps x so tooltip never overflows the container
  const showTooltip = useCallback((wi: number, di: number, cellEl: HTMLElement) => {
    const parentEl = heatmapRef.current;
    if (!parentEl) return;
    const rect       = cellEl.getBoundingClientRect();
    const parentRect = parentEl.getBoundingClientRect();
    // Raw centre of the cell relative to the heatmap container
    const rawX = rect.left - parentRect.left + rect.width / 2;
    // Tooltip is ~140px wide; clamp so it stays inside the container
    const clampedX = Math.max(70, Math.min(rawX, parentRect.width - 70));
    setTooltip({ week: wi, day: di, x: clampedX, y: rect.top - parentRect.top });
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-black py-24"
    >
      {/* Decorative faded code snippets — desktop only */}
      <div className="pointer-events-none absolute left-4 top-12 hidden select-none text-left opacity-[0.04] xl:block">
        <pre className="font-mono text-xs text-neon-cyan">
{`function deploy(portfolio) {
  const skills = ['React','TS','AI'];
  return skills.reduce((acc, s) =>
    acc.build(s), portfolio);
}`}
        </pre>
      </div>
      <div className="pointer-events-none absolute bottom-12 right-4 hidden select-none text-right opacity-[0.04] xl:block">
        <pre className="font-mono text-xs text-neon-yellow">
{`git commit -m "feat: ship it"
git push origin main
// deployed ✓`}
        </pre>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* -- Section Heading -- */}
        <motion.div
          custom={0}
          variants={animateVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-8 w-1 bg-neon-cyan shadow-neon-cyan" />
          <h2 className="section-heading">// CODE NETWORK</h2>
          <div className="ml-4 flex-1 border-t border-neon-cyan/10" />
          <span className="font-mono text-[10px] text-cyber-dim">[0047.0203]</span>
        </motion.div>

        {/* -- Main panel -- */}
        <motion.div
          custom={0.1}
          variants={animateVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          // Desktop: hover lifts panel; Mobile: tap lifts panel briefly
          whileHover={prefersReduced ? {} : { y: -4, boxShadow: '0 8px 40px rgba(0,255,255,0.12)' }}
          whileTap={prefersReduced ? {} : { y: -4, boxShadow: '0 8px 40px rgba(0,255,255,0.12)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="cyber-panel animated-border relative p-6 sm:p-8"
        >
          <span className="hud-corner hud-tl" />
          <span className="hud-corner hud-tr" />
          <span className="hud-corner hud-bl" />
          <span className="hud-corner hud-br" />

          <div className="grid gap-8 lg:grid-cols-5">
            {/* -- LEFT: Profile info -- */}
            <motion.div
              custom={0.2}
              variants={animateVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-col items-center gap-6 text-center lg:col-span-2 lg:items-start lg:text-left"
            >
              {/* GitHub icon */}
              <div className="relative">
                <div className="rounded-full border border-neon-cyan/20 bg-cyber-dark p-5">
                  <Github className="h-10 w-10 text-cyber-text" />
                </div>
                <span className="status-dot absolute -right-0.5 -top-0.5" />
              </div>

              {/* Username */}
              <div>
                <p className="font-mono text-[10px] text-cyber-dim">GITHUB IDENTITY</p>
                <h3
                  className="font-orbitron text-xl font-black text-white sm:text-2xl break-all"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  @{GITHUB_USERNAME}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-sm border border-neon-green/30 bg-neon-green/10 px-2 py-0.5">
                  <span className="status-dot" />
                  <span className="font-mono text-[9px] text-neon-green">PUBLIC ACCESS GRANTED</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid w-full grid-cols-2 gap-3">
                <StatCard icon={<BookOpen className="h-4 w-4" />} label="REPOSITORIES" value="30+" />
                <StatCard icon={<GitCommit className="h-4 w-4" />} label="CONTRIBUTIONS" value="500+" />
                <StatCard icon={<Code2 className="h-4 w-4" />}     label="LANGUAGES"     value="6+" />
                <StatCard icon={<Globe className="h-4 w-4" />}     label="OPEN SOURCE"   value="ACTIVE" />
              </div>

              {/* CTA button */}
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-card flex w-full items-center justify-center gap-2 border border-neon-yellow/40 bg-cyber-dark px-4 py-3 font-mono text-xs font-bold tracking-widest text-neon-yellow transition-all hover:border-neon-yellow hover:shadow-neon-yellow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="h-4 w-4" />
                [ ACCESS GITHUB REPOSITORY ]
                <ExternalLink className="h-3 w-3 opacity-50" />
              </motion.a>
            </motion.div>

            {/* -- RIGHT: Contribution heatmap -- */}
            <motion.div
              custom={0.3}
              variants={animateVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="lg:col-span-3 min-w-0"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyber-dim">
                  COMMIT ACTIVITY — LAST 12 MONTHS
                </p>
                <span className="font-mono text-[9px] text-neon-green">● LIVE</span>
              </div>

              {/* Heatmap wrapper: horizontally scrollable on mobile */}
              <div
                ref={heatmapRef}
                className="relative w-full overflow-x-auto overflow-y-visible pb-1"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Tooltip: absolutely positioned, clamped to container */}
                {tooltip && (
                  <div
                    className="pointer-events-none absolute z-20 whitespace-nowrap rounded border border-neon-cyan/20 bg-cyber-dark px-2 py-1 font-mono text-[9px] text-cyber-text shadow-neon-cyan"
                    style={{ left: tooltip.x, top: tooltip.y - 32, transform: 'translateX(-50%)' }}
                  >
                    {HEATMAP_DATA[tooltip.week][tooltip.day]} commits · {dateLabel(tooltip.week, tooltip.day)}
                  </div>
                )}

                {/* Inner container: fixed min-width so heatmap never wraps */}
                <div className="inline-flex flex-col" style={{ minWidth: 'max-content' }}>
                  {/* Day labels row — scrolls with heatmap */}
                  <div className="mb-1 flex gap-1 pl-[18px]">
                    {['S','M','T','W','T','F','S'].map((d, i) => (
                      <div key={i} className="w-3 text-center font-mono text-[7px] text-cyber-dim">{d}</div>
                    ))}
                  </div>

                  {/* Heatmap grid: weeks as columns, days as rows */}
                  <div className="flex gap-1">
                    {/* Spacer column for row alignment */}
                    <div className="flex flex-col gap-1">
                      {Array.from({ length: DAYS }).map((_, d) => (
                        <div key={d} className="h-3 w-3" />
                      ))}
                    </div>

                    {HEATMAP_DATA.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {week.map((count, di) => (
                          <motion.div
                            key={di}
                            className="h-3 w-3 cursor-pointer rounded-sm"
                            style={{ background: heatColor(count), border: '1px solid rgba(0,255,255,0.06)' }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: prefersReduced ? 0 : (wi * DAYS + di) * 0.001, duration: 0.2 }}
                            // Desktop hover
                            whileHover={{ scale: 1.4 }}
                            // Mobile tap
                            whileTap={{ scale: 1.4 }}
                            onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                              showTooltip(wi, di, e.currentTarget as HTMLElement);
                            }}
                            onMouseLeave={() => setTooltip(null)}
                            onTouchStart={(e: React.TouchEvent<HTMLElement>) => {
                              e.stopPropagation();
                              showTooltip(wi, di, e.currentTarget as HTMLElement);
                            }}
                            onTouchEnd={() => {
                              setTimeout(() => setTooltip(null), 1200);
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Month labels — scroll with heatmap */}
                  <div className="mt-3 flex justify-between pl-4" style={{ minWidth: '100%' }}>
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m) => (
                      <span key={m} className="font-mono text-[8px] text-cyber-dim">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend — outside scroll container, always visible */}
              <div className="mt-3 flex items-center justify-end gap-1.5">
                <span className="font-mono text-[9px] text-cyber-dim">LESS</span>
                {[0, 2, 5, 8, 12].map(v => (
                  <div
                    key={v}
                    className="h-3 w-3 rounded-sm"
                    style={{ background: heatColor(v), border: '1px solid rgba(0,255,255,0.06)' }}
                  />
                ))}
                <span className="font-mono text-[9px] text-cyber-dim">MORE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GitHub;