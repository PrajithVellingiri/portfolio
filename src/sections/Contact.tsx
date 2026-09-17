// =============================================================
// Contact.tsx — Futuristic Contact Form Section
// =============================================================

import { useRef, useState } from 'react';
import type React from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  Shield,
  Lock,
  Radio,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialLinks, DISPLAY_EMAIL } from '../data/socialLinks';

// -- Types -----------------------------------------------------
interface FormState {
  name:        string;
  email:       string;
  projectType: string;
  message:     string;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

// -- Info row component ----------------------------------------
function InfoRow({ label, value, color = '#00FFFF' }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-cyber-border last:border-0">
      <span className="font-mono text-[10px] text-cyber-dim w-36 shrink-0 mt-0.5 uppercase tracking-wider">
        {label}
      </span>
      <span className="font-mono text-xs" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// -- Main Component --------------------------------------------
export function Contact() {
  const reducedMotion = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-100px' });

  const [form, setForm]       = useState<FormState>({ name: '', email: '', projectType: '', message: '' });
  const [errors, setErrors]   = useState<Partial<FormState>>({});
  const [submit, setSubmit]   = useState<SubmitState>('idle');

  // -- Handlers ---------------------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim())    newErrors.name    = 'DESIGNATION REQUIRED';
    if (!form.email.trim())   newErrors.email   = 'COMM CHANNEL REQUIRED';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'INVALID CHANNEL FORMAT';
    if (!form.message.trim()) newErrors.message = 'MISSION BRIEF REQUIRED';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmit('sending');

    // Build Gmail compose URL with pre-filled fields
    const TO      = 'prajith.freelancer14@gmail.com';
    const subject = form.projectType
      ? `[Portfolio Contact] ${form.projectType} from ${form.name}`
      : `[Portfolio Contact] Message from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project Type: ${form.projectType || 'Not specified'}`,
      ``,
      `Message:`,
      form.message,
    ].join('\n');

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(TO)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmit('success');
    }, 400);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', projectType: '', message: '' });
    setErrors({});
    setSubmit('idle');
  };

  // -- Animation variants ------------------------------------
  const colVariants = (dir: 'left' | 'right') => ({
    hidden:  { opacity: 0, x: dir === 'left' ? -40 : 40 },
    visible: {
      opacity: 1, x: 0,
      transition: { duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' as const },
    },
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-glow opacity-15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-glow opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -- Section heading ------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="mb-3"
        >
          <p className="meta-text mb-2">SECTION_09 // TRANSMISSION_HUB</p>
          <h2 className="section-heading">// INITIATE TRANSMISSION</h2>
          <div className="mt-3 h-px w-52 bg-gradient-to-r from-neon-yellow to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.2 }}
          className="meta-text mb-12 text-neon-cyan"
        >
          SECURE COMMUNICATION CHANNEL OPEN
        </motion.p>

        {/* -- Two-column layout ----------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* -- Left: Info panel (2 cols) ------------------- */}
          <motion.div
            variants={colVariants('left')}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2"
          >
            <div className="cyber-panel relative p-6 border border-neon-cyan border-opacity-15 h-full">
              <span className="hud-corner hud-tl" />
              <span className="hud-corner hud-tr" />
              <span className="hud-corner hud-bl" />
              <span className="hud-corner hud-br" />

              <p className="meta-text mb-5 text-neon-cyan">SYSTEM_INFO // TRANSMISSION_PROTOCOL</p>

              <div className="mb-6">
                <InfoRow label="PROTOCOL"      value="SECURE"          color="#39FF14" />
                <InfoRow label="ENCRYPTION"    value="AES-256"         color="#00FFFF" />
                <InfoRow label="CHANNEL"       value="OPEN"            color="#39FF14" />
                <InfoRow label="RESPONSE TIME" value="&lt; 24H"        color="#F5E642" />
                <InfoRow label="AVAILABILITY"  value="FREELANCE READY" color="#FF00AA" />
              </div>

              <p className="meta-text mb-3 text-neon-cyan">DIRECT_LINKS // CONTACT_NODES</p>

              <div className="space-y-3">
                {/* Email */}
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-3 font-mono text-xs text-cyber-dim hover:text-neon-yellow transition-colors duration-300 group"
                >
                  <span className="w-7 h-7 border border-cyber-border flex items-center justify-center group-hover:border-neon-yellow transition-colors duration-300">
                    <Mail size={14} />
                  </span>
                  {DISPLAY_EMAIL}
                </a>

                {/* LinkedIn */}
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-cyber-dim hover:text-neon-cyan transition-colors duration-300 group"
                >
                  <span className="w-7 h-7 border border-cyber-border flex items-center justify-center group-hover:border-neon-cyan transition-colors duration-300">
                    <FaLinkedin size={14} />
                  </span>
                  LINKEDIN PROFILE
                </a>

                {/* GitHub */}
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-cyber-dim hover:text-neon-yellow transition-colors duration-300 group"
                >
                  <span className="w-7 h-7 border border-cyber-border flex items-center justify-center group-hover:border-neon-yellow transition-colors duration-300">
                    <FaGithub size={14} />
                  </span>
                  GITHUB PROFILE
                </a>
              </div>

              {/* Security badges */}
              <div className="mt-8 pt-6 border-t border-cyber-border flex flex-col gap-2">
                {[
                  { Icon: Shield, label: 'SECURE TRANSMISSION' },
                  { Icon: Lock,   label: 'ENCRYPTED CHANNEL' },
                  { Icon: Radio,  label: 'OPEN COMM LINK' },
                  { Icon: Clock,  label: 'FAST RESPONSE' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-cyber-dim">
                    <Icon size={12} className="text-neon-cyan" />
                    <span className="font-mono text-[10px] tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* -- Right: Form (3 cols) ------------------------ */}
          <motion.div
            variants={colVariants('right')}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3 relative"
          >
            <div className="cyber-panel relative p-6 md:p-8 border border-neon-yellow border-opacity-15 overflow-hidden">
              <span className="hud-corner hud-tl" style={{ borderColor: '#F5E642' }} />
              <span className="hud-corner hud-tr" style={{ borderColor: '#F5E642' }} />
              <span className="hud-corner hud-bl" style={{ borderColor: '#F5E642' }} />
              <span className="hud-corner hud-br" style={{ borderColor: '#F5E642' }} />

              <p className="meta-text mb-6 text-neon-yellow">COMPOSE_MESSAGE // MISSION_BRIEF</p>

              {/* -- Success overlay ----------------------- */}
              <AnimatePresence>
                {submit === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: reducedMotion ? 0 : 0.4 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-cyber-dark bg-opacity-95 p-8 text-center"
                    style={{ boxShadow: 'inset 0 0 60px rgba(57,255,20,0.08)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="mb-6"
                    >
                      <CheckCircle2
                        size={64}
                        className="text-neon-green mx-auto"
                        style={{ filter: 'drop-shadow(0 0 20px #39FF14)' }}
                      />
                    </motion.div>
                    <h4 className="font-orbitron font-bold text-neon-green text-xl mb-4" style={{ textShadow: '0 0 20px #39FF14' }}>
                      GMAIL COMPOSE OPENED.
                    </h4>
                    <p className="font-mono text-neon-green text-sm mb-1">COMPLETE YOUR TRANSMISSION IN GMAIL.</p>
                    <p className="font-mono text-neon-green text-sm mb-8">RESPONSE INCOMING WITHIN 24H.</p>
                    <button
                      onClick={handleReset}
                      className="font-mono text-xs tracking-widest px-6 py-3 border border-neon-green text-neon-green hover:bg-neon-green hover:text-cyber-black transition-all duration-300"
                    >
                      [ SEND NEW TRANSMISSION ]
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* -- Form ----------------------------------- */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name */}
                <div>
                  <label className="meta-text block mb-1.5 text-neon-cyan">DESIGNATION *</label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ENTER DESIGNATION"
                    autoComplete="name"
                    className="cyber-input w-full"
                  />
                  {errors.name && (
                    <p className="font-mono text-[10px] text-neon-red mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="meta-text block mb-1.5 text-neon-cyan">COMM CHANNEL *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ENTER COMM CHANNEL"
                    autoComplete="email"
                    className="cyber-input w-full"
                  />
                  {errors.email && (
                    <p className="font-mono text-[10px] text-neon-red mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Project type */}
                <div>
                  <label className="meta-text block mb-1.5 text-neon-cyan">PROJECT TYPE</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="cyber-input w-full appearance-none cursor-pointer"
                  >
                    <option value="">SELECT PROJECT TYPE...</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI / ML Project">AI / ML Project</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Automation">Automation</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="meta-text block mb-1.5 text-neon-cyan">MISSION BRIEF *</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="DESCRIBE YOUR MISSION..."
                    className="cyber-input w-full resize-none"
                  />
                  {errors.message && (
                    <p className="font-mono text-[10px] text-neon-red mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submit === 'sending'}
                  whileHover={reducedMotion || submit === 'sending' ? {} : { scale: 1.02 }}
                  whileTap={reducedMotion || submit === 'sending' ? {} : { scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 font-mono text-sm tracking-widest py-4 px-8 border border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-cyber-black transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none"
                  style={{ boxShadow: '0 0 20px rgba(245,230,66,0.15)' }}
                >
                  {submit === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      [ TRANSMIT MESSAGE ]
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;