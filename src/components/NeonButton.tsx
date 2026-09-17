import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'yellow' | 'cyan' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const variantStyles = {
  yellow: {
    color: '#F5E642',
    glowColor: 'rgba(245,230,66,0.6)',
    fillColor: 'rgba(245,230,66,0.08)',
    fillColorHover: 'rgba(245,230,66,0.18)',
    border: '1px solid #F5E642',
    accentBg: '#F5E642',
    textColor: '#F5E642',
    shadowHover:
      '0 0 20px rgba(245,230,66,0.7), 0 0 40px rgba(245,230,66,0.3), inset 0 0 20px rgba(245,230,66,0.05)',
  },
  cyan: {
    color: '#00FFFF',
    glowColor: 'rgba(0,255,255,0.6)',
    fillColor: 'rgba(0,255,255,0.08)',
    fillColorHover: 'rgba(0,255,255,0.18)',
    border: '1px solid #00FFFF',
    accentBg: '#00FFFF',
    textColor: '#00FFFF',
    shadowHover:
      '0 0 20px rgba(0,255,255,0.7), 0 0 40px rgba(0,255,255,0.3), inset 0 0 20px rgba(0,255,255,0.05)',
  },
  magenta: {
    color: '#FF00AA',
    glowColor: 'rgba(255,0,170,0.6)',
    fillColor: 'rgba(255,0,170,0.08)',
    fillColorHover: 'rgba(255,0,170,0.18)',
    border: '1px solid #FF00AA',
    accentBg: '#FF00AA',
    textColor: '#FF00AA',
    shadowHover:
      '0 0 20px rgba(255,0,170,0.7), 0 0 40px rgba(255,0,170,0.3), inset 0 0 20px rgba(255,0,170,0.05)',
  },
};

const sizeStyles = {
  sm: {
    padding: '0.4rem 1rem',
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    accentWidth: '3px',
    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
  },
  md: {
    padding: '0.65rem 1.6rem',
    fontSize: '0.8rem',
    letterSpacing: '0.14em',
    accentWidth: '4px',
    clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
  },
  lg: {
    padding: '0.85rem 2.2rem',
    fontSize: '0.9rem',
    letterSpacing: '0.16em',
    accentWidth: '5px',
    clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
  },
};

const shimmerCSS = `
  .neon-btn-wrapper:hover .neon-btn-shimmer {
    transform: translateX(100%) !important;
  }
`;

export function NeonButton({
  children,
  href,
  onClick,
  variant = 'yellow',
  size = 'md',
  external = false,
  disabled = false,
  className = '',
  icon,
}: NeonButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: s.padding,
    fontFamily: '"Orbitron", monospace',
    fontSize: s.fontSize,
    fontWeight: 700,
    letterSpacing: s.letterSpacing,
    textTransform: 'uppercase',
    color: v.textColor,
    background: v.fillColor,
    border: v.border,
    clipPath: s.clipPath,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    overflow: 'hidden',
    transition: 'background 0.25s ease, box-shadow 0.25s ease',
    boxSizing: 'border-box',
  };

  const accentStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: s.accentWidth,
    background: v.accentBg,
    boxShadow: `0 0 8px ${v.glowColor}`,
  };

  const shimmerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(90deg, transparent 0%, ${v.fillColorHover} 50%, transparent 100%)`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.5s ease',
    pointerEvents: 'none',
  };

  const hoverAnimation = shouldReduceMotion
    ? {}
    : { scale: 1.03, boxShadow: v.shadowHover };

  const tapAnimation = shouldReduceMotion ? {} : { scale: 0.97 };

  const content = (
    <>
      <span style={accentStyle} aria-hidden="true" />
      <span className="neon-btn-shimmer" style={shimmerStyle} aria-hidden="true" />
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </>
  );

  if (href) {
    return (
      <>
        <style>{shimmerCSS}</style>
        <motion.a
          href={disabled ? undefined : href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          style={baseStyle}
          className={`neon-btn-wrapper ${className}`}
          whileHover={disabled ? {} : hoverAnimation}
          whileTap={disabled ? {} : tapAnimation}
          aria-disabled={disabled}
        >
          {content}
        </motion.a>
      </>
    );
  }

  return (
    <>
      <style>{shimmerCSS}</style>
      <motion.button
        type="button"
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        style={baseStyle}
        className={`neon-btn-wrapper ${className}`}
        whileHover={disabled ? {} : hoverAnimation}
        whileTap={disabled ? {} : tapAnimation}
      >
        {content}
      </motion.button>
    </>
  );
}

export default NeonButton;
