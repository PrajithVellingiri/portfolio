/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary neon palette
        'neon-yellow':   '#F5E642',
        'neon-cyan':     '#00FFFF',
        'neon-magenta':  '#FF00AA',
        'neon-red':      '#FF3131',
        'neon-green':    '#39FF14',
        // Background palette
        'cyber-black':   '#050508',
        'cyber-dark':    '#0A0A0F',
        'cyber-panel':   '#0D0D1A',
        'cyber-border':  '#1A1A2E',
        'cyber-gray':    '#1E1E2E',
        'cyber-muted':   '#2A2A3E',
        // Text
        'cyber-text':    '#C8C8D4',
        'cyber-dim':     '#6B6B8A',
      },
      fontFamily: {
        'orbitron':   ['Orbitron', 'sans-serif'],
        'bebas':      ['Bebas Neue', 'cursive'],
        'mono':       ['JetBrains Mono', 'Fira Code', 'monospace'],
        'rajdhani':   ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-yellow':  '0 0 20px rgba(245, 230, 66, 0.5), 0 0 40px rgba(245, 230, 66, 0.3)',
        'neon-cyan':    '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        'neon-magenta': '0 0 20px rgba(255, 0, 170, 0.5), 0 0 40px rgba(255, 0, 170, 0.3)',
        'neon-red':     '0 0 20px rgba(255, 49, 49, 0.5), 0 0 40px rgba(255, 49, 49, 0.3)',
        'panel':        'inset 0 0 30px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0,255,255,0.2)',
      },
      backgroundImage: {
        'cyber-gradient':       'linear-gradient(135deg, #050508 0%, #0A0A1A 50%, #050508 100%)',
        'yellow-glow':          'radial-gradient(ellipse at center, rgba(245,230,66,0.15) 0%, transparent 70%)',
        'cyan-glow':            'radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%)',
        'magenta-glow':         'radial-gradient(ellipse at center, rgba(255,0,170,0.1) 0%, transparent 70%)',
        'grid-pattern':         `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-md': '60px 60px',
        'grid-lg': '80px 80px',
      },
      animation: {
        'flicker':        'flicker 3s linear infinite',
        'neon-pulse':     'neonPulse 2s ease-in-out infinite',
        'scanline':       'scanline 8s linear infinite',
        'glitch-1':       'glitch1 0.5s linear infinite',
        'glitch-2':       'glitch2 0.5s linear infinite',
        'data-stream':    'dataStream 20s linear infinite',
        'border-flow':    'borderFlow 3s linear infinite',
        'float':          'float 6s ease-in-out infinite',
        'blink':          'blink 1s step-end infinite',
        'slide-up':       'slideUp 0.6s ease-out forwards',
        'slide-right':    'slideRight 0.6s ease-out forwards',
        'noise':          'noise 0.3s steps(1) infinite',
        'spin-slow':      'spin 8s linear infinite',
        'ping-slow':      'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
      },
      keyframes: {
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%':            { opacity: '0.4' },
          '97%':            { opacity: '1' },
          '98%':            { opacity: '0.2' },
          '99%':            { opacity: '1' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(245,230,66,0.3), 0 0 20px rgba(245,230,66,0.1)' },
          '50%':      { boxShadow: '0 0 25px rgba(245,230,66,0.6), 0 0 50px rgba(245,230,66,0.3), 0 0 75px rgba(245,230,66,0.1)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch1: {
          '0%, 100%':  { clipPath: 'inset(80% 0 0 0)',   transform: 'translate(-4px, 0)' },
          '25%':       { clipPath: 'inset(10% 0 60% 0)', transform: 'translate(4px, 0)' },
          '50%':       { clipPath: 'inset(40% 0 20% 0)', transform: 'translate(-2px, 0)' },
          '75%':       { clipPath: 'inset(60% 0 5% 0)',  transform: 'translate(2px, 0)' },
        },
        glitch2: {
          '0%, 100%':  { clipPath: 'inset(20% 0 70% 0)', transform: 'translate(4px, 0)' },
          '25%':       { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(-4px, 0)' },
          '50%':       { clipPath: 'inset(5% 0 80% 0)',  transform: 'translate(2px, 0)' },
          '75%':       { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(-2px, 0)' },
        },
        dataStream: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        borderFlow: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        noise: {
          '0%':   { backgroundPosition: '0 0' },
          '10%':  { backgroundPosition: '-5% -10%' },
          '20%':  { backgroundPosition: '-15% 5%' },
          '30%':  { backgroundPosition: '7% -25%' },
          '40%':  { backgroundPosition: '20% 25%' },
          '50%':  { backgroundPosition: '-25% 10%' },
          '60%':  { backgroundPosition: '15% 5%' },
          '70%':  { backgroundPosition: '0 15%' },
          '80%':  { backgroundPosition: '25% 35%' },
          '90%':  { backgroundPosition: '-10% 10%' },
          '100%': { backgroundPosition: '0 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      screens: {
        'xs': '480px',
      },
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
