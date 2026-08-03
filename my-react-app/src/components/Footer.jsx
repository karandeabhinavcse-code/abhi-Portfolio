import { Shield, ArrowUp } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-card-solid)',
      borderTop: '1px solid var(--border-light)',
      padding: '36px 24px 28px',
      marginTop: '60px',
      transition: 'background 0.35s ease'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          
          {/* Logo & Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Abhinav Karande
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Cybersecurity & VAPT Enthusiast • BCA Student
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <a href="#hero" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
            <a href="#skills" style={{ textDecoration: 'none', color: 'inherit' }}>Skills</a>
            <a href="#projects" style={{ textDecoration: 'none', color: 'inherit' }}>Projects</a>
            <a href="#certifications" style={{ textDecoration: 'none', color: 'inherit' }}>Certifications</a>
            <a href="#education" style={{ textDecoration: 'none', color: 'inherit' }}>Education</a>
            <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={resumeData.personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>

            <a
              href={resumeData.personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>

            <button
              onClick={scrollToTop}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
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
              <ArrowUp size={16} />
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          © {new Date().getFullYear()} Abhinav Karande. Cybersecurity & VAPT Personal Portfolio.
        </div>

      </div>
    </footer>
  );
}
