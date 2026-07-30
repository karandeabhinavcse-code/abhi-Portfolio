import { Shield, ArrowUp, FileText, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-card-solid)',
      borderTop: '1px solid var(--border-light)',
      padding: '48px 24px 32px',
      marginTop: '60px',
      transition: 'background 0.35s ease'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          
          {/* Logo & Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                Abhinav Karande
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Cybersecurity Specialist • VAPT & CCNA Engineer
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
            <a href="#terminal" style={{ textDecoration: 'none', color: 'inherit' }}>VAPT CLI</a>
            <a href="#skills" style={{ textDecoration: 'none', color: 'inherit' }}>Skills</a>
            <a href="#projects" style={{ textDecoration: 'none', color: 'inherit' }}>Audits</a>
            <a href="#network" style={{ textDecoration: 'none', color: 'inherit' }}>CCNA Visualizer</a>
            <a href="#experience" style={{ textDecoration: 'none', color: 'inherit' }}>Experience</a>
            <a href="#certifications" style={{ textDecoration: 'none', color: 'inherit' }}>Certifications</a>
            <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </button>

        </div>

        {/* Bottom Copyright & Security Stamp */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          flexWrap: 'wrap',
          justify: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} Abhinav Karande. Built with React.js & Framer Motion.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> OWASP Top 10 (2025) Verified & EC-Council Accredited
          </div>
        </div>

      </div>
    </footer>
  );
}
