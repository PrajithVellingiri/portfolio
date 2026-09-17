import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────── TerminalText ────────────────────── */

interface TerminalTextProps {
  lines: string[];
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showPrompt?: boolean;
  promptPrefix?: string;
}

const cursorCSS = `
  @keyframes blink-cursor {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .terminal-cursor {
    display: inline-block;
    width: 0.55em;
    height: 1.1em;
    background: #F5E642;
    vertical-align: text-bottom;
    margin-left: 2px;
    animation: blink-cursor 1s step-end infinite;
    box-shadow: 0 0 6px #F5E642;
  }
`;

export function TerminalText({
  lines,
  speed = 40,
  onComplete,
  className = '',
  showPrompt = true,
  promptPrefix = '> ',
}: TerminalTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  const stateRef = useRef({ lineIndex, charIndex, done });
  stateRef.current = { lineIndex, charIndex, done };

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    if (shouldReduceMotion) {
      setCompletedLines(lines);
      setLineIndex(lines.length);
      setDone(true);
      onComplete?.();
      return;
    }

    if (done) return;

    const interval = setInterval(() => {
      const { lineIndex: li, charIndex: ci } = stateRef.current;
      if (li >= lines.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
        return;
      }
      const target = lines[li];
      if (ci < target.length) {
        setCurrentLine(target.slice(0, ci + 1));
        setCharIndex(ci + 1);
      } else {
        setCompletedLines((prev) => [...prev, target]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex(li + 1);
      }
    }, speed);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, speed, done, shouldReduceMotion]);

  const baseStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: '0.85rem',
    lineHeight: '1.8',
    color: '#39FF14',
  };

  return (
    <>
      <style>{cursorCSS}</style>
      <div className={className} style={baseStyle} aria-live="polite" aria-atomic="false">
        {completedLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {showPrompt && (
              <span style={{ color: '#F5E642', userSelect: 'none' }}>{promptPrefix}</span>
            )}
            <span>{line}</span>
          </motion.div>
        ))}

        {!done && lineIndex < lines.length && (
          <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {showPrompt && (
              <span style={{ color: '#F5E642', userSelect: 'none' }}>{promptPrefix}</span>
            )}
            <span>{currentLine}</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </div>
        )}

        {done && (
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            {showPrompt && (
              <span style={{ color: '#F5E642', userSelect: 'none' }}>{promptPrefix}</span>
            )}
            <span className="terminal-cursor" aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────── TerminalWindow ──────────────────── */

interface TerminalWindowProps {
  lines: string[];
  title?: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showPrompt?: boolean;
}

export function TerminalWindow({
  lines,
  title = 'terminal',
  speed = 40,
  onComplete,
  className = '',
  showPrompt = true,
}: TerminalWindowProps) {
  return (
    <div
      className={className}
      style={{
        background: '#0A0A0F',
        border: '1px solid rgba(245,230,66,0.25)',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 1px rgba(245,230,66,0.2)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0.5rem 0.85rem',
          background: '#0D0D1A',
          borderBottom: '1px solid rgba(245,230,66,0.15)',
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF3131', boxShadow: '0 0 5px rgba(255,49,49,0.7)', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5E642', boxShadow: '0 0 5px rgba(245,230,66,0.7)', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 5px rgba(57,255,20,0.7)', display: 'inline-block' }} />
        <span
          style={{
            marginLeft: '0.5rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: '1rem 1.2rem', minHeight: '6rem' }}>
        <TerminalText lines={lines} speed={speed} onComplete={onComplete} showPrompt={showPrompt} />
      </div>
    </div>
  );
}

export default TerminalText;
