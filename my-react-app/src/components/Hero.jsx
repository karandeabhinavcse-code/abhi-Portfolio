import { motion } from 'framer-motion';
import { Shield, ArrowRight, Download, Terminal } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero({ onOpenTerminal }) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '90vh',
        paddingTop: '130px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Subtle Radial Depth Glow behind Hero Section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '900px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* SOC Terminal System Status Banner */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span className="soc-status-badge">
                <span className="status-dot-pulse"></span>
                SECURITY PROFILE // ACTIVE
              </span>
              <span className="badge-cyber" style={{ padding: '6px 16px', fontSize: '0.82rem' }}>
                <Shield size={14} /> BCA Final Year Student • Application Security Focus
              </span>
            </div>

            {/* Main Name Heading */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: 1.1, marginBottom: '12px', fontWeight: 800 }}>
              Hi, I'm <span className="text-gradient text-glow-cyan">{resumeData.personalInfo.name}</span>
            </h1>

            {/* Professional Title Subtitle */}
            <h2 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)'
            }}>
              {resumeData.personalInfo.title}
            </h2>

            {/* Introduction Paragraph */}
            <p style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '640px'
            }}>
              {resumeData.personalInfo.summary}
            </p>

            {/* CTA Buttons & Social Icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <a href="#projects" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
                View Projects <ArrowRight size={18} />
              </a>

              <a
                href={resumeData.personalInfo.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <Download size={18} /> Download Resume
              </a>

              {/* Social Links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
                <a
                  href={resumeData.personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease'
                  }}
                  title="GitHub Profile"
                >
                  <GithubIcon size={20} />
                </a>

                <a
                  href={resumeData.personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    transition: 'all 0.2s ease'
                  }}
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-light)'
            }}>
              {resumeData.stats.map((stat, idx) => (
                <div key={idx} style={{ padding: '12px', background: 'var(--bg-card-solid)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Clean Terminal HUD Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '100%' }}
          >
            <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
              
              {/* Terminal Title Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginLeft: '6px' }}>
                    cyber_profile.sh
                  </span>
                </div>
                <span className="badge-emerald" style={{ fontSize: '0.7rem' }}>
                  [ STATUS: READY ]
                </span>
              </div>

              {/* Terminal Code Snippet */}
              <div style={{
                background: '#0B0F19',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(79, 70, 229, 0.2)',
                color: '#F8FAFC',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                lineHeight: 1.7,
                marginBottom: '20px'
              }}>
                <div style={{ color: '#64748B' }}>// Security Profile Overview</div>
                <div><span style={{ color: '#4F46E5' }}>$</span> whoami</div>
                <div style={{ color: '#10B981' }}>&gt; Abhinav Karande (BCA Student)</div>
                <div><span style={{ color: '#4F46E5' }}>$</span> cat focus_areas.txt</div>
                <div style={{ color: '#CBD5E1' }}>&gt; Web VAPT | Android Security | CCNA Protocols | Python Scripting</div>
                <div><span style={{ color: '#4F46E5' }}>$</span> status</div>
                <div style={{ color: '#0891B2' }}>[✓] Open to Internship & Entry-Level Security Roles</div>
              </div>

              {/* Launch CLI Action Button */}
              <button
                onClick={onOpenTerminal}
                className="btn-secondary"
                style={{ width: '100%', borderRadius: '12px', padding: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Terminal size={16} /> Open Interactive Security CLI
              </button>

            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
      `}</style>
    </section>
  );
}
