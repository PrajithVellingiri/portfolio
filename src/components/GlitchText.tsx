import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animate?: boolean;
}

export function GlitchText({
  text,
  className = '',
  intensity = 'medium',
  as: Tag = 'span',
  animate = false,
}: GlitchTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const isContinuous = (animate || intensity === 'high') && !shouldReduceMotion;

  const glitchDuration =
    intensity === 'low' ? '4s' : intensity === 'medium' ? '2.5s' : '1.2s';

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const keyframeCSS = `
    @keyframes glitch-before {
      0%, 100% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transform: translate(0);
        opacity: 0;
      }
      10% {
        clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%);
        transform: translate(-3px, 0);
        opacity: 0.8;
      }
      20% {
        clip-path: polygon(0 50%, 100% 50%, 100% 65%, 0 65%);
        transform: translate(3px, 0);
        opacity: 0.8;
      }
      30% {
        clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
        transform: translate(-2px, 0);
        opacity: 0.6;
      }
      35%, 95% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transform: translate(0);
        opacity: 0;
      }
    }

    @keyframes glitch-after {
      0%, 100% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transform: translate(0);
        opacity: 0;
      }
      15% {
        clip-path: polygon(0 40%, 100% 40%, 100% 55%, 0 55%);
        transform: translate(3px, 0);
        opacity: 0.8;
      }
      25% {
        clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
        transform: translate(-3px, 0);
        opacity: 0.8;
      }
      33% {
        clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%);
        transform: translate(2px, 0);
        opacity: 0.6;
      }
      38%, 95% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transform: translate(0);
        opacity: 0;
      }
    }

    @keyframes glitch-wrapper-shake {
      0%, 100% { transform: skewX(0deg); }
      10% { transform: skewX(-0.5deg); }
      20% { transform: skewX(0.5deg); }
      30% { transform: skewX(-0.3deg); }
      40% { transform: skewX(0deg); }
    }

    .glitch-el {
      position: relative;
      display: inline-block;
    }

    .glitch-el::before,
    .glitch-el::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .glitch-el::before {
      color: #00FFFF;
      text-shadow: -2px 0 #00FFFF;
      animation: glitch-before ${glitchDuration} ${isContinuous ? 'infinite' : '1'} linear;
    }

    .glitch-el::after {
      color: #FF00AA;
      text-shadow: 2px 0 #FF00AA;
      animation: glitch-after ${glitchDuration} ${isContinuous ? 'infinite' : '1'} linear;
      animation-delay: 0.15s;
    }

    .glitch-el:hover::before {
      animation: glitch-before ${glitchDuration} ${isContinuous ? 'infinite' : '2'} linear !important;
    }

    .glitch-el:hover::after {
      animation: glitch-after ${glitchDuration} ${isContinuous ? 'infinite' : '2'} linear !important;
      animation-delay: 0.15s !important;
    }

    .glitch-wrapper-continuous {
      animation: glitch-wrapper-shake ${glitchDuration} infinite linear;
    }
  `;

  return (
    <>
      <style>{keyframeCSS}</style>
      <motion.div
        style={wrapperStyle}
        className={isContinuous ? 'glitch-wrapper-continuous' : ''}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                skewX: intensity === 'high' ? 0 : [-0.5, 0.5, -0.5, 0],
                transition: { duration: 0.3, repeat: 0 },
              }
        }
      >
        <Tag
          className={`glitch-el ${className}`}
          data-text={text}
          style={{ display: 'inline-block' }}
        >
          {text}
        </Tag>
      </motion.div>
    </>
  );
}

export default GlitchText;
