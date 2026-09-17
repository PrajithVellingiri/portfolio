import { useEffect, useRef } from 'react';

/* ─────────────────────── Types ───────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  r: number;
  g: number;
  b: number;
}

/* ─────────────────────── Canvas helpers ──────────────────────── */

function initParticles(count: number, w: number, h: number): Particle[] {
  const palette = [
    { r: 245, g: 230, b: 66  },   // yellow
    { r: 0,   g: 255, b: 255 },   // cyan
    { r: 255, g: 0,   b: 170 },   // magenta
    { r: 57,  g: 255, b: 20  },   // green
  ];
  return Array.from({ length: count }, () => {
    const c = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.5 + 0.12,
      r: c.r, g: c.g, b: c.b,
    };
  });
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, offset: number) {
  const vpX = w / 2;
  const vpY = h * 0.45;
  const spread = w * 1.5;

  /* Vertical perspective lines */
  ctx.lineWidth = 0.5;
  const vLines = 18;
  for (let i = 0; i <= vLines; i++) {
    const t = i / vLines;
    const botX = -spread / 2 + t * spread;
    const dist = Math.abs(t - 0.5);
    const alpha = Math.max(0.005, 0.055 - dist * 0.08);
    ctx.beginPath();
    ctx.moveTo(vpX, vpY);
    ctx.lineTo(botX, h);
    ctx.strokeStyle = `rgba(0,255,255,${alpha.toFixed(3)})`;
    ctx.stroke();
  }

  /* Horizontal perspective lines */
  const hLines = 14;
  for (let i = 0; i <= hLines; i++) {
    const rawT = Math.pow(i / hLines, 1.8);
    const scrolledT = (rawT + offset * 0.0004) % 1;
    const y = vpY + scrolledT * (h - vpY);
    if (y <= vpY) continue;
    const progress = (y - vpY) / (h - vpY);
    const xL = vpX + (-spread / 2 - vpX) * progress;
    const xR = vpX + ( spread / 2 - vpX) * progress;
    const alpha = Math.min(0.07, 0.018 + progress * 0.04);
    ctx.beginPath();
    ctx.moveTo(xL, y);
    ctx.lineTo(xR, y);
    ctx.strokeStyle = `rgba(0,255,255,${alpha.toFixed(3)})`;
    ctx.lineWidth = 0.4 + progress * 0.8;
    ctx.stroke();
  }
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], w: number, h: number) {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
    ctx.fill();
  });
}

/* ─────────────────────── Component ───────────────────────────── */

interface CyberpunkBackgroundProps {
  particleCount?: number;
  className?: string;
}

export function CyberpunkBackground({ particleCount = 90, className = '' }: CyberpunkBackgroundProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const animRef     = useRef<number>(0);
  const offsetRef   = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      particlesRef.current = initParticles(particleCount, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    if (prefersReduced) {
      drawGrid(ctx, canvas.width, canvas.height, 0);
      return () => ro.disconnect();
    }

    const render = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      offsetRef.current += 1;
      drawGrid(ctx, w, h, offsetRef.current);
      drawParticles(ctx, particlesRef.current, w, h);
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [particleCount]);

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Top-center neon yellow glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '55%',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(245,230,66,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom-right magenta glow */}
      <div style={{
        position: 'absolute', bottom: '-5%', right: '-5%',
        width: '45%', height: '45%',
        background: 'radial-gradient(ellipse at 100% 100%, rgba(255,0,170,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
        opacity: 0.35,
      }} />
    </div>
  );
}

export default CyberpunkBackground;
