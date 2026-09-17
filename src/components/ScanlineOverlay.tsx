import { useReducedMotion } from 'framer-motion';

const overlayCSS = `
  @keyframes scanline-sweep {
    0%   { top: -8%; opacity: 0; }
    5%   { opacity: 0.6; }
    90%  { opacity: 0.4; }
    95%  { opacity: 0; }
    100% { top: 108%; opacity: 0; }
  }

  @keyframes noise-anim {
    0%   { transform: translate(0,    0   ); }
    10%  { transform: translate(-2%,  -3% ); }
    20%  { transform: translate( 2%,   1% ); }
    30%  { transform: translate(-1%,   4% ); }
    40%  { transform: translate( 3%,  -1% ); }
    50%  { transform: translate(-3%,   2% ); }
    60%  { transform: translate( 1%,  -4% ); }
    70%  { transform: translate(-2%,   3% ); }
    80%  { transform: translate( 4%,   1% ); }
    90%  { transform: translate(-1%,  -2% ); }
    100% { transform: translate( 0,    0  ); }
  }

  .scanline-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9990;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0,0,0,0.06) 2px,
      rgba(0,0,0,0.06) 4px
    );
    mix-blend-mode: multiply;
  }

  .noise-layer {
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    pointer-events: none;
    z-index: 9991;
    opacity: 0.022;
    animation: noise-anim 0.18s steps(1) infinite;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }

  .vignette-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9992;
    background: radial-gradient(
      ellipse at center,
      transparent 40%,
      rgba(0,0,0,0.45) 75%,
      rgba(0,0,0,0.75) 100%
    );
  }

  .scanbar-layer {
    position: fixed;
    left: 0;
    right: 0;
    height: 8%;
    pointer-events: none;
    z-index: 9993;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(245,230,66,0.025) 30%,
      rgba(0,255,255,0.04) 50%,
      rgba(245,230,66,0.025) 70%,
      transparent 100%
    );
    animation: scanline-sweep 8s linear infinite;
    top: -8%;
  }
`;

export function ScanlineOverlay() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style>{overlayCSS}</style>
      {/* 1. Static scanlines */}
      <div className="scanline-layer" aria-hidden="true" />
      {/* 2. Animated noise texture */}
      <div className="noise-layer" aria-hidden="true" />
      {/* 3. Sweeping scanbar — skipped if reduced motion */}
      {!shouldReduceMotion && <div className="scanbar-layer" aria-hidden="true" />}
      {/* 4. Edge vignette */}
      <div className="vignette-layer" aria-hidden="true" />
    </>
  );
}

export default ScanlineOverlay;
