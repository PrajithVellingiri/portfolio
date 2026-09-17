import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

/* ─────────────────────────────── HUDCorners ───────────────────── */

interface HUDCornersProps {
  size?: number;
  color?: string;
  opacity?: number;
  animated?: boolean;
}

type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CornerProps {
  position: CornerPosition;
  size: number;
  color: string;
  opacity: number;
  animated: boolean;
}

function Corner({ position, size, color, opacity, animated }: CornerProps) {
  const shouldReduceMotion = useReducedMotion();
  const sw = Math.max(1.5, size / 16);
  const m = sw / 2;

  const lines: Record<CornerPosition, { x1: number; y1: number; x2: number; y2: number }[]> = {
    'top-left':     [{ x1: m, y1: size, x2: m, y2: m }, { x1: m, y1: m, x2: size, y2: m }],
    'top-right':    [{ x1: 0, y1: m, x2: size - m, y2: m }, { x1: size - m, y1: m, x2: size - m, y2: size }],
    'bottom-left':  [{ x1: m, y1: 0, x2: m, y2: size - m }, { x1: m, y1: size - m, x2: size, y2: size - m }],
    'bottom-right': [{ x1: 0, y1: size - m, x2: size - m, y2: size - m }, { x1: size - m, y1: 0, x2: size - m, y2: size - m }],
  };

  const positionStyles: Record<CornerPosition, React.CSSProperties> = {
    'top-left':     { top: 0, left: 0 },
    'top-right':    { top: 0, right: 0 },
    'bottom-left':  { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
  };

  const pulseVariants = {
    idle:  { opacity },
    pulse: {
      opacity: [opacity, opacity * 0.35, opacity],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 0.5 },
    },
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...positionStyles[position],
        pointerEvents: 'none',
        lineHeight: 0,
        filter: `drop-shadow(0 0 3px ${color})`,
      }}
      variants={pulseVariants}
      initial="idle"
      animate={animated && !shouldReduceMotion ? 'pulse' : 'idle'}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        {lines[position].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={sw} strokeLinecap="square" />
        ))}
      </svg>
    </motion.div>
  );
}

export function HUDCorners({ size = 24, color = '#F5E642', opacity = 0.8, animated = false }: HUDCornersProps) {
  const positions: CornerPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  return (
    <>
      {positions.map((pos) => (
        <Corner key={pos} position={pos} size={size} color={color} opacity={opacity} animated={animated} />
      ))}
    </>
  );
}

/* ─────────────────────────────── HUDPanel ────────────────────── */

interface HUDPanelProps {
  children: React.ReactNode;
  className?: string;
  cornerColor?: string;
  cornerAnimated?: boolean;
  cornerSize?: number;
}

export function HUDPanel({
  children,
  className = '',
  cornerColor = '#F5E642',
  cornerAnimated = false,
  cornerSize = 24,
}: HUDPanelProps) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <HUDCorners size={cornerSize} color={cornerColor} animated={cornerAnimated} />
      {children}
    </div>
  );
}

export default HUDCorners;
