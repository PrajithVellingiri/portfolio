import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────── Nav links ───────────────────────────── */

interface NavLink { label: string; href: string; sectionId: string; }

const NAV_LINKS: NavLink[] = [
  { label: 'HOME',     href: '#hero',     sectionId: 'hero'     },
  { label: 'ABOUT',    href: '#about',    sectionId: 'about'    },
  { label: 'SKILLS',   href: '#skills',   sectionId: 'skills'   },
  { label: 'PROJECTS', href: '#projects', sectionId: 'projects' },
  { label: 'GITHUB',   href: '#github',   sectionId: 'github'   },
  { label: 'TIMELINE', href: '#timeline', sectionId: 'timeline' },
  { label: 'SERVICES', href: '#services', sectionId: 'services' },
  { label: 'CONTACT',  href: '#contact',  sectionId: 'contact'  },
];

/* ─────────────────────── Static CSS ──────────────────────────── */

const navbarCSS = `
  @keyframes logo-pulse {
    0%, 100% { box-shadow: 0 0 8px rgba(245,230,66,0.6), 0 0 18px rgba(245,230,66,0.25); }
    50%       { box-shadow: 0 0 14px rgba(245,230,66,0.9), 0 0 30px rgba(245,230,66,0.4); }
  }
  .nav-logo-mark {
    animation: logo-pulse 2.8s ease-in-out infinite;
  }
  .nav-link-item {
    position: relative;
    cursor: pointer;
    text-decoration: none;
    font-family: "Orbitron", monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: rgba(255,255,255,0.55);
    transition: color 0.2s ease;
    padding-bottom: 4px;
    white-space: nowrap;
  }
  .nav-link-item:hover { color: #F5E642; }
  .nav-link-item.active { color: #F5E642; }
  .nav-link-item::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: #F5E642;
    box-shadow: 0 0 6px rgba(245,230,66,0.8);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }
  .nav-link-item.active::after,
  .nav-link-item:hover::after { transform: scaleX(1); }
  .hamburger-line {
    display: block;
    width: 22px; height: 2px;
    background: #F5E642;
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.25s ease;
    box-shadow: 0 0 4px rgba(245,230,66,0.6);
  }
  @media (max-width: 767px) {
    .desktop-nav   { display: none !important; }
    .hamburger-btn { display: flex !important; }
  }
`;

/* ─────────────────────── Component ───────────────────────────── */

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Active section detection */
  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.sectionId))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' as const } },
    open:   { height: 'auto', opacity: 1, transition: { duration: 0.3,  ease: 'easeOut'  as const } },
  };

  return (
    <>
      <style>{navbarCSS}</style>

      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
          background: 'rgba(5,5,8,0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid rgba(245,230,66,0.25)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.6)' : 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Gradient top line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, #F5E642 0%, #00FFFF 50%, #FF00AA 100%)',
            opacity: 0.7,
          }}
        />

        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem',
          height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            aria-label="Go to top"
          >
            <motion.div
              className="nav-logo-mark"
              style={{
                fontFamily: '"Orbitron", monospace',
                fontSize: '1rem', fontWeight: 900,
                color: '#050508', background: '#F5E642',
                padding: '0.2rem 0.5rem', letterSpacing: '0.04em',
                userSelect: 'none',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              [YN]
            </motion.div>
          </a>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.sectionId}
                href={link.href}
                className={`nav-link-item ${activeSection === link.sectionId ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={activeSection === link.sectionId ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="hamburger-btn"
            style={{
              display: 'none', flexDirection: 'column', gap: '5px',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', outline: 'none',
            }}
          >
            <span className="hamburger-line" style={{ transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span className="hamburger-line" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="hamburger-line" style={{ transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={shouldReduceMotion ? {} : mobileMenuVariants}
              style={{ overflow: 'hidden', background: 'rgba(5,5,8,0.97)', borderTop: '1px solid rgba(245,230,66,0.18)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 0' }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.sectionId}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : i * 0.04, duration: 0.2 }}
                    className={`nav-link-item ${activeSection === link.sectionId ? 'active' : ''}`}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
                    style={{ display: 'block', padding: '0.75rem 1.5rem', fontSize: '0.72rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    aria-current={activeSection === link.sectionId ? 'page' : undefined}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Navbar;
