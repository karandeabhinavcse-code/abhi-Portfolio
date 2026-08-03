import { motion } from 'framer-motion';
import { User, Shield, Terminal, BookOpen, CheckCircle2, Code2, Network, Smartphone } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '70px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Technical Section Connector & Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-connector-line" />
        <span className="section-number-tag">
          01 // ABOUT ME
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          About <span className="text-gradient">Abhinav Karande</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
          Aspiring Application Security & VAPT Specialist building practical skills through hands-on testing, security labs, and networking fundamentals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
        
        {/* Main Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(79, 70, 229, 0.3)'
              }}>
                <Shield size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Student & Security Enthusiast
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  Shoolini University • BCA (Final Year)
                </div>
              </div>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
              {resumeData.about.intro}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {resumeData.about.bullets.map((bullet, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5 }}>
                  <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <Terminal size={15} /> View Practical Projects
            </a>
            <a href={resumeData.personalInfo.reportUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <BookOpen size={15} /> Download Resume PDF
            </a>
          </div>
        </motion.div>

        {/* Pillars / Key Interest Areas Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
        >
          {/* Card 1: Web VAPT */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#00F0FF', marginBottom: '10px' }}><Shield size={24} /></div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Web VAPT</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Manual vulnerability discovery, OWASP Top 10 testing, and PoC reporting.
              </p>
            </div>
          </div>

          {/* Card 2: CCNA & Networking */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#059669', marginBottom: '10px' }}><Network size={24} /></div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Network Security</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                TCP/IP architecture, packet analysis in Wireshark, and CCNA routing.
              </p>
            </div>
          </div>

          {/* Card 3: Android Security */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#F59E0B', marginBottom: '10px' }}><Smartphone size={24} /></div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Android VAPT</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Static APK analysis, ADB commands, traffic proxying, and reverse engineering.
              </p>
            </div>
          </div>

          {/* Card 4: Python & Scripting */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#8B5CF6', marginBottom: '10px' }}><Code2 size={24} /></div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Python & Automation</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Developing custom network scanners and security audit scripts.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
