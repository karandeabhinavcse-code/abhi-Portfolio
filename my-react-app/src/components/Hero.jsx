import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, ArrowRight, Download, CheckCircle2, Sparkles } from 'lucide-react';
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
              <span className="badge-cyber" style={{ padding: '6px 18px', fontSize: '0.82rem' }}>
                <Shield size={14} className="animate-pulse-slow" /> [ STATUS: ONLINE ] OWASP Top 10 (2025) & CCNA Certified
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '16px', fontWeight: 800 }}>
              Hi, I'm <span className="text-gradient">Abhinav Karande</span>
            </h1>

            {/* Typewriter Subtitle with Hacker Prompt */}
            <div style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: 'var(--accent-emerald)' }}>root@abhinav-sec:~#</span>
              <span>{typedText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}
              >
                _
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
              <button onClick={onOpenTerminal} className="btn-primary">
                <Terminal size={18} /> Launch Security CLI <Sparkles size={16} />
              </button>

              <a href="#projects" className="btn-secondary">
                Explore VAPT Audits <ArrowRight size={18} />
              </a>

              <a
                href={resumeData.personalInfo.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber"
                style={{ padding: '11px 20px', fontSize: '0.92rem' }}
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
                <div key={idx} style={{ padding: '12px', background: 'rgba(0, 240, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Dark VAPT HUD Card Widget */}
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
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00FF9D', boxShadow: '0 0 10px #00FF9D' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    VAPT_AUDIT_CONSOLE :: ACTIVE
                  </span>
                </div>
                <span className="badge-emerald" style={{ fontSize: '0.7rem' }}>
                  [ SECURE SESSION ]
                </span>
              </div>

              {/* Security Metrics Card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TARGET SYSTEM</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>Gin & Juice App</div>
                  <div style={{ fontSize: '0.75rem', color: '#00FF9D', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <CheckCircle2 size={12} /> Audit Verified
                  </div>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>EC-COUNCIL ID</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>ECC1456328907</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Certified Ethical Hacker
                  </div>
                </div>
              </div>

              {/* Sample PoCs Code Preview */}
              <div style={{
                background: '#070C18',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                color: '#F8FAFC',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '20px',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)'
              }}>
                <div style={{ color: '#64748B', marginBottom: '8px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>// OWASP 2025 PoC Exploitation Log</span>
                  <span style={{ color: '#00F0FF' }}>Burp Suite v2025.1</span>
                </div>
                <div style={{ color: '#FF2E63', fontWeight: 700 }}>[!] CRITICAL: CSTI Payload Executed</div>
                <div style={{ color: '#CBD5E1', margin: '4px 0' }}>
                  <span style={{ color: '#FFB800' }}>PAYLOAD:</span> {`{{constructor.constructor('alert(1)')()}}`}
                </div>
                <div style={{ color: '#00FF9D' }}>[✓] SQLi: Bypassed Auth via Union Injection</div>
                <div style={{ color: '#00F0FF' }}>[✓] Network: OSPF Area 0 Trunk Configured</div>
              </div>

              {/* Action Link inside card */}
              <a
                href="#projects"
                className="btn-secondary"
                style={{ width: '100%', borderRadius: '10px', padding: '11px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Shield size={16} /> Inspect Audit Reports & PoCs
              </a>

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
