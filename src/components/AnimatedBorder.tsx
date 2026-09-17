import { motion, useReducedMotion } from 'framer-motion';
import React, { useId } from 'react';

/* ─────────────────────────── AnimatedBorder ─────────────────── */

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  colors?: string[];
  speed?: number;
  rounded?: boolean;
}

export function AnimatedBorder({
  children,
  className = '',
  borderWidth = 1,
  colors = ['#F5E642', '#00FFFF', '#FF00AA', '#F5E642'],
  speed = 3,
  rounded = false,
}: AnimatedBorderProps) {
  const shouldReduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const kfName = `rotate-border-${uid}`;
  const borderRadius = rounded ? '8px' : '0px';
  const gradient = `conic-gradient(${colors.join(', ')})`;

  const css = `
    @property --border-angle-${uid} {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes ${kfName} {
      to { --border-angle-${uid}: 360deg; }
    }
    .animated-border-outer-${uid} {
      --border-angle-${uid}: 0deg;
      position: relative;
      padding: ${borderWidth}px;
      border-radius: ${borderRadius};
      background: ${gradient};
      animation: ${shouldReduceMotion ? 'none' : `${kfName} ${speed}s linear infinite`};
      display: inline-block;
    }
    .animated-border-inner-${uid} {
      position: relative;
      background: #0A0A0F;
      border-radius: ${rounded ? `calc(${borderRadius} - ${borderWidth}px)` : '0px'};
      z-index: 1;
      height: 100%;
      width: 100%;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className={`animated-border-outer-${uid} ${className}`}>
        <div className={`animated-border-inner-${uid}`}>{children}</div>
      </div>
    </>
  );
}

/* ─────────────────────────── StaticBorderCard ───────────────── */

interface StaticBorderCardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'yellow' | 'cyan' | 'magenta';
}

const cardColorMap = {
  yellow: {
    border: '#F5E642',
    shadow:      '0 0 10px rgba(245,230,66,0.3)',
    shadowHover: '0 0 20px rgba(245,230,66,0.55), 0 0 40px rgba(245,230,66,0.2)',
    glow:        'rgba(245,230,66,0.06)',
  },
  cyan: {
    border: '#00FFFF',
    shadow:      '0 0 10px rgba(0,255,255,0.3)',
    shadowHover: '0 0 20px rgba(0,255,255,0.55), 0 0 40px rgba(0,255,255,0.2)',
    glow:        'rgba(0,255,255,0.06)',
  },
  magenta: {
    border: '#FF00AA',
    shadow:      '0 0 10px rgba(255,0,170,0.3)',
    shadowHover: '0 0 20px rgba(255,0,170,0.55), 0 0 40px rgba(255,0,170,0.2)',
    glow:        'rgba(255,0,170,0.06)',
  },
};

export function StaticBorderCard({ children, className = '', color = 'yellow' }: StaticBorderCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const c = cardColorMap[color];

  return (
    <motion.div
      className={className}
      style={{
        position: 'relative',
        background: '#0D0D1A',
        border: `1px solid ${c.border}`,
        boxShadow: c.shadow,
        overflow: 'hidden',
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { scale: 1.02, boxShadow: c.shadowHover, transition: { duration: 0.25, ease: 'easeOut' } }
      }
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 70%)`,
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 0,
        }}
        whileHover={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

export default AnimatedBorder;
