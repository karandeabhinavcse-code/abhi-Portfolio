import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, ArrowRight, Download, CheckCircle2, Cpu, ExternalLink, Sparkles, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Hero({ onOpenTerminal }) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const subtitles = resumeData.personalInfo.subtitles;

  useEffect(() => {
    const currentFullText = subtitles[subtitleIndex];
    let timer;

    if (!isDeleting) {
      if (typedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, subtitleIndex, subtitles]);

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Security Compliance Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="badge-cyber" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                <Shield size={14} className="animate-pulse-slow" /> OWASP Top 10 (2025) Compliant & CCNA Certified
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '16px', fontWeight: 800 }}>
              Hi, I'm <span className="text-gradient">Abhinav Karande</span>
            </h1>

            {/* Typewriter Subtitle */}
            <div style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)'
            }}>
              <span>{typedText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                style={{ color: 'var(--accent-primary)', fontWeight: 800 }}
              >
                |
              </motion.span>
            </div>

            {/* Summary Paragraph */}
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '650px'
            }}>
              {resumeData.personalInfo.summary}
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <a href="#projects" className="btn-primary">
                Explore VAPT Audits <ArrowRight size={18} />
              </a>

              <button onClick={onOpenTerminal} className="btn-secondary">
                <Terminal size={18} style={{ color: 'var(--accent-primary)' }} /> Interactive Security CLI
              </button>

              <a
                href={resumeData.personalInfo.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber"
                style={{ padding: '12px 20px', fontSize: '0.95rem' }}
              >
                <Download size={16} /> View Report & Resume PDF
              </a>
            </div>

            {/* Stat Counters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-light)'
            }}>
              {resumeData.stats.map((stat, idx) => (
                <div key={idx} style={{ padding: '12px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Light VAPT Card Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '100%' }}
          >
            <div className="glass-card" style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
              
              {/* Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    VAPT_AUDIT_CONSOLE :: READY
                  </span>
                </div>
                <span className="badge-emerald" style={{ fontSize: '0.7rem' }}>
                  SECURE SESSION
                </span>
              </div>

              {/* Security Metrics Card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TARGET SYSTEM</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Gin & Juice App</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <CheckCircle2 size={12} /> Audit Completed
                  </div>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>EC-COUNCIL ID</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>ECC1456328907</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Certified Ethical Hacker
                  </div>
                </div>
              </div>

              {/* Sample PoCs Code Preview */}
              <div style={{
                background: '#0F172A',
                borderRadius: '12px',
                padding: '16px',
                color: '#F8FAFC',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '20px',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)'
              }}>
                <div style={{ color: '#94A3B8', marginBottom: '8px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>// OWASP 2025 PoC Exploitation Log</span>
                  <span style={{ color: '#38BDF8' }}>Burp Suite v2025.1</span>
                </div>
                <div style={{ color: '#F43F5E' }}>[!] CRITICAL: CSTI Payload Executed</div>
                <div style={{ color: '#E2E8F0', margin: '4px 0' }}>
                  <span style={{ color: '#F59E0B' }}>PAYLOAD:</span> {`{{constructor.constructor('alert(1)')()}}`}
                </div>
                <div style={{ color: '#34D399' }}>[✓] SQLi: Bypassed Auth via Union Injection</div>
                <div style={{ color: '#38BDF8' }}>[✓] Network: OSPF Area 0 Trunk Configured</div>
              </div>

              {/* Action Button inside card */}
              <button
                onClick={onOpenTerminal}
                className="btn-primary"
                style={{ width: '100%', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
              >
                <Terminal size={16} /> Launch Interactive PoC Inspector
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
