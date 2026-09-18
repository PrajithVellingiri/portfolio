// =============================================================
// LoadingScreen.tsx — Cyberpunk Boot Sequence
// =============================================================

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// -- Constants -------------------------------------------------
const BOOT_MESSAGES = [
  'INITIALIZING PORTFOLIO SYSTEM...',
  'LOADING DEVELOPER PROFILE...',
  'CONNECTING TO PROJECT DATABASE...',
  'CALIBRATING NEURAL INTERFACES...',
  'ESTABLISHING SECURE CONNECTION...',
  'DECRYPTING IDENTITY MATRIX...',
  'ACCESS GRANTED.',
];

const BOOT_DURATION_MS = 3500;
const GRANTED_HOLD_MS  = 600;
const FADEOUT_DURATION  = 0.7; // seconds (Framer)
const MSG_INTERVAL      = BOOT_DURATION_MS / BOOT_MESSAGES.length;

const MATRIX_CHARS =
  '?????????????????????????0123456789ABCDEF<>/\\[]{}!@#$%^&*';

// -- Matrix column data -----------------------------------------
interface MatrixCol { id: number; x: number; chars: string[]; speed: number; opacity: number; }

function genMatrixCols(n: number): MatrixCol[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: (i / n) * 100 + Math.random() * (100 / n),
    chars: Array.from({ length: 18 }, () =>
      MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
    ),
    speed: 6 + Math.random() * 10,
    opacity: 0.04 + Math.random() * 0.18,
  }));
}

// -- Props ------------------------------------------------------
interface Props { onComplete: () => void; }

// -- Component --------------------------------------------------
export function LoadingScreen({ onComplete }: Props) {
  const prefersReduced = useReducedMotion();

  const [messages,     setMessages]     = useState<string[]>([]);
  const [progress,     setProgress]     = useState(0);
  const [glitching,    setGlitching]    = useState(false);
  const [granted,      setGranted]      = useState(false);
  const [exiting,      setExiting]      = useState(false);
  const [matrixCols]                    = useState<MatrixCol[]>(() => genMatrixCols(22));

  const startRef  = useRef(0);
  const rafRef    = useRef(0);
  const timers    = useRef<ReturnType<typeof setTimeout>[]>([]);

  const after = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    if (prefersReduced) { onComplete(); return; }

    startRef.current = performance.now();

    // Progress RAF
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - startRef.current) / BOOT_DURATION_MS) * 100));
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Boot messages
    BOOT_MESSAGES.forEach((msg, i) => after(() => setMessages(p => [...p, msg]), MSG_INTERVAL * i + 60));

    // Glitch pulses
    [800, 2000, 2900].forEach(t => {
      after(() => { setGlitching(true); after(() => setGlitching(false), 160); }, t);
    });

    // Grant -> exit
    after(() => {
      setGranted(true);
      after(() => {
        setExiting(true);
        after(onComplete, FADEOUT_DURATION * 1000);
      }, GRANTED_HOLD_MS);
    }, BOOT_DURATION_MS + 40);

    return () => {
      cancelAnimationFrame(rafRef.current);
      timers.current.forEach(clearTimeout);
    };
  }, [onComplete, prefersReduced]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="ls"
          className="scanlines fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-cyber-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADEOUT_DURATION, ease: 'easeInOut' }}
        >
          {/* Matrix rain */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {matrixCols.map(col => (
              <motion.div
                key={col.id}
                className="absolute top-0 flex flex-col gap-0.5"
                style={{ left: `${col.x}%`, opacity: col.opacity, color: '#39FF14', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
                initial={{ y: '-20%' }}
                animate={{ y: '120vh' }}
                transition={{ duration: col.speed, repeat: Infinity, ease: 'linear', delay: Math.random() * col.speed }}
              >
                {col.chars.map((ch, ci) => <span key={ci}>{ch}</span>)}
              </motion.div>
            ))}
          </div>

          {/* Glitch overlay */}
          <AnimatePresence>
            {glitching && (
              <motion.div
                key="gf"
                className="pointer-events-none absolute inset-0 z-10"
                style={{ background: 'rgba(0,255,255,0.05)', mixBlendMode: 'screen' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 0.6, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, times: [0, 0.2, 0.4, 0.7, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Central panel */}
          <div className="relative z-20 w-full max-w-xl px-4 sm:px-6">
            {/* Logo */}
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-1 font-mono text-xs tracking-[0.35em] text-neon-cyan/40">
                ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
              </p>
              <h1
                className={`font-orbitron text-lg font-black tracking-widest text-neon-yellow text-glow-yellow sm:text-xl ${glitching ? 'animate-[glitch-1_0.5s_linear_infinite]' : ''}`}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                [//: PORTFOLIO_OS v2.0 ://]
              </h1>
              <p className="mt-1 font-mono text-xs tracking-[0.35em] text-neon-cyan/40">
                ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦
              </p>
            </motion.div>

            {/* Terminal */}
            <motion.div
              className="cyber-panel w-full p-4 sm:p-5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {/* Title bar */}
              <div className="mb-3 flex items-center gap-1.5 border-b border-neon-cyan/10 pb-2">
                <div className="h-2 w-2 rounded-full bg-neon-red/80" />
                <div className="h-2 w-2 rounded-full bg-neon-yellow/80" />
                <div className="h-2 w-2 rounded-full bg-neon-green/80" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-cyber-dim">
                  portfolio_os — boot.sh
                </span>
              </div>

              {/* Messages */}
              <div className="min-h-[10rem] space-y-1.5">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mt-px font-mono text-[11px] text-neon-cyan/50">›</span>
                    <span
                      className={`font-mono text-[11px] tracking-wide ${
                        msg === 'ACCESS GRANTED.'
                          ? 'font-bold text-neon-green'
                          : 'text-cyber-text'
                      }`}
                    >
                      {msg}
                    </span>
                  </motion.div>
                ))}
                {!granted && messages.length < BOOT_MESSAGES.length && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-neon-cyan/50">›</span>
                    <span className="terminal-cursor font-mono text-[11px] text-cyber-dim" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Progress */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="mb-1.5 flex justify-between">
                <span className="meta-text">BOOT SEQUENCE</span>
                <span className="font-mono text-xs text-neon-yellow text-glow-yellow">{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden bg-cyber-border">
                <div
                  className="h-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #00FFFF 0%, #F5E642 100%)',
                    boxShadow: '0 0 10px rgba(245,230,66,0.5)',
                    transition: 'width 60ms linear',
                  }}
                />
              </div>
              <div className="mt-1 flex gap-px">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 flex-1 transition-colors duration-75"
                    style={{ background: progress >= (i + 1) * 4 ? '#F5E642' : 'rgba(245,230,66,0.08)' }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ACCESS GRANTED overlay */}
          <AnimatePresence>
            {granted && (
              <motion.div
                key="ag"
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-cyber-black/80 px-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <motion.p
                  className="font-orbitron text-2xl sm:text-5xl font-black tracking-[0.12em] sm:tracking-[0.2em] text-neon-yellow text-glow-yellow text-center w-full"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ACCESS GRANTED.
                </motion.p>
                <motion.p
                  className="mt-4 font-mono text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-neon-green text-center w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  LOADING INTERFACE...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner HUDs */}
          <span className="hud-corner hud-tl" />
          <span className="hud-corner hud-tr" />
          <span className="hud-corner hud-bl" />
          <span className="hud-corner hud-br" />

          {/* Bottom metadata */}
          <div className="absolute bottom-3 left-3 font-mono text-[9px] text-cyber-dim">
            [SYS] {new Date().toISOString().slice(0, 19).replace('T', ' ')}
          </div>
          <div className="absolute bottom-3 right-3 font-mono text-[9px] text-cyber-dim">
            NODE: 0x4F2A
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
